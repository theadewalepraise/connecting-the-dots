# Client-owned Meta and LinkedIn developer apps — onboarding

**Project:** Connecting the Dots (Dr. Dets)  
**Environment:** `feature/social-publishing` preview only; do not enable auto-publishing or merge to production.  
**Status:** Developer apps have **not yet been created**. An authorized account holder must sign in, accept platform terms, approve app associations and configure credentials.

## Ownership rules

- The client (Dr. Dets or an authorized business administrator) should own and control both developer apps. Add the website developer as a delegated developer/admin where appropriate.
- Do **not** create developer apps under a contractor's only account, solicit passwords/2FA codes, paste app secrets into chat, or commit secrets to GitHub.
- The Meta app may need a client-managed Meta Business Portfolio and a Facebook Page to which the client has management access.
- The LinkedIn developer app **must** be associated with a LinkedIn Page. The association cannot be transferred later. Use the client's legitimate LinkedIn Page, or create one representing the appropriate organization/brand first.
- Publish an owner-approved privacy notice before registering a privacy policy URL. Do not use a fake URL; provide app data deletion instructions or request flow as required by the providers.

## 1. Meta app for Facebook and Instagram

Portal: https://developers.facebook.com/apps/

1. Client signs into their authentic Facebook account, registers for Meta for Developers if prompted, and opens **Create App**.
2. Choose a business-oriented app/use case that supports **Facebook Login for Business** and **Instagram API with Facebook Login**. The Meta dashboard may display use cases rather than older app-type names.
3. Suggested name: **Connecting the Dots Social Publishing**. Set the correct business portfolio/owner and contact email. The client accepts the applicable terms.
4. Enable Facebook Login / Facebook Login for Business and the Instagram Graph API integration using **Facebook Login** (this is the flow currently implemented in the code). Do not select Instagram Login as the only method without planning an accompanying code change.
5. Under OAuth settings, whitelist the exact callback listed below and activate web OAuth login as required.
6. Request/configure permissions: `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`. Production access may require app review, business verification or additional role configuration.
7. Verify that her Instagram is a **professional (Business or Creator)** account connected to a **Facebook Page** she manages; a personal Instagram account will not work with this Facebook Login-based integration.
8. Record the **App ID** and securely enter **App Secret** in Vercel as `META_APP_ID` and `META_APP_SECRET` (server-only, Preview environment during testing). Do not share the secret in chat.
9. Test authorization with a developer/test account and the real Page/Instagram relationship; do not assume review is approved until Meta confirms it.

## 2. LinkedIn app

Portal: https://www.linkedin.com/developers/apps

1. Client signs into her genuine LinkedIn account and opens **My Apps → Create App**.
2. Suggested name: **Connecting the Dots Social Publishing**.
3. Associate the appropriate client-owned **LinkedIn Page** (create one first if no suitable Page exists). Its super admin may need to approve/verify association. **Page association is permanent**, so choose carefully.
4. Provide a real, published, owner-approved **Privacy Policy URL** and the approved logo.
5. Under **Products**, enable/confirm **Sign In with LinkedIn using OpenID Connect** and **Share on LinkedIn**. These provide the `openid`, `profile`, and `w_member_social` scopes needed for the current **member-profile** flow. Products may already be enabled for new consumer apps.
6. Under **Auth**, add the exact callback URL below to **Authorized redirect URLs**.
7. Securely enter the LinkedIn **Client ID** and **Client Secret** in Vercel as `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET` (server-only, Preview environment during testing).
8. If the eventual requirement is to post **as a LinkedIn organization Page** rather than Dr. Dets' member profile, pause: this needs a different implementation, permissions and likely Community Management API review.

## OAuth callback for current feature-branch testing

Choose a stable, reachable preview origin and use that **exact** value in `SOCIAL_PUBLIC_BASE_URL` on Vercel Preview. The existing branch alias reported by Vercel is:

```
https://connecting-the-dots-git-feature-social-a07fc5-theadewalepraise.vercel.app
```

Register the following URI in **both** developer apps:

```
https://connecting-the-dots-git-feature-social-a07fc5-theadewalepraise.vercel.app/api/social/callback
```

Before registering, confirm this preview URL is accessible to the client and provider callbacks (Vercel deployment protection may require adjustment for a dedicated test URL). The request origin, `SOCIAL_PUBLIC_BASE_URL`, and the provider's registered redirect URL must match exactly. When production is later authorized, register its own final production redirect URI and use corresponding production environment variables.

## Remaining infrastructure

- Create client-controlled Upstash Redis database and obtain server-side `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- Generate and securely store a random AES key for `SOCIAL_TOKEN_ENCRYPTION_KEY` (`openssl rand -base64 32`); store the key in the client's password manager with appropriate access control.
- Create a least-privileged Sanity API write token (`SANITY_API_WRITE_TOKEN`), scoped to the correct project and dataset.
- Add secrets via **Vercel → Project → Settings → Environment Variables** for Preview only during setup; do not place in public source or browser-side config.
- Validate preview build, connect each account from Sanity Studio, confirm identity and metadata, test expiry/reconnect behavior, then separately implement publishing jobs and approval controls.

## Owner action checklist

- [ ] Confirm who owns the Facebook Page and linked Instagram professional account.
- [ ] Confirm which LinkedIn Page will permanently own the LinkedIn developer app.
- [ ] Supply approved brand name, logo and a real privacy policy URL.
- [ ] Client creates Meta app and configures OAuth redirect.
- [ ] Client creates LinkedIn app and confirms Page association.
- [ ] Developer configures credentials directly in Vercel and tests authorization, **without exchanging passwords or secrets over chat**.

Sources:
- LinkedIn app creation: https://www.linkedin.com/help/linkedin/answer/a526048
- LinkedIn Page association: https://www.linkedin.com/help/lms/answer/a1672377
- Share on LinkedIn permissions: https://learn.microsoft.com/linkedin/consumer/integrations/self-serve/share-on-linkedin
- Meta Instagram API overview: https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api

**Note:** These are onboarding instructions, not evidence that the developer apps or social connections exist yet.
