import { useState } from 'react'
import ForgeCore from './ForgeCore'
import Reveal from './Reveal'
import { CheckIcon, PulseIcon } from './Icons'

export default function SignalLab() {
  const [tests, setTests] = useState(82)
  const [acceptance, setAcceptance] = useState(64)
  const [showNoSignal, setShowNoSignal] = useState(false)

  const testValue = showNoSignal ? 0 : tests
  const acceptanceValue = showNoSignal ? 0 : acceptance
  const combined = testValue * 0.7 + acceptanceValue * 0.3
  const hasSignal = testValue > 0 || acceptanceValue > 0

  return (
    <section id="signal" className="section signal-section">
      <Reveal className="section-head">
        <span className="kicker">THE SIGNAL ENGINE</span>
        <h2>Calibrate the signal.</h2>
        <p>
          Forge does not estimate. It combines real test results and acceptance criteria into one weighted
          score. Move the inputs. Watch the core respond.
        </p>
      </Reveal>

      <div className="signal-layout">
        <Reveal className="signal-visual" delay={80}>
          <div className="core-stage lab-core">
            <ForgeCore
              testProgress={testValue / 100}
              acceptanceProgress={acceptanceValue / 100}
              label="Interactive Forge Monitor signal core"
            />
            <div className="core-hud">
              <span className="hud-label hud-tests">
                <i />
                TESTS <b>{testValue}</b>
              </span>
              <span className="hud-label hud-acceptance">
                <i />
                ACCEPTANCE <b>{acceptanceValue}</b>
              </span>
              <div className="hud-score">
                <strong>{hasSignal ? combined.toFixed(1) : '—'}</strong>
                <span>{hasSignal ? 'SIGNAL' : 'NO SIGNAL'}</span>
              </div>
              <span className="hud-caption">70 / 30 WEIGHTED SIGNAL</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="signal-panel" delay={150}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">INPUTS</span>
              <h3>Real work only</h3>
            </div>
            <PulseIcon size={20} />
          </div>

          <label className="range-field">
            <span>
              TEST HEALTH
              <b>{testValue}%</b>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={testValue}
              style={{ '--value': `${testValue}%` }}
              onChange={(event) => {
                setShowNoSignal(false)
                setTests(Number(event.target.value))
              }}
              aria-label="Test health percentage"
            />
          </label>

          <label className="range-field">
            <span>
              ACCEPTANCE
              <b>{acceptanceValue}%</b>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={acceptanceValue}
              style={{ '--value': `${acceptanceValue}%` }}
              onChange={(event) => {
                setShowNoSignal(false)
                setAcceptance(Number(event.target.value))
              }}
              aria-label="Acceptance percentage"
            />
          </label>

          <div className="formula">
            <div>
              <span>TESTS × 70%</span>
              <b>{(testValue * 0.7).toFixed(1)}</b>
            </div>
            <div>
              <span>ACCEPTANCE × 30%</span>
              <b>{(acceptanceValue * 0.3).toFixed(1)}</b>
            </div>
            <div className="formula-total">
              <span>OVERALL</span>
              <b>{hasSignal ? `${combined.toFixed(1)}%` : '—'}</b>
            </div>
          </div>

          <div className="signal-note">
            <CheckIcon size={14} />
            <span>
              {hasSignal
                ? 'Every number comes from a real local signal. No estimates, no cloud dependency.'
                : 'When neither signal exists, Forge shows “—” instead of inventing a number.'}
            </span>
          </div>

          <button className="text-button" type="button" onClick={() => setShowNoSignal((value) => !value)}>
            {showNoSignal ? 'Restore sample signal' : 'Show the no-signal state'}
          </button>
        </Reveal>
      </div>
    </section>
  )
}
