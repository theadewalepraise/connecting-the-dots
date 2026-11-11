# Manual Facebook profile sharing (editor guide)

## Why this is manual

Dr. Dets' existing Facebook professional-mode **personal profile** has an established audience. Meta's publishing APIs do **not** allow our app to automatically post to personal Facebook profiles. Facebook Pages are the supported publishing destination. We therefore give the content owner a convenient, human-controlled **Share to Facebook Profile** workflow.

This feature does **not** request Facebook profile access, store personal profile credentials, schedule posts, or certify that a share was completed.

## How to use it

1. Publish the article in Sanity Studio and check that its website link is available to visitors.
2. Open **Sanity Studio → Share to Facebook Profile** (a separate Studio top-level tool, not part of API account connections).
3. Search for the article by title.
4. Click **Copy suggested caption**, then **Share on Facebook**.
5. Facebook opens its own sharing screen. Sign into Dr. Dets' Facebook account if needed. Choose the **personal feed/profile**, review the audience and post, paste or edit the caption as needed, and click Facebook's publish/share button.
6. If the share screen isn't accessible, click **Copy link** and create a regular Facebook post containing that link and the caption.

**Important:** Facebook controls the Share dialog. It does not allow us to prefill a person's comment text for automatic submission. Always check which profile or Page is selected; sharing as a Page rather than as her personal profile will reach a different audience. A button click in our Studio does **not** mean the post was published.

## Sharing destination

The Studio uses `NEXT_PUBLIC_SITE_URL` when configured; otherwise, it uses `https://detounogwo.com` as the public site URL. It never shares preview URLs by default. Articles with only an external URL and no article body use their external destination, since their website route redirects.

Before sharing an article, confirm it is publicly accessible on the production website. Publishing content in Sanity may make it appear on the existing website because it uses the same dataset; **do not publish a new article solely to test this tool**.

## Future enhancements

- After Facebook Page publishing becomes available, add a manual option to share the already-published **Facebook Page post URL** from the personal profile, instead of the article URL.
- Introduce a user-confirmed “Shared” checkbox and optional tracking timestamp, without pretending to observe her personal profile activity.

## Deployment

This feature is committed on `feature/social-publishing` only. No merge to `main` or production deployment was authorized.
