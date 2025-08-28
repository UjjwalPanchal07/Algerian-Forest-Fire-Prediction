import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="brand">
          <div className="logo">🔥</div>
          <span>FWI Predictor</span>
        </div>
        <div className="nav-links">
          <Link className="nav-link" href="/">Home</Link>
          <Link className="nav-link" href="/about">About</Link>
          <Link className="nav-link" href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}


