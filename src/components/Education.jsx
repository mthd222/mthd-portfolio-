import { Section, Reveal } from './Section.jsx'
import { education, certifications } from '../data/resume.js'
import { stripLeadingSymbols } from '../sections.js'

export default function Education() {
  return (
    <Section id="education" title="Credentials" note="Academic foundation and verified learning">
      <div className="credential-grid">
        {education.map((item, index) => (
          <Reveal as="article" key={item.degree} className="credential-card" delay={index}>
            <div className="credential-top">
              <span>DEGREE / 0{index + 1}</span>
              <span>{item.period}</span>
            </div>
            <h3>{item.degree}</h3>
            <p>{item.school}</p>
            <div className="credential-score">
              <strong>{item.score}</strong>
              {item.honor && <span>{stripLeadingSymbols(item.honor)}</span>}
            </div>
          </Reveal>
        ))}
      </div>

      {certifications.length > 0 && (
        <Reveal className="cert-ledger">
          <div>
            <span>CERTIFICATION LEDGER</span>
            <strong>{String(certifications.length).padStart(2, '0')}</strong>
          </div>
          <ul>
            {certifications.map((cert) => (
              <li key={cert.name}><strong>{cert.name}</strong><span>{cert.issuer}</span></li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  )
}
