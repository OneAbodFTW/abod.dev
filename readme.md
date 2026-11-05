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

The site is deployed to Cloudflare Workers with static assets. Next.js generates
the portfolio, blog, RSS feed, robots, sitemap, social image, and 404 page into
`out/` at build time. Project images are served directly without a runtime image
optimizer. Cloudflare applies the legacy redirects and response headers from
`public/_redirects` and `public/_headers`. The Worker redirects HTTP requests to
HTTPS and `www.abod.dev` to `abod.dev`, preserving the path and query string,
then serves the generated assets.

Authenticate to the intended Cloudflare account and deploy:

```bash
bunx wrangler auth create abod-dev
bunx wrangler auth activate abod-dev
bun run deploy
```

Use `bun run preview` to build and preview the site in Cloudflare's local runtime.
`bun run start` serves an existing build. The worker name and asset routing are
configured in `wrangler.jsonc`. Cloudflare manages the custom domain and TLS
certificate for `abod.dev`. A Worker route on `www.abod.dev/*` handles the
canonical redirect; the existing DNS record for `www` must remain proxied by
Cloudflare.

For automatic deployments, connect this repository to Cloudflare Workers Builds,
select `main`, set the build command to `bun run build`, and set the deploy command
to `bunx wrangler deploy`. Install dependencies with `bun install --frozen-lockfile`.

After deployment, verify `https://abod.dev` and confirm that
`https://www.abod.dev` redirects to it. The `workers.dev` URL remains available
for direct deployment checks.
