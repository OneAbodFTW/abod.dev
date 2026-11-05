import type { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/posts'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${site.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...posts
  ]
}
