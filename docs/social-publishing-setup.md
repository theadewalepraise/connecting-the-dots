# Social publishing — account connections (Phase 2 foundation)

**Status:** Implemented on the feature branch, disabled until credentials are provided. Account connection does **not** publish or schedule content. Approval, queue processing, refresh/reconnection, and delivery logs are separate milestones.

## How it works

1. A logged-in Sanity Studio editor opens **Social Connections** in Studio.
2. The Studio creates a short-lived Sanity challenge containing only a SHA-256 hash of a random nonce. The server validates and consumes it before redirecting to the provider. This avoids a public, unauthenticated OAuth initiation endpoint.
3. OAuth uses a single-use state kept in Redis and bound to an HttpOnly, SameSite cookie.
4. On callback, the server exchanges the code and discovers available accounts. **The editor explicitly chooses which account to connect.** The server never binds the first Page silently.
5. Provider access tokens are encrypted with AES-256-GCM before storage in Redis. Sanity only stores public account metadata, connection state and expiry; credentials and app secrets never appear in Studio documents or browser responses.

### Vercel environment variables (server-side only)

| Name | Purpose |
|---|---|
| `SOCIAL_PUBLIC_BASE_URL` | Exact HTTPS origin used for the OAuth callback, e.g. `https://preview.example.com`. Use an approved, stable hostname; provider redirect URI must match exactly. |
| `SANITY_API_WRITE_TOKEN` | **Server-only** scoped Sanity token able to read, patch and create documents in the selected dataset. Restrict access and rotate as needed. |
| `UPSTASH_REDIS_REST_URL` | HTTPS Redis REST endpoint for short-lived OAuth state and encrypted credentials. |
| `UPSTASH_REDIS_REST_TOKEN` | Server-side Redis REST token. |
| `SOCIAL_TOKEN_ENCRYPTION_KEY` | Independently generated 32-byte random secret in **base64**. Generate with `openssl rand -base64 32`. Back it up: rotating it without migrating data invalidates existing connections. |
| `META_APP_ID`, `META_APP_SECRET` | Facebook/Instagram (Meta) developer app credentials. |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | LinkedIn developer app credentials. |
| `META_GRAPH_VERSION` | Optional, currently defaults to `v25.0`; review against the Meta app version before going live. |

Do not prefix these keys with `NEXT_PUBLIC_`. Do not commit `.env` files. Enable variables on the environment whose domain is registered with the OAuth providers (typically a stable preview domain for testing).

### Register redirect URLs

Both provider apps must whitelist:

    {SOCIAL_PUBLIC_BASE_URL}/api/social/callback

- **Meta:** Configure a Meta app with Facebook Login and appropriate Page and Instagram permissions: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`. The relevant Facebook Page must be manageable by the authorizing person; Instagram must be a professional account linked to a Facebook Page for this integration mode. Some permissions/features require Meta app review or business verification.
- **LinkedIn:** Configure OAuth 2.0 with the `openid`, `profile` and `w_member_social` scopes. This phase connects a **member profile**, not a LinkedIn organization Page. Organization posting requires separate access, scopes and checks.

Use test users and provider developer modes while validating; never request personal passwords or ask the site owner to share access tokens in chat.

## Verification checklist

- [ ] Preview build succeeds without OAuth secrets (routes fail closed until configured).
- [ ] Studio shows a disabled Connect button when storage / app config is missing.
- [ ] Editor can authorize via provider with a short-lived, one-use challenge.
- [ ] Callback rejects missing/replayed state and browser mismatches.
- [ ] Meta discovery displays available Facebook Pages and linked professional Instagram accounts; editor selects the correct account.
- [ ] Connected account metadata appears in Studio; **no secret appears in Sanity or API responses**.
- [ ] Credentials are readable only from encrypted Redis entries by the server.
- [ ] Handle expired credentials and reconnect status.
- [ ] Confirm ownership and review provider permissions before enabling publishing.

## Next milestones

- Implement token-expiry monitoring, reconnect and revocation.
- Create a separate publishing job worker and approval actions; keep `socialSettings.enabled=false` until publishing is thoroughly tested.
- Add post scheduling, idempotency, retries and delivery audits.
- Perform an end-to-end OAuth test with the site owner's authorized accounts, then validate API publishing in sandbox/test mode before enabling production publishing.

**Important:** Connecting accounts is never permission to auto-publish; the editorial approval flow remains off by default.
