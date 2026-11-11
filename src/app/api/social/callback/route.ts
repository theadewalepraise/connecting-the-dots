import {randomBytes} from 'node:crypto'
import {NextRequest, NextResponse} from 'next/server'
import {exchangeAndDiscover, type Provider} from '@/lib/social/oauth'
import {storeEncryptedTemporary, takeTemporary} from '@/lib/social/storage'

export const dynamic = 'force-dynamic'

function backToStudio(request: NextRequest, error?: string, ticket?: string) {
  const url = new URL('/studio/social-connections', request.url)
  if (error) url.searchParams.set('error', error)
  if (ticket) url.searchParams.set('ticket', ticket)
  return NextResponse.redirect(url)
}

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get('state') || ''
  const code = request.nextUrl.searchParams.get('code') || ''
  const browserState = request.cookies.get('social_oauth_state')?.value
  if (!/^[a-f0-9]{64}$/.test(state) || !browserState || state !== browserState) {
    return backToStudio(request, 'invalid-session')
  }
  if (request.nextUrl.searchParams.has('error') || !code) {
    return backToStudio(request, 'permission-not-granted')
  }

  try {
    const stored = await takeTemporary<{provider: Provider}>('social:oauth-state:' + state)
    if (!stored || (stored.provider !== 'meta' && stored.provider !== 'linkedin')) {
      return backToStudio(request, 'expired-session')
    }
    const candidates = await exchangeAndDiscover(stored.provider, code)
    const ticket = randomBytes(32).toString('hex')
    await storeEncryptedTemporary('social:oauth-pending:' + ticket, {candidates})
    const response = backToStudio(request, undefined, ticket)
    response.cookies.delete('social_oauth_state')
    response.cookies.set('social_oauth_ticket', ticket, {
      httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:',
      path: '/api/social', maxAge: 600,
    })
    return response
  } catch {
    return backToStudio(request, 'provider-connection-failed')
  }
}
