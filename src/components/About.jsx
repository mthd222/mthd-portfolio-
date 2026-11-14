import { Reveal } from './Section.jsx'

const principles = [
  ['Evidence before claims', 'I validate findings manually and keep conclusions traceable to observable behaviour.'],
  ['Impact in plain language', 'A useful report connects the technical weakness to risk and a practical fix.'],
  ['Defence informed by offence', 'Testing attack paths makes detection logic, hardening, and response more effective.'],
]

export default function About() {
  return (
    <section id="about" className="briefing-section" aria-labelledby="briefing-title">
      <div className="brief-grid">
        <Reveal className="brief-index">
          <span>PROFILE BRIEF</span>
          <p>01 / MTHD</p>
        </Reveal>

        <Reveal className="brief-copy" delay={1}>
          <h2 id="briefing-title">Security work should be explainable, reproducible, and useful.</h2>
          <p>
            I work across the defensive and offensive sides of cybersecurity: learning enterprise protection
            and vulnerability-management platforms, building Wazuh-based SOC and XDR capabilities, and testing
            web applications and networks in controlled environments.
          </p>
          <p>
            My strongest work combines hands-on validation with structured communication—capturing evidence,
            assessing impact, and writing remediation that a technical team can act on.
          </p>
        </Reveal>

        <div className="brief-principles">
          {principles.map(([title, text], index) => (
            <Reveal key={title} className="principle" delay={index}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
