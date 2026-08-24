import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div className="section-kicker">
        <span>404</span>
        <span>SIGNAL LOST</span>
      </div>
      <h1>Nothing on this frequency.</h1>
      <p>
        The address may have moved during the rebuild, or it may never have
        existed. The main transmission is still live.
      </p>
      <Link className="button button-primary" href="/">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </main>
  )
}
