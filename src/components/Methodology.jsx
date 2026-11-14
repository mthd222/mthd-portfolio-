import { Section, Reveal } from './Section.jsx'

const STAGES = [
  ['01', 'Scope', 'Define authorization, assets, constraints, and success criteria before testing begins.'],
  ['02', 'Map', 'Identify exposed services, trust boundaries, identities, and likely attack paths.'],
  ['03', 'Enumerate', 'Collect application, protocol, and configuration evidence with repeatable tooling.'],
  ['04', 'Validate', 'Separate genuine weaknesses from scanner noise through controlled manual verification.'],
  ['05', 'Demonstrate', 'Prove impact safely in the approved environment and stop at the agreed boundary.'],
  ['06', 'Report', 'Translate technical evidence into severity, business impact, and clear remediation steps.'],
  ['07', 'Retest', 'Verify fixes, document residual risk, and close the loop with reproducible evidence.'],
]

export default function Methodology() {
  return (
    <Section id="methodology" title="Methodology" note="A repeatable engagement, not a tool dump">
      <Reveal className="method-intro">
        <p className="section-lead">
          I approach security work as an evidence chain: every conclusion should be traceable from scope to
          observation, impact, remediation, and retest.
        </p>
        <p className="method-standard">Informed by OWASP, STRIDE, MITRE ATT&amp;CK, CVSS, and structured reporting.</p>
      </Reveal>

      <ol className="method-grid">
        {STAGES.map(([number, title, text], index) => (
          <Reveal as="li" key={title} delay={index % 4} className="method-step">
            <div className="method-step-head">
              <span>{number}</span>
              <span className="method-line" aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
