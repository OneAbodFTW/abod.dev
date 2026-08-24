import 'server-only'

import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import { cache } from 'react'
import { z } from 'zod'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

const dateSchema = z
  .union([z.string(), z.date()])
  .transform((value) =>
    value instanceof Date ? value.toISOString().slice(0, 10) : value
  )
  .pipe(z.string().date())

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  publishedAt: dateSchema,
  updatedAt: dateSchema.optional(),
  language: z.enum(['en', 'ar']),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false)
})

export type PostMeta = z.infer<typeof frontmatterSchema> & {
  readingTime: string
}

export type Post = {
  meta: PostMeta
  content: string
}

const calculateReadingTime = (source: string) => {
  const words = source.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 220))} min read`
}

const readPostFile = (fileName: string): Post => {
  const source = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8')
  const { data, content } = matter(source)
  const parsed = frontmatterSchema.parse(data)

  return {
    meta: { ...parsed, readingTime: calculateReadingTime(content) },
    content
  }
}

export const getAllPosts = cache((): PostMeta[] => {
  if (!fs.existsSync(postsDirectory)) return []

  const posts = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map(readPostFile)
    .filter((post) => !post.meta.draft)
    .map((post) => post.meta)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

  const slugs = new Set<string>()
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate post slug: ${post.slug}`)
    }
    slugs.add(post.slug)
  }

  return posts
})

export const getPost = cache((slug: string): Post | null => {
  const matchingFile = fs.readdirSync(postsDirectory).find((fileName) => {
    if (!fileName.endsWith('.mdx')) return false
    return readPostFile(fileName).meta.slug === slug
  })

  if (!matchingFile) return null

  const post = readPostFile(matchingFile)
  return post.meta.draft ? null : post
})

export const formatPostDate = (date: string, language = 'en') =>
  new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`))
