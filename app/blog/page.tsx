import type { Metadata } from 'next'

import { PostCard } from '@/components/post-card'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Technical guides, product lessons, and field notes from Abod in English and Arabic.',
  alternates: { canonical: '/blog' }
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main id="main-content">
      <header className="blog-hero">
        <div className="section-kicker">
          <span>05</span>
          <span>FIELD NOTES / COMPLETE ARCHIVE</span>
        </div>
        <h1>Writing from inside the build.</h1>
        <div className="blog-hero-bottom">
          <p>
            Long-form technical guides, practical lessons, and observations from
            building products. No content treadmill—just useful notes worth
            keeping.
          </p>
          <span className="blog-count">
            ARCHIVE SIZE / {posts.length} POSTS
          </span>
        </div>
      </header>

      <section className="blog-index" aria-label="All posts">
        <div className="posts-list">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>
    </main>
  )
}
