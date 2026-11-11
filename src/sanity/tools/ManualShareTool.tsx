'use client'

import {useEffect, useMemo, useState} from 'react'
import {useClient} from 'sanity'

type Article = {
  _id: string
  title: string
  excerpt?: string
  slug?: string
  externalLink?: string
  hasBody: boolean
  publishedAt?: string
}

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://detounogwo.com'

function articleLink(article: Article): string | null {
  // Articles consisting only of an external link redirect away from the website.
  // Share their destination rather than a redirecting website URL.
  if (!article.hasBody && article.externalLink) {
    try {
      const url = new URL(article.externalLink)
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
    } catch {
      return null
    }
  }

  if (!article.slug) return null
  try {
    return new URL('/blog/' + encodeURIComponent(article.slug), publicSiteUrl).toString()
  } catch {
    return null
  }
}

function suggestedCaption(article: Article, url: string): string {
  const summary = article.excerpt?.trim()
  return [
    article.title.trim(),
    summary || null,
    'Read the full article: ' + url,
  ].filter(Boolean).join('\n\n')
}

const panel: React.CSSProperties = {
  background: '#fff',
  color: '#222',
  border: '1px solid #d4d4d8',
  borderRadius: 10,
  padding: 20,
  marginBottom: 16,
}
const button: React.CSSProperties = {
  background: '#23346a',
  color: '#fff',
  border: 0,
  borderRadius: 6,
  padding: '10px 14px',
  fontSize: 14,
  textDecoration: 'none',
  cursor: 'pointer',
  display: 'inline-block',
}
const secondaryButton: React.CSSProperties = {
  ...button,
  color: '#23346a',
  background: '#f4f5f9',
  border: '1px solid #d4d4d8',
}

export function ManualShareTool() {
  const client = useClient({apiVersion: '2026-08-28'})
  const [articles, setArticles] = useState<Article[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    void client.fetch<Article[]>(
      '*[_type == "post" && !(_id in path("drafts.**")) && defined(title) && ' +
      '(!defined(publishedAt) || publishedAt <= now())] | order(publishedAt desc) ' +
      '{_id, title, excerpt, "slug": slug.current, externalLink, "hasBody": count(body[]) > 0, publishedAt}',
    ).then((result) => {
      if (active) setArticles(result)
    }).catch(() => {
      if (active) setError('Unable to load articles from Sanity. Try refreshing Studio.')
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => {active = false}
  }, [client])

  const filtered = useMemo(
    () => articles.filter((article) => article.title.toLowerCase().includes(search.trim().toLowerCase())),
    [articles, search],
  )

  async function copy(value: string, kind: string) {
    try {
      await navigator.clipboard.writeText(value)
      setMessage(kind + ' copied. Paste it into your Facebook post if needed.')
    } catch {
      setMessage('Your browser could not copy automatically. Please copy the text or link manually.')
    }
  }

  return (
    <div style={{maxWidth: 940, padding: '32px 20px', margin: '0 auto', fontFamily: 'sans-serif'}}>
      <h1 style={{fontSize: 26, fontWeight: 700, marginBottom: 10}}>Share to Personal Facebook</h1>
      <p style={{lineHeight: 1.6, marginBottom: 20}}>
        Share a published website article with followers of Dr. Dets&apos; existing Facebook profile.
        This opens Facebook&apos;s standard sharing screen. <strong>She chooses the destination,
        audience, and whether to publish.</strong> Nothing is posted automatically.
      </p>

      <div style={{...panel, background: '#f8f9fc'}}>
        <strong>How to share</strong>
        <ol style={{margin: '10px 0 0', paddingLeft: 24, lineHeight: 1.75}}>
          <li>Locate a published article below.</li>
          <li>Optionally copy the suggested caption to use as her own accompanying text.</li>
          <li>Choose <strong>Share on Facebook</strong>, sign in as the profile owner, and select her personal feed.</li>
          <li>Review the Facebook account, audience and message, then publish manually.</li>
        </ol>
        <p style={{fontSize: 13, color: '#52525b', marginTop: 10}}>
          Facebook controls its own sharing screen; the suggested caption cannot be inserted automatically.
          If the sharing dialog is unavailable, copy the article link and create a normal Facebook post.
        </p>
      </div>

      {message && <p role="status" style={{...panel, color: '#166534', background: '#f0fdf4'}}>{message}</p>}
      {error && <p role="alert" style={{...panel, color: '#991b1b', background: '#fff1f2'}}>{error}</p>}

      <label htmlFor="share-article-search" style={{display: 'block', fontWeight: 600, marginBottom: 8}}>
        Find an article
      </label>
      <input
        id="share-article-search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by article title"
        style={{width: '100%', padding: 12, border: '1px solid #d4d4d8', borderRadius: 6, marginBottom: 20}}
      />

      {loading && <p>Loading published articles…</p>}
      {!loading && !error && filtered.length === 0 && <p>No matching published articles found.</p>}

      {filtered.map((article) => {
        const url = articleLink(article)
        if (!url) return null
        const shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)
        return (
          <article key={article._id} style={panel}>
            <h2 style={{fontSize: 19, fontWeight: 650, marginBottom: 8}}>{article.title}</h2>
            {article.excerpt && <p style={{lineHeight: 1.6, color: '#52525b', marginBottom: 10}}>{article.excerpt}</p>}
            {article.publishedAt && (
              <p style={{fontSize: 12, color: '#71717a', marginBottom: 12}}>
                Article date: {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            )}
            <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10}}>
              <a href={shareUrl} target="_blank" rel="noopener noreferrer" style={button}>
                Share on Facebook
              </a>
              <button type="button" style={secondaryButton}
                onClick={() => void copy(suggestedCaption(article, url), 'Suggested caption')}>
                Copy suggested caption
              </button>
              <button type="button" style={secondaryButton} onClick={() => void copy(url, 'Article link')}>
                Copy link
              </button>
              <a href={url} target="_blank" rel="noopener noreferrer"
                style={{fontSize: 14, color: '#23346a'}}>
                View article
              </a>
            </div>
          </article>
        )
      })}
    </div>
  )
}
