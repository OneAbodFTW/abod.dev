import Link from 'next/link'

const navItems = [
  ['About', '/#about'],
  ['Creator', '/#creator'],
  ['Experience', '/#experience'],
  ['Projects', '/#projects'],
  ['Writing', '/blog']
] as const

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Abod, home">
        <span className="wordmark-mark" aria-hidden="true">
          A/
        </span>
        <span>ABOD.DEV</span>
      </Link>

      <nav aria-label="Primary navigation">
        <ul className="site-nav">
          {navItems.map(([label, href]) => (
            <li key={label}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link className="header-contact" href="/#contact">
        <span className="status-dot" aria-hidden="true" />
        Contact
      </Link>
    </header>
  )
}
