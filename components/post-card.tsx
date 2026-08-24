import Link from 'next/link'

import { formatPostDate, type PostMeta } from '@/lib/posts'

export function PostCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <article className="post-card">
      <Link href={`/blog/${post.slug}`} className="post-card-link">
        <div className="post-card-index">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="post-card-main">
          <div className="post-meta">
            <span>{post.language === 'ar' ? 'ARABIC' : 'ENGLISH'}</span>
            <span>{formatPostDate(post.publishedAt, post.language)}</span>
            <span>{post.readingTime}</span>
          </div>
          <h3 dir={post.language === 'ar' ? 'rtl' : 'ltr'}>{post.title}</h3>
          <p>{post.description}</p>
        </div>
        <span className="arrow-icon" aria-hidden="true">
          ↗
        </span>
      </Link>
    </article>
  )
}
