import Reveal from './Reveal'
import { AppleIcon, ArrowIcon, CheckIcon, DownloadIcon, LockIcon } from './Icons'
import appicon from '../assets/appicon.png'

const installSteps = [
  'Open the DMG and drag Forge Monitor into Applications.',
  'First launch: right-click the app and choose Open.',
  'Approve the macOS prompt, then add your first repo.',
]

export default function Download() {
  return (
    <section id="download" className="section download-section">
      <Reveal className="download-panel">
        <div className="download-glow" aria-hidden="true" />
        <div className="download-copy">
          <span className="kicker">GET THE APP</span>
          <h2>Put the signal on your Mac.</h2>
          <p>
            Forge Monitor 1.0.0 is a universal build for Intel and Apple Silicon. Local-first by design,
            free of accounts and cloud dependencies.
          </p>

          <div className="download-actions">
            <a className="btn btn-primary btn-large" href="./downloads/ForgeMonitor-1.0.0-macOS.dmg" download>
              <AppleIcon size={17} />
              Download for macOS
              <DownloadIcon size={16} />
            </a>
            <a className="btn btn-ghost" href="./downloads/CHECKSUMS.txt" download>
              SHA-256
              <ArrowIcon size={14} />
            </a>
          </div>

          <div className="download-meta">
            <span>
              <CheckIcon size={14} /> macOS 10.13+
            </span>
            <span>
              <CheckIcon size={14} /> Universal binary
            </span>
            <span>
              <CheckIcon size={14} /> 12 MB
            </span>
          </div>

          <div className="checksum">
            <span>SHA-256</span>
            <code>bd68b7819e7e60d89f951a1daa2e160cc3be5b314d3c34c17bf77a9d8fdb6352</code>
          </div>
        </div>

        <div className="download-aside">
          <div className="app-tile">
            <img src={appicon} alt="Forge Monitor app icon" width="1024" height="1024" />
            <div>
              <strong>Forge Monitor</strong>
              <span>Version 1.0.0</span>
              <span>Universal · macOS</span>
            </div>
          </div>

          <div className="install-card">
            <div className="install-heading">
              <LockIcon size={17} />
              <span>FIRST LAUNCH</span>
            </div>
            <ol>
              {installSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p>
              The build is ad-hoc signed, not notarized. If macOS blocks it, use right-click → Open, or run:
            </p>
            <code className="code-line">xattr -dr com.apple.quarantine /Applications/ForgeMonitor.app</code>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
