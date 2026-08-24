import Image from 'next/image'
import Link from 'next/link'

import { ContactForm } from '@/components/contact-form'
import { PostCard } from '@/components/post-card'
import { SectionHeading } from '@/components/section-heading'
import { getAllPosts } from '@/lib/posts'
import { experience, projects, site, videos } from '@/lib/site'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-rail" aria-hidden="true">
          <span>CAI / EGY</span>
          <span>30.0444° N</span>
          <span>31.2357° E</span>
        </div>

        <div className="hero-main">
          <div className="hero-signal">
            <span className="on-air">
              <span className="status-dot" /> LIVE SIGNAL
            </span>
            <span>ENGINEERING · PRODUCTS · EDUCATION</span>
          </div>

          <h1 id="hero-title">
            I build software.
            <br />
            <span>I teach the messy parts.</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-intro">
              <strong>Abod</strong>—formally Abdulqader Mohammed—is a senior
              software engineer, founder, and creator making complex technology
              useful.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore the work <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-ghost" href="#contact">
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-frequency" aria-hidden="true">
          {Array.from({ length: 36 }).map((_, index) => (
            <i key={index} style={{ height: `${18 + ((index * 17) % 54)}%` }} />
          ))}
        </div>
      </section>

      <section className="channel section-about" id="about">
        <SectionHeading
          index="01"
          label="IDENTIFICATION"
          title="Engineer by practice. Creator by instinct."
        />
        <div className="about-grid">
          <div className="about-statement">
            <p>
              I like the point where a fuzzy idea becomes a working system—when
              product judgment, architecture, and a stubborn bug all have to be
              solved at once.
            </p>
            <p>
              I’ve spent years building SaaS products, backend systems, internal
              tools, marketplaces, and automation. I share the useful parts in
              public so the next person can move faster.
            </p>
          </div>
          <div className="about-facts">
            <dl>
              <div>
                <dt>Current signal</dt>
                <dd>Senior software engineer · Founder</dd>
              </div>
              <div>
                <dt>Working with</dt>
                <dd>Python · TypeScript · AI systems</dd>
              </div>
              <div>
                <dt>Publishing in</dt>
                <dd>English · Arabic</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="channel section-creator" id="creator">
        <SectionHeading
          index="02"
          label="OPEN TRANSMISSION"
          title="The work is better when the learning is public."
          description="Practical courses, experiments, and explanations for developers—in English and Arabic."
        />

        <div className="creator-feature">
          <div className="creator-channel-mark">
            <span className="play-mark" aria-hidden="true">
              ▶
            </span>
            <div>
              <span>YOUTUBE CHANNEL</span>
              <strong>ABOD / @ABODBTW</strong>
            </div>
          </div>
          <a href={site.socials.youtube} target="_blank" rel="noreferrer">
            Visit channel <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <a
              className="video-card"
              href={video.url}
              target="_blank"
              rel="noreferrer"
              key={video.url}
            >
              <span className="video-index">{video.index}</span>
              <div>
                <span className="video-eyebrow">{video.eyebrow}</span>
                <h3>{video.title}</h3>
              </div>
              <span className="video-language">{video.language}</span>
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="channel section-experience" id="experience">
        <SectionHeading
          index="03"
          label="WORK LOG"
          title="Seven years of turning business problems into software."
          description="A career across product engineering, technical leadership, freelancing, and independent products."
        />

        <div className="experience-list">
          {experience.map((item, index) => (
            <article
              className="experience-item"
              key={`${item.company}-${item.role}`}
            >
              <div className="experience-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="experience-company">
                <h3>{item.company}</h3>
                {item.current ? <span>ACTIVE</span> : null}
              </div>
              <div className="experience-role">
                <strong>{item.role}</strong>
                <span>{item.period}</span>
              </div>
              <div className="experience-description">
                <p>{item.description}</p>
                {item.highlights ? (
                  <ul>
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <a
          className="inline-link"
          href={site.socials.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          Full professional record on LinkedIn{' '}
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="channel section-projects" id="projects">
        <SectionHeading
          index="04"
          label="SELECTED BUILDS"
          title="Three products. Three very different problems."
          description="Brand creation, managed AI infrastructure, and an Arabic-first property marketplace."
        />

        <div className="projects-list">
          {projects.map((project, index) => (
            <article
              className={`project-card project-accent-${project.accent}`}
              key={project.name}
            >
              <div className="project-copy">
                <div className="project-topline">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{project.label}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="project-statement">{project.statement}</p>
                <p className="project-description">{project.description}</p>
                <p className="project-role">{project.role}</p>
                <ul
                  className="tag-list"
                  aria-label={`${project.name} categories`}
                >
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Open live product <span aria-hidden="true">↗</span>
                </a>
              </div>
              <a
                className="project-image-wrap"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.name}`}
              >
                <div className="browser-bar" aria-hidden="true">
                  <span /> <span /> <span />
                  <i>{new URL(project.url).hostname}</i>
                </div>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1440}
                  height={900}
                  sizes="(max-width: 900px) 100vw, 56vw"
                />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="channel section-writing" id="writing">
        <SectionHeading
          index="05"
          label="FIELD NOTES"
          title="Notes from inside the build."
          description="Technical guides, lessons, and product observations—kept useful and concrete."
        />
        <div className="posts-list">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
        <Link className="button button-ghost all-posts-link" href="/blog">
          Browse the complete archive <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="channel section-contact" id="contact">
        <div className="contact-intro">
          <div className="section-kicker section-kicker-light">
            <span>06</span>
            <span>OPEN CHANNEL</span>
          </div>
          <h2>Have a hard problem or an odd idea?</h2>
          <p>
            Tell me what you’re building, what’s stuck, and what a useful
            outcome looks like. I read every message.
          </p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <ContactForm />
      </section>
    </main>
  )
}
