import '@fontsource-variable/archivo'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './globals.css'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`
  },
  description: site.description,
  applicationName: 'Abod.dev',
  authors: [{ name: site.formalName, url: site.url }],
  creator: site.formalName,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' }
  },
  openGraph: {
    type: 'website',
    url: site.url,
    title: `${site.name} — ${site.title}`,
    description: site.description,
    siteName: 'Abod.dev'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.title}`,
    description: site.description
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon-192x192.png'
  },
  manifest: '/manifest.json'
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f3efe4',
  width: 'device-width',
  initialScale: 1
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.formalName,
  alternateName: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: 'Senior Software Engineer',
  sameAs: Object.values(site.socials)
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="page-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  )
}
