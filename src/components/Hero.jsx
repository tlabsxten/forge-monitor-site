import ForgeCore from './ForgeCore'
import { AppleIcon, ArrowIcon } from './Icons'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="kicker">
          <span className="kicker-dot" />
          LOCAL-FIRST ENGINEERING TELEMETRY
        </div>

        <h1 id="hero-title">
          Train the work.
          <span>Not the guesswork.</span>
        </h1>

        <p className="lede">
          Forge Monitor turns real test runs, acceptance criteria, git state, and agent activity into one
          honest progress signal. On your Mac. No cloud required.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="./downloads/ForgeMonitor-1.0.0-macOS.dmg" download>
            <AppleIcon size={16} />
            Download for macOS
          </a>
          <a className="btn btn-ghost" href="#signal">
            See the signal
            <ArrowIcon size={15} />
          </a>
        </div>

        <p className="hero-meta">macOS 10.13+ · Intel + Apple Silicon · 12 MB · Local-first</p>
      </div>

      <div className="hero-visual">
        <div className="core-stage hero-core">
          <ForgeCore testProgress={0.82} acceptanceProgress={0.64} label="Forge Monitor live signal core" />
          <div className="core-hud">
            <span className="hud-label hud-tests">
              <i />
              TESTS <b>82</b>
            </span>
            <span className="hud-label hud-acceptance">
              <i />
              ACCEPTANCE <b>64</b>
            </span>
            <span className="hud-label hud-live">
              <i />
              LIVE SIGNAL
            </span>
            <div className="hud-score">
              <strong>76.6</strong>
              <span>OVERALL</span>
            </div>
            <span className="hud-caption">REAL SIGNALS ONLY / NO ESTIMATES</span>
          </div>
        </div>
      </div>

      <div className="signal-strip" aria-label="Product signals">
        <span>TESTS 70%</span>
        <i />
        <span>ACCEPTANCE 30%</span>
        <i />
        <span>SQLITE LOCAL</span>
        <i />
        <span>MENU BAR LIVE</span>
        <i />
        <span>NO CLOUD</span>
      </div>
    </section>
  )
}
