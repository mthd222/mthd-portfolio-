import { Section, Reveal } from './Section.jsx'
import { experience } from '../data/resume.js'

export default function Experience() {
  return (
    <Section id="experience" title="Field experience" note="Learning inside real security operations">
      <ol className="experience-timeline">
        {experience.map((job, index) => (
          <Reveal as="li" key={`${job.company}-${job.period}`} className="experience-entry" delay={index}>
            <div className="experience-marker" aria-hidden="true">
              <span>{String(experience.length - index).padStart(2, '0')}</span>
            </div>
            <div className="experience-meta">
              <p>{job.period}</p>
              {job.current && <span className="current-badge">Current deployment</span>}
            </div>
            <div className="experience-content">
              <span className="experience-type">CYBERSECURITY / INTERNSHIP</span>
              <h3>{job.role}</h3>
              <p className="company">{job.company}</p>
              <ul className="point-list">
                {job.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
