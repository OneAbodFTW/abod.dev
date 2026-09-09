# abod.dev

Abod's portfolio, project archive, and writing. The site is built with Next.js 15, React 19, and local MDX content.

## Local development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the complete validation suite with:

```bash
bun run test
bun run build
```

## Content model

- Portfolio, creator, project, and experience data live in `lib/site.ts`.
- Blog posts live in `content/posts/*.mdx`.
- Post frontmatter is validated at build time and requires `title`, `description`, `slug`, `publishedAt`, `language`, `tags`, and `draft`.
- Use `language: ar` for Arabic posts; the article template automatically switches to RTL layout.
- Product captures live under `public/projects`.

## Contact

The contact section links directly to `hello@abod.dev`. The address is configured in `lib/site.ts`.

## Publishing

The production service is connected to the GitHub repository on Railway. Pushing
`main` triggers a deployment; `bun run deploy` can be used for an explicit CLI
deployment when needed.

The application listens on Railway's injected `PORT` through `next start` and
generates the portfolio, blog, RSS, robots, sitemap, and social-image routes.
Before pointing `abod.dev` at the service, verify both the apex and `www` DNS
records and confirm Railway has issued a valid TLS certificate.
