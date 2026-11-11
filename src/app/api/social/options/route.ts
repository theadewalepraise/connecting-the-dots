import {NextRequest, NextResponse} from 'next/server'
import {readEncryptedTemporary} from '@/lib/social/storage'
import type {ConnectionCandidate} from '@/lib/social/oauth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const ticket = request.nextUrl.searchParams.get('ticket') || ''
  if (!/^[a-f0-9]{64}$/.test(ticket) || ticket !== request.cookies.get('social_oauth_ticket')?.value) {
    return NextResponse.json({error: 'Connection session is invalid'}, {status: 403})
  }
  try {
    const pending = await readEncryptedTemporary<{candidates: ConnectionCandidate[]}>('social:oauth-pending:' + ticket)
    if (!pending) return NextResponse.json({error: 'Connection session expired'}, {status: 410})
    // Never expose tokens to the browser, including the Studio.
    const options = pending.candidates.map(({id, platform, displayName, profileUrl}) => ({
      id, platform, displayName, profileUrl,
    }))
    return NextResponse.json({options}, {headers: {'Cache-Control': 'no-store'}})
  } catch {
    return NextResponse.json({error: 'Unable to load connected accounts'}, {status: 503})
  }
}
