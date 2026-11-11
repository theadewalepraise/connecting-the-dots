import {createHash} from 'node:crypto'
import {NextRequest, NextResponse} from 'next/server'
import {sanityWriter, type ConnectionCandidate} from '@/lib/social/oauth'
import {storeCredentials, takeEncryptedTemporary} from '@/lib/social/storage'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  // Combine same-site cookie with explicit Origin validation against cross-site POSTs.
  if (request.headers.get('origin') !== request.nextUrl.origin) {
    return NextResponse.json({error: 'Invalid request origin'}, {status: 403})
  }
  let input: {ticket?: unknown; optionId?: unknown}
  try {
    input = await request.json()
  } catch {
    return NextResponse.json({error: 'Invalid request'}, {status: 400})
  }
  const ticket = input.ticket
  const optionId = input.optionId
  if (typeof ticket !== 'string' || !/^[a-f0-9]{64}$/.test(ticket) ||
      ticket !== request.cookies.get('social_oauth_ticket')?.value ||
      typeof optionId !== 'string') {
    return NextResponse.json({error: 'Invalid connection session'}, {status: 403})
  }

  try {
    const pending = await takeEncryptedTemporary<{candidates: ConnectionCandidate[]}>('social:oauth-pending:' + ticket)
    if (!pending) return NextResponse.json({error: 'Connection session expired'}, {status: 410})
    const candidate = pending.candidates.find((item) => item.id === optionId)
    if (!candidate || !/^[\w.-]{1,200}$/.test(candidate.platformAccountId)) {
      return NextResponse.json({error: 'Account selection is invalid'}, {status: 400})
    }
    // Key and document ID are stable per provider account, preventing duplicates.
    const documentId = 'socialAccount.' + createHash('sha256')
      .update(candidate.platform + ':' + candidate.platformAccountId).digest('hex').slice(0, 40)
    await storeCredentials('social:credential:' + documentId, {
      platform: candidate.platform,
      platformAccountId: candidate.platformAccountId,
      accessToken: candidate.accessToken,
      expiresAt: candidate.expiresAt || null,
      storedAt: new Date().toISOString(),
    })
    await sanityWriter().createOrReplace({
      _id: documentId,
      _type: 'socialAccount',
      platform: candidate.platform,
      platformAccountId: candidate.platformAccountId,
      displayName: candidate.displayName,
      ...(candidate.profileUrl ? {profileUrl: candidate.profileUrl} : {}),
      connectionStatus: 'connected',
      connectedAt: new Date().toISOString(),
      ...(candidate.expiresAt ? {tokenExpiresAt: candidate.expiresAt} : {}),
    })
    const response = NextResponse.json({success: true})
    response.cookies.delete('social_oauth_ticket')
    return response
  } catch {
    return NextResponse.json({error: 'Unable to save account connection'}, {status: 503})
  }
}
