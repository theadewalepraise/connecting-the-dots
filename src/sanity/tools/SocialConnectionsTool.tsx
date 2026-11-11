'use client'

import {useCallback, useEffect, useState} from 'react'
import {useClient} from 'sanity'

type Setup = {storage: boolean; sanity: boolean; publicUrl: boolean; meta: boolean; linkedin: boolean}
type Account = { _id: string; platform: string; displayName: string; connectionStatus?: string; profileUrl?: string }
type Option = {id: string; platform: string; displayName: string; profileUrl?: string}
type Provider = 'meta' | 'linkedin'

const panel: React.CSSProperties = {padding: 20, border: '1px solid #d4d4d8', borderRadius: 10, marginBottom: 20}
const button: React.CSSProperties = {background: '#202a50', color: '#fff', borderRadius: 6, padding: '10px 16px', cursor: 'pointer', border: 0}

async function responseBody<T>(response: Response): Promise<T> {
  const body = await response.json()
  if (!response.ok) throw new Error(body.error || 'Request failed')
  return body as T
}

function randomHex() {
  const bytes = new Uint8Array(32)
  window.crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value)
  const hash = await window.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function SocialConnectionsTool() {
  const client = useClient({apiVersion: '2026-08-28'})
  const [setup, setSetup] = useState<Setup | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [options, setOptions] = useState<Option[]>([])
  const [ticket, setTicket] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const loadAccounts = useCallback(async () => {
    const items = await client.fetch<Account[]>(
      '*[_type == "socialAccount"] | order(platform asc, displayName asc) {_id, platform, displayName, connectionStatus, profileUrl}',
    )
    setAccounts(items)
  }, [client])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const currentTicket = params.get('ticket')
    setTicket(currentTicket)
    const previousError = params.get('error')
    if (previousError) setError('Authorization was not completed (' + previousError + '). Please try again.')

    void (async () => {
      try {
        const [config] = await Promise.all([
          fetch('/api/social/status', {cache: 'no-store'}).then((r) => responseBody<Setup>(r)),
          loadAccounts(),
        ])
        setSetup(config)
        if (currentTicket) {
          const data = await responseBody<{options: Option[]}>(
            await fetch('/api/social/options?ticket=' + encodeURIComponent(currentTicket), {cache: 'no-store'}),
          )
          setOptions(data.options)
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unable to load social connections')
      }
    })()
  }, [loadAccounts])

  async function connect(provider: Provider) {
    setError(null)
    setNotice(null)
    setBusy(true)
    try {
      const nonce = randomHex()
      await client.create({
        _type: 'socialConnectionRequest',
        _id: 'socialConnectionRequest.' + window.crypto.randomUUID(),
        provider,
        nonceHash: await sha256(nonce),
        expiresAt: new Date(Date.now() + 4 * 60_000).toISOString(),
      }).then((document) => {
        window.location.assign(
          '/api/social/connect?request=' + encodeURIComponent(document._id) +
          '&nonce=' + encodeURIComponent(nonce),
        )
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to start account authorization')
      setBusy(false)
    }
  }

  async function confirm(optionId: string) {
    if (!ticket) return
    setError(null)
    setBusy(true)
    try {
      await responseBody(await fetch('/api/social/confirm', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ticket, optionId}),
      }))
      setOptions([])
      setTicket(null)
      window.history.replaceState({}, '', '/studio/social-connections')
      setNotice('Account connected. You can return here to connect another Page or platform.')
      await loadAccounts()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to finish connection')
    } finally {
      setBusy(false)
    }
  }

  const commonSetup = Boolean(setup?.storage && setup?.sanity && setup?.publicUrl)

  return (
    <div style={{maxWidth: 850, margin: '35px auto', padding: '0 20px', fontFamily: 'sans-serif'}}>
      <h1 style={{fontSize: 27, fontWeight: 700, marginBottom: 8}}>Social Connections</h1>
      <p style={{marginBottom: 25, color: '#52525b'}}>
        Authorize the accounts that will publish approved articles. Access tokens are encrypted server-side and never shown in Studio.
        Connecting an account does not publish any posts.
      </p>

      {error && <div role="alert" style={{...panel, color: '#991b1b', background: '#fef2f2'}}>{error}</div>}
      {notice && <div role="status" style={{...panel, color: '#166534', background: '#f0fdf4'}}>{notice}</div>}

      {ticket && options.length > 0 && (
        <section style={panel}>
          <h2 style={{fontSize: 20, fontWeight: 650, marginBottom: 8}}>Choose an account to connect</h2>
          <p style={{marginBottom: 14}}>Only select an account you have permission to manage.</p>
          {options.map((option) => (
            <div key={option.id} style={{padding: '12px 0', borderTop: '1px solid #e4e4e7', display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center'}}>
              <span><strong>{option.displayName}</strong> — {option.platform}</span>
              <button style={{...button, opacity: busy ? 0.6 : 1}} disabled={busy} onClick={() => void confirm(option.id)}>Connect this account</button>
            </div>
          ))}
          <small>For another account, start the authorization process again after confirming this selection.</small>
        </section>
      )}

      <section style={panel}>
        <h2 style={{fontSize: 20, fontWeight: 650, marginBottom: 14}}>Connect platforms</h2>
        {(['meta', 'linkedin'] as const).map((provider) => {
          const enabled = commonSetup && Boolean(setup?.[provider])
          return (
            <div key={provider} style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderTop: '1px solid #e4e4e7'}}>
              <div>
                <strong>{provider === 'meta' ? 'Facebook Pages & Instagram' : 'LinkedIn profile'}</strong>
                <p style={{fontSize: 13, color: '#71717a'}}>{enabled ? 'Ready for authorization' : 'Requires server-side app configuration'}</p>
              </div>
              <button style={{...button, opacity: !enabled || busy || Boolean(ticket) ? 0.45 : 1}}
                disabled={!enabled || busy || Boolean(ticket)} onClick={() => void connect(provider)}>
                {busy ? 'Please wait…' : 'Connect'}
              </button>
            </div>
          )
        })}
        {!commonSetup && <p style={{fontSize: 13, color: '#a16207', marginTop: 8}}>
          Setup required: configure secure storage, Sanity write access, and the public callback URL in Vercel first.
        </p>}
      </section>

      <section style={panel}>
        <h2 style={{fontSize: 20, fontWeight: 650, marginBottom: 14}}>Authorized accounts</h2>
        {accounts.length === 0 ? <p>No accounts connected yet.</p> : accounts.map((account) => (
          <div key={account._id} style={{padding: '12px 0', borderTop: '1px solid #e4e4e7'}}>
            <strong>{account.displayName}</strong> — {account.platform}
            <span style={{marginLeft: 12, color: '#71717a'}}>{account.connectionStatus || 'Unknown'}</span>
          </div>
        ))}
      </section>
    </div>
  )
}
