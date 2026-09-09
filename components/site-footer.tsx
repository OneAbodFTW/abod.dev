import Link from 'next/link'

import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-mark" aria-hidden="true">
        A/
      </div>
      <div>
        <p>Designed and built by {site.formalName}.</p>
        <p>Broadcasting to the open web.</p>
      </div>
      <div className="footer-links">
        {Object.entries(site.socials).map(([label, url]) => (
          <a key={label} href={url} target="_blank" rel="noreferrer">
            {label}
          </a>
        ))}
        <Link href="/feed.xml">RSS</Link>
      </div>
      <div className="footer-year">© {new Date().getFullYear()}</div>
    </footer>
  )
}
