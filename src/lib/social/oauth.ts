import 'server-only'
import {createClient} from 'next-sanity'
import {apiVersion, dataset, projectId} from '@/sanity/env'
import type {SanityClient} from 'next-sanity'

export type Provider = 'meta' | 'linkedin'
export type Platform = 'facebook' | 'instagram' | 'linkedin'

export type ConnectionCandidate = {
  id: string
  platform: Platform
  platformAccountId: string
  displayName: string
  profileUrl?: string
  accessToken: string
  expiresAt?: string
}

export function socialSetup() {
  return {
    storage: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN && process.env.SOCIAL_TOKEN_ENCRYPTION_KEY),
    sanity: Boolean(process.env.SANITY_API_WRITE_TOKEN),
    publicUrl: Boolean(process.env.SOCIAL_PUBLIC_BASE_URL),
    meta: Boolean(process.env.META_APP_ID && process.env.META_APP_SECRET),
    linkedin: Boolean(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET),
  }
}

export function requireSetup(provider: Provider) {
  const setup = socialSetup()
  if (!setup.storage || !setup.sanity || !setup.publicUrl || !setup[provider]) {
    throw new Error('Social connection setup is incomplete')
  }
}

export function sanityWriter(): SanityClient {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) throw new Error('Sanity write token is not configured')
  return createClient({projectId, dataset, apiVersion, token, useCdn: false})
}

export function redirectUrl(): string {
  const base = process.env.SOCIAL_PUBLIC_BASE_URL
  if (!base) throw new Error('Public site URL is not configured')
  const url = new URL(base)
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && url.hostname === 'localhost')) {
    throw new Error('Social public URL must use HTTPS')
  }
  return new URL('/api/social/callback', url).toString()
}

const graphVersion = process.env.META_GRAPH_VERSION || 'v25.0'
const graphBase = 'https://graph.facebook.com/' + graphVersion

export function authorizationUrl(provider: Provider, state: string): string {
  const url = provider === 'meta'
    ? new URL('https://www.facebook.com/' + graphVersion + '/dialog/oauth')
    : new URL('https://www.linkedin.com/oauth/v2/authorization')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', provider === 'meta' ? process.env.META_APP_ID! : process.env.LINKEDIN_CLIENT_ID!)
  url.searchParams.set('redirect_uri', redirectUrl())
  url.searchParams.set('state', state)
  url.searchParams.set('scope', provider === 'meta'
    ? 'pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish'
    : 'openid profile w_member_social')
  return url.toString()
}

async function jsonOrError(response: Response): Promise<Record<string, unknown>> {
  if (!response.ok) throw new Error('Social provider returned HTTP ' + response.status)
  return await response.json() as Record<string, unknown>
}

type MetaPage = {
  id: string
  name: string
  access_token: string
  link?: string
  instagram_business_account?: {id: string; username?: string}
}

export async function exchangeAndDiscover(provider: Provider, code: string): Promise<ConnectionCandidate[]> {
  if (provider === 'linkedin') {
    const form = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUrl(),
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    })
    const tokenData = await jsonOrError(await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: form,
      cache: 'no-store',
    }))
    const accessToken = tokenData.access_token
    if (typeof accessToken !== 'string') throw new Error('LinkedIn did not issue an access token')
    const profile = await jsonOrError(await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {Authorization: 'Bearer ' + accessToken},
      cache: 'no-store',
    }))
    if (typeof profile.sub !== 'string') throw new Error('LinkedIn profile lookup failed')
    const expiresIn = Number(tokenData.expires_in)
    return [{
      id: 'linkedin:' + profile.sub,
      platform: 'linkedin',
      platformAccountId: profile.sub,
      displayName: String(profile.name || 'LinkedIn member'),
      accessToken,
      expiresAt: Number.isFinite(expiresIn) ? new Date(Date.now() + expiresIn * 1000).toISOString() : undefined,
    }]
  }

  const exchange = new URL(graphBase + '/oauth/access_token')
  exchange.search = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    redirect_uri: redirectUrl(),
    code,
  }).toString()
  const shortToken = await jsonOrError(await fetch(exchange, {cache: 'no-store'}))
  if (typeof shortToken.access_token !== 'string') throw new Error('Meta did not issue an access token')

  const longLived = new URL(graphBase + '/oauth/access_token')
  longLived.search = new URLSearchParams({
    grant_type: 'fb_exchange_token',
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    fb_exchange_token: shortToken.access_token,
  }).toString()
  const longTokenData = await jsonOrError(await fetch(longLived, {cache: 'no-store'}))
  const userToken = longTokenData.access_token
  if (typeof userToken !== 'string') throw new Error('Meta long-lived token exchange failed')

  const candidates: ConnectionCandidate[] = []
  let next: string | undefined = graphBase + '/me/accounts?fields=id,name,link,access_token,instagram_business_account{id,username}&limit=100'
  const visited = new Set<string>()
  // Do not follow arbitrary provider-supplied paging URLs or leak the access token.
  for (let pageNumber = 0; next && pageNumber < 10; pageNumber += 1) {
    const apiUrl = new URL(next)
    if (apiUrl.protocol !== 'https:' || apiUrl.hostname !== 'graph.facebook.com' || visited.has(apiUrl.toString())) break
    visited.add(apiUrl.toString())
    const response = await jsonOrError(await fetch(apiUrl, {
      headers: {Authorization: 'Bearer ' + userToken},
      cache: 'no-store',
    }))
    const pages = Array.isArray(response.data) ? response.data as MetaPage[] : []
    for (const page of pages) {
      if (!page.id || !page.access_token) continue
      candidates.push({
        id: 'facebook:' + page.id,
        platform: 'facebook',
        platformAccountId: page.id,
        displayName: page.name || 'Facebook Page',
        profileUrl: page.link || 'https://www.facebook.com/' + page.id,
        accessToken: page.access_token,
      })
      if (page.instagram_business_account?.id) {
        const ig = page.instagram_business_account
        candidates.push({
          id: 'instagram:' + ig.id,
          platform: 'instagram',
          platformAccountId: ig.id,
          displayName: ig.username ? '@' + ig.username : 'Instagram (' + page.name + ')',
          profileUrl: ig.username ? 'https://www.instagram.com/' + ig.username + '/' : undefined,
          accessToken: page.access_token,
        })
      }
    }
    const paging = response.paging as {next?: unknown} | undefined
    next = typeof paging?.next === 'string' ? paging.next : undefined
  }
  if (!candidates.length) throw new Error('No accessible Facebook Pages or linked professional Instagram accounts were found')
  return candidates
}
