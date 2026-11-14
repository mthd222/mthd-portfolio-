import { profile, experience, education, research, projects } from '../data/resume.js'
import Icon from './Icons.jsx'

const proof = [
  { value: `${experience.length}`, label: 'Security internships', detail: 'SOC, SIEM & XDR' },
  { value: education[0]?.score?.replace('CGPA ', '') || '9.56 / 10', label: 'MCA CGPA', detail: 'Silver medalist' },
  { value: '10K+', label: 'Packets analysed', detail: 'Published research' },
  { value: `${projects.length}`, label: 'Documented builds', detail: 'Offence + defence' },
]

export default function Hero() {
  const current = experience.find((item) => item.current) || experience[0]

  return (
    <section id="top" className="hero-shell">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="availability-pill hero-rise">
            <span aria-hidden="true" />
            Open to cybersecurity opportunities
          </div>

          <p className="hero-kicker hero-rise">Cybersecurity practitioner · Offensive testing · Detection engineering</p>
          <h1 className="hero-title">
            <span>Milan Tej</span>
            <strong>H D</strong>
          </h1>

          <p className="hero-deck hero-rise">
            I find where systems break, prove the impact responsibly, and turn the evidence into stronger
            controls—from web application testing to SOC and XDR engineering.
          </p>

          <div className="identity-line hero-rise" aria-label="Professional identity">
            <span>IDENTITY</span>
            <strong>MTHD</strong>
            <i>/</i>
            <strong>@mthd222</strong>
            <i>/</i>
            <span>{profile.location}</span>
          </div>

          <div className="hero-actions hero-rise">
            <a href="#projects" className="btn btn-solid">
              Explore case files
              <Icon name="down" size={18} />
            </a>
            <a href="/Milan_Tej_Resume.pdf" download="Milan_Tej_Resume.pdf" className="btn">
              <Icon name="download" size={18} />
              Résumé
            </a>
            <a href="#contact" className="btn btn-quiet">Start a conversation</a>
          </div>
        </div>

        <aside className="operator-panel hero-rise" aria-label="Current operating profile">
          <div className="operator-head">
            <span>OPERATOR PROFILE</span>
            <span>BLR / IN</span>
          </div>
          <div className="operator-mark" aria-hidden="true">
            <span>M</span>
            <strong>THD</strong>
            <i>222</i>
          </div>
          <div className="operator-status">
            <span>CURRENT ASSIGNMENT</span>
            <strong>{current?.role}</strong>
            <p>{current?.company}</p>
          </div>
          <div className="focus-grid">
            <div><span>01</span><strong>VAPT</strong><p>Web & network validation</p></div>
            <div><span>02</span><strong>SOC / XDR</strong><p>Detection and correlation</p></div>
            <div><span>03</span><strong>RESEARCH</strong><p>{research.date} publication</p></div>
          </div>
        </aside>
      </div>

      <dl className="proof-grid" aria-label="Verified highlights">
        {proof.map((item) => (
          <div key={item.label} className="proof-item">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
            <p>{item.detail}</p>
          </div>
        ))}
      </dl>
    </section>
  )
}
