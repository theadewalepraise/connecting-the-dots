import {NextResponse} from 'next/server'
import {socialSetup} from '@/lib/social/oauth'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json(socialSetup(), {headers: {'Cache-Control': 'no-store'}})
}
