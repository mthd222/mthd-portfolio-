import { Section, Reveal } from './Section.jsx'
import { research } from '../data/resume.js'
import { splitOnDash } from '../sections.js'

export default function Research() {
  const [journal, journalLong] = splitOnDash(research.journal)
  return (
    <Section id="research" title="Published research" note={`Published ${research.date}`}>
      <Reveal as="article" className="research-report">
        <div className="research-cover">
          <span>SECURITY RESEARCH / 2026</span>
          <strong>RDP</strong>
          <i>VERSUS</i>
          <strong>VNC</strong>
          <div className="research-wire" aria-hidden="true" />
          <p>WITH WIREGUARD VPN</p>
        </div>

        <div className="research-body">
          <p className="dossier-code">PUBLICATION / {journal}</p>
          <h3>{research.title}</h3>
          {journalLong && <p className="research-journal">{journalLong}</p>}
          <div className="research-evidence">
            {research.points.map((point, index) => (
              <div key={point}>
                <span>FINDING {String(index + 1).padStart(2, '0')}</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
