import {createHash, randomBytes, timingSafeEqual} from 'node:crypto'
import {NextRequest, NextResponse} from 'next/server'
import {authorizationUrl, requireSetup, sanityWriter, type Provider} from '@/lib/social/oauth'
import {putTemporary} from '@/lib/social/storage'

export const dynamic = 'force-dynamic'

type ConnectionRequest = {
  _id: string
  _rev: string
  _type: 'socialConnectionRequest'
  provider: Provider
  nonceHash: string
  expiresAt: string
  consumedAt?: string
}

export async function GET(request: NextRequest) {
  const requestId = request.nextUrl.searchParams.get('request') || ''
  const nonce = request.nextUrl.searchParams.get('nonce') || ''
  if (!/^socialConnectionRequest\.[a-f0-9-]{36}$/i.test(requestId) || !/^[a-f0-9]{64}$/i.test(nonce)) {
    return NextResponse.json({error: 'Invalid connection request'}, {status: 400})
  }

  try {
    const client = sanityWriter()
    const challenge = await client.getDocument<ConnectionRequest>(requestId)
    if (!challenge || (challenge.provider !== 'meta' && challenge.provider !== 'linkedin') ||
        challenge.consumedAt || !challenge.expiresAt ||
        Date.parse(challenge.expiresAt) < Date.now() ||
        Date.parse(challenge.expiresAt) > Date.now() + 5 * 60_000 ||
        !/^[a-f0-9]{64}$/i.test(challenge.nonceHash)) {
      return NextResponse.json({error: 'Connection request expired or invalid'}, {status: 403})
    }
    requireSetup(challenge.provider)
    const actualHash = createHash('sha256').update(nonce).digest()
    const expectedHash = Buffer.from(challenge.nonceHash, 'hex')
    if (!timingSafeEqual(actualHash, expectedHash)) {
      return NextResponse.json({error: 'Connection request expired or invalid'}, {status: 403})
    }

    // Optimistic concurrency prevents two requests from using the same challenge.
    await client.patch(requestId).ifRevisionId(challenge._rev)
      .set({consumedAt: new Date().toISOString()}).commit({visibility: 'sync'})

    const state = randomBytes(32).toString('hex')
    await putTemporary('social:oauth-state:' + state, {provider: challenge.provider}, 600)
    const response = NextResponse.redirect(authorizationUrl(challenge.provider, state))
    response.cookies.set('social_oauth_state', state, {
      httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:',
      path: '/api/social', maxAge: 600,
    })
    return response
  } catch {
    return NextResponse.json({error: 'Unable to start connection; check social integration configuration'}, {status: 503})
  }
}
