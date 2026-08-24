# abod.dev

Abod's portfolio, project archive, and writing. The site is built with Next.js 15, React 19, local MDX content, and a small Resend contact endpoint.

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

## Contact form

Copy `.env.example` to `.env.local` and configure:

```dotenv
RESEND_API_KEY=
CONTACT_TO_EMAIL=hello@abod.dev
CONTACT_FROM_EMAIL=Abod.dev <portfolio@abod.dev>
```

The sending domain used by `CONTACT_FROM_EMAIL` must be verified in Resend. Without these values the form returns a friendly configuration message and points visitors to `hello@abod.dev`.

## Publishing

The production service is connected to the GitHub repository on Railway. Pushing
`main` triggers a deployment; `bun run deploy` can be used for an explicit CLI
deployment when needed.

The application listens on Railway's injected `PORT` through `next start` and
generates the portfolio, blog, RSS, robots, sitemap, and social-image routes.
Before pointing `abod.dev` at the service, verify both the apex and `www` DNS
records and confirm Railway has issued a valid TLS certificate.
