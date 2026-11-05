import { getAllPosts } from '@/lib/posts'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;'
    }
    return entities[character]!
  })

export function GET() {
  const posts = getAllPosts()
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${site.url}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Abod — Field Notes</title>
    <link>${site.url}/blog</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  })
}
