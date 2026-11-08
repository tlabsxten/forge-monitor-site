import { useEffect, useState } from 'react'
import { AppleIcon, ArrowIcon } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="nav-brand" href="#top" aria-label="Forge Monitor home">
        <span className="brand-mark">F</span>
        <span className="brand-type">
          <strong>FORGE</strong>
          <small>MONITOR</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="#signal">Signal</a>
        <a href="#features">Features</a>
        <a href="#product">Dashboard</a>
        <a href="#download">Download</a>
      </nav>

      <a className="nav-cta" href="./downloads/ForgeMonitor-1.0.0-macOS.dmg" download>
        <AppleIcon size={14} />
        <span>Download</span>
        <ArrowIcon size={14} />
      </a>
    </header>
  )
}
