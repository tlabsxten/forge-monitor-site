import { AppleIcon, ArrowIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="nav-brand" href="#top" aria-label="Forge Monitor home">
          <span className="brand-mark">F</span>
          <span className="brand-type">
            <strong>FORGE</strong>
            <small>MONITOR</small>
          </span>
        </a>
        <p>Train the work. Not the guesswork.</p>
        <a className="footer-download" href="./downloads/ForgeMonitor-1.0.0-macOS.dmg" download>
          <AppleIcon size={15} />
          Download
          <ArrowIcon size={14} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Forge Monitor. Local-first engineering telemetry.</span>
        <span>Built for macOS. No cloud required.</span>
      </div>
    </footer>
  )
}
