import { useState } from 'react'
import { Section, Reveal } from './Section.jsx'
import { projects } from '../data/resume.js'
import { splitOnDot } from '../sections.js'

const PRESENTATION = {
  'Secure Authentication System': {
    code: 'AUTH-20',
    type: 'Application security',
    objective: 'Design authentication as a layered control system, then validate it against realistic abuse cases.',
    chain: ['Attack surface', 'Control design', 'Adversarial test', 'Retest'],
    labels: ['Architecture', 'Hardening', 'Validation'],
  },
  'Automated Web Application Security Scanner': {
    code: 'VAPT-08',
    type: 'Offensive security',
    objective: 'Make repeatable reconnaissance and vulnerability validation faster without treating scanner output as proof.',
    chain: ['Recon', 'Discovery', 'Exploit check', 'Report'],
    labels: ['Coverage', 'Automation', 'Outcome'],
  },
  'Automated Privacy Policy Detection & Real-Time Compliance Analysis System': {
    code: 'PRIV-62',
    type: 'Privacy engineering',
    objective: 'Turn dense policy language into inspectable risk signals at the moment a user is asked to consent.',
    chain: ['Detect', 'Extract', 'Analyse', 'Cite evidence'],
    labels: ['System', 'Analysis', 'Evaluation'],
  },
}

const preferredOrder = ['Secure Authentication System', 'Automated Web Application Security Scanner']
const ordered = [...projects].sort((a, b) => {
  const ai = preferredOrder.indexOf(a.name)
  const bi = preferredOrder.indexOf(b.name)
  return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi)
})

export default function Projects() {
  const [selected, setSelected] = useState(0)
  const project = ordered[selected]
  const meta = PRESENTATION[project.name] || {
    code: `CASE-${selected + 1}`,
    type: 'Security engineering',
    objective: project.points[0],
    chain: ['Scope', 'Build', 'Validate', 'Report'],
    labels: ['Build', 'Validation', 'Outcome'],
  }
  const [kind, when] = splitOnDot(project.tag)

  return (
    <Section id="projects" title="Selected case files" note="Built, tested, and documented">
      <div className="case-layout">
        <Reveal className="case-selector" aria-label="Choose a project">
          <p className="case-selector-label">CASE INDEX / {String(ordered.length).padStart(2, '0')}</p>
          {ordered.map((item, index) => {
            const itemMeta = PRESENTATION[item.name]
            const active = index === selected
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelected(index)}
                className="case-tab"
                data-active={active || undefined}
                aria-pressed={active}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.name}</strong>
                <small>{itemMeta?.type || 'Security engineering'}</small>
              </button>
            )
          })}
        </Reveal>

        <Reveal as="article" key={project.name} className="case-dossier" delay={1}>
          <header className="dossier-head">
            <div>
              <span className="dossier-code">CASE FILE / {meta.code}</span>
              <h3>{project.name}</h3>
            </div>
            <div className="dossier-meta">
              <span>{kind}</span>
              <span>{when}</span>
              <span>Controlled project environment</span>
            </div>
          </header>

          <div className="scope-note">
            <span>OBJECTIVE</span>
            <p>{meta.objective}</p>
          </div>

          <ol className="attack-chain" aria-label="Project workflow">
            {meta.chain.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>

          <div className="evidence-grid">
            {project.points.map((point, index) => (
              <section key={point} className="evidence-card">
                <span>{meta.labels[index] || `Evidence ${index + 1}`}</span>
                <p>{point}</p>
              </section>
            ))}
          </div>

          <footer className="dossier-footer">
            <span>TOOLING / CONTROLS</span>
            <ul className="tech-list">
              {project.tech.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </footer>
        </Reveal>
      </div>
    </Section>
  )
}
