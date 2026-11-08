import Reveal from './Reveal'
import {
  BoltIcon,
  BranchIcon,
  ClipboardIcon,
  GridIcon,
  LockIcon,
  MonitorIcon,
  ScanIcon,
  SparkIcon,
} from './Icons'

const features = [
  {
    icon: BoltIcon,
    title: 'Real test signal',
    copy: 'Detects Jest, Vitest, Pytest, Go, Cargo, and more. The score moves when your suite actually runs.',
    tag: 'NO FAKE METRICS',
  },
  {
    icon: ClipboardIcon,
    title: 'Acceptance criteria',
    copy: 'Scan TODO.md, ACCEPTANCE.md, or CHECKLIST.md. Track the work that tests alone cannot prove.',
    tag: '70 / 30 WEIGHTED',
  },
  {
    icon: MonitorIcon,
    title: 'Menu bar, always live',
    copy: 'A native NSStatusItem keeps the signal one glance away. Click through for repo-level detail.',
    tag: 'NATIVE MACOS',
  },
  {
    icon: BranchIcon,
    title: 'Git context',
    copy: 'Branch, dirty state, changed files, ahead/behind. Know exactly what tree the signal belongs to.',
    tag: 'WORKING TREE',
  },
  {
    icon: GridIcon,
    title: 'Agent detection',
    copy: 'Claude, Codex, Gemini, Cursor, Aider, and more. See which agents are active in each repo.',
    tag: 'LOCAL ONLY',
  },
  {
    icon: ScanIcon,
    title: 'Drift detection',
    copy: 'Stale tests, contradictory acceptance, no signal at all. Forge surfaces the gaps instead of hiding them.',
    tag: 'HONEST BY DEFAULT',
  },
  {
    icon: LockIcon,
    title: 'Local-first storage',
    copy: 'A single SQLite database on your Mac. No account, no sync, no telemetry leaving the machine.',
    tag: 'SQLITE',
  },
  {
    icon: SparkIcon,
    title: 'Optional AI, your provider',
    copy: 'Point Forge at OpenAI, OpenRouter, Groq, Ollama, or LM Studio. Or leave AI off entirely.',
    tag: 'BRING YOUR OWN',
  },
]

export default function Features() {
  return (
    <section id="features" className="section features-section">
      <Reveal className="section-head split-head">
        <div>
          <span className="kicker">BUILT FOR THE WORK</span>
          <h2>Everything that matters. Nothing that doesn’t.</h2>
        </div>
        <p>
          Forge is a focused instrument, not another dashboard. Each signal is collected locally and tied
          to the repo you are actually working in.
        </p>
      </Reveal>

      <div className="feature-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Reveal key={feature.title} className="feature-card" delay={index * 45}>
              <div className="feature-top">
                <span className="feature-icon">
                  <Icon size={20} />
                </span>
                <span className="feature-tag">{feature.tag}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
