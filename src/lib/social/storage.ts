import 'server-only'
import {createCipheriv, createDecipheriv, randomBytes} from 'node:crypto'

/**
 * Redis holds one-time OAuth handshakes and encrypted platform credentials.
 * Never store access tokens in Sanity documents or NEXT_PUBLIC_* variables.
 */
function redisSettings() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) throw new Error('Social credential storage is not configured')
  if (!url.startsWith('https://')) throw new Error('Redis REST endpoint must use HTTPS')
  return {url: url.replace(/\/$/, ''), token}
}

async function command(parts: string[]): Promise<unknown> {
  const {url, token} = redisSettings()
  const response = await fetch(url, {
    method: 'POST',
    headers: {Authorization: 'Bearer ' + token, 'Content-Type': 'application/json'},
    body: JSON.stringify(parts),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Social credential storage is unavailable')
  const result: {result?: unknown; error?: string} = await response.json()
  if (result.error) throw new Error('Social credential storage rejected a request')
  return result.result ?? null
}

export async function putTemporary(key: string, data: unknown, seconds = 600) {
  await command(['SET', key, JSON.stringify(data), 'EX', String(seconds)])
}

export async function takeTemporary<T>(key: string): Promise<T | null> {
  const value = await command(['GETDEL', key])
  return typeof value === 'string' ? JSON.parse(value) as T : null
}

export async function readTemporary<T>(key: string): Promise<T | null> {
  const value = await command(['GET', key])
  return typeof value === 'string' ? JSON.parse(value) as T : null
}

function encryptionKey() {
  const encoded = process.env.SOCIAL_TOKEN_ENCRYPTION_KEY
  if (!encoded) throw new Error('Social token encryption is not configured')
  const key = Buffer.from(encoded, 'base64')
  if (key.length !== 32) throw new Error('SOCIAL_TOKEN_ENCRYPTION_KEY must be 32 random bytes encoded as base64')
  return key
}

function seal(value: unknown): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv)
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, encrypted]).toString('base64')
}

function unseal<T>(encoded: string): T {
  const buffer = Buffer.from(encoded, 'base64')
  if (buffer.length < 29) throw new Error('Invalid encrypted connection payload')
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), buffer.subarray(0, 12))
  decipher.setAuthTag(buffer.subarray(12, 28))
  return JSON.parse(Buffer.concat([decipher.update(buffer.subarray(28)), decipher.final()]).toString('utf8')) as T
}

export async function storeEncryptedTemporary(key: string, payload: unknown) {
  await putTemporary(key, seal(payload))
}

export async function readEncryptedTemporary<T>(key: string): Promise<T | null> {
  const sealed = await readTemporary<string>(key)
  return typeof sealed === 'string' ? unseal<T>(sealed) : null
}

export async function takeEncryptedTemporary<T>(key: string): Promise<T | null> {
  const sealed = await takeTemporary<string>(key)
  return typeof sealed === 'string' ? unseal<T>(sealed) : null
}

export async function storeCredentials(key: string, credentials: unknown) {
  await command(['SET', key, seal(credentials)])
}
