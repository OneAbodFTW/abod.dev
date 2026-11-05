import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { formatPostDate, getAllPosts, getPost } from '@/lib/posts'
import { site } from '@/lib/site'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) return {}

  const title = post.meta.title
  const description = post.meta.description
  const url = `/blog/${post.meta.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: post.meta.publishedAt,
      modifiedTime: post.meta.updatedAt,
      authors: [site.formalName],
      tags: post.meta.tags
    },
    twitter: { card: 'summary_large_image', title, description }
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  const isArabic = post.meta.language === 'ar'
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.publishedAt,
    dateModified: post.meta.updatedAt ?? post.meta.publishedAt,
    inLanguage: post.meta.language,
    url: `${site.url}/blog/${post.meta.slug}`,
    author: {
      '@type': 'Person',
      name: site.formalName,
      url: site.url
    }
  }

  return (
    <main id="main-content">
      <article>
        <header className="article-header">
          <Link className="article-back" href="/blog">
            <span aria-hidden="true">←</span> Complete archive
          </Link>
          <div className="post-meta">
            <span>{isArabic ? 'ARABIC' : 'ENGLISH'}</span>
            <span>
              {formatPostDate(post.meta.publishedAt, post.meta.language)}
            </span>
            <span>{post.meta.readingTime}</span>
          </div>
          <h1 dir={isArabic ? 'rtl' : 'ltr'}>{post.meta.title}</h1>
          <p className="article-dek" dir={isArabic ? 'rtl' : 'ltr'}>
            {post.meta.description}
          </p>
        </header>

        <div
          className="article-body"
          dir={isArabic ? 'rtl' : 'ltr'}
          lang={post.meta.language}
        >
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug]
              }
            }}
          />
        </div>
      </article>

      <div className="article-footer">
        <span>END OF TRANSMISSION / {post.meta.slug}</span>
        <Link href="/blog">Read another field note →</Link>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  )
}
