import Reveal from './Reveal'
import dashboard from '../assets/forge-dashboard.png'

export default function Showcase() {
  return (
    <section id="product" className="section showcase-section">
      <Reveal className="section-head centered-head">
        <span className="kicker">THE DASHBOARD</span>
        <h2>One surface. Every repo.</h2>
        <p>
          A cinematic control room for the unglamorous truth of software: what passed, what is accepted,
          and what still needs work.
        </p>
      </Reveal>

      <Reveal className="product-frame-wrap" delay={100}>
        <div className="product-glow" aria-hidden="true" />
        <div className="product-frame">
          <div className="frame-bar">
            <div className="frame-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="frame-title">FORGE MONITOR / LOCAL DASHBOARD</span>
            <span className="frame-status">
              <i />
              LIVE
            </span>
          </div>
          <img
            src={dashboard}
            alt="Forge Monitor dashboard showing repo list, progress ring, test status, and acceptance criteria"
            width="1800"
            height="1241"
          />
        </div>

        <div className="float-card float-card-a">
          <span>TEST SIGNAL</span>
          <strong>82%</strong>
          <small>Real suite health</small>
        </div>
        <div className="float-card float-card-b">
          <span>ACCEPTANCE</span>
          <strong>64%</strong>
          <small>Criteria complete</small>
        </div>
        <div className="float-card float-card-c">
          <span>STORAGE</span>
          <strong>LOCAL</strong>
          <small>SQLite on device</small>
        </div>
      </Reveal>

      <Reveal className="showcase-notes" delay={140}>
        <div>
          <b>Repo-level detail</b>
          <span>Branch, dirty state, agent activity, and test history in one view.</span>
        </div>
        <div>
          <b>Honest empty states</b>
          <span>No signal is a valid answer. Forge never fills the gap with a guess.</span>
        </div>
        <div>
          <b>Built to stay open</b>
          <span>Native macOS, local SQLite, no account required.</span>
        </div>
      </Reveal>
    </section>
  )
}
