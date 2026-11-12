import { Section, Entry, Points } from './Section.jsx'
import { projects } from '../data/resume.js'
import { splitOnDot } from '../sections.js'

const SEVERITY = {
  CRITICAL: 'bg-rst text-rst-ink',
  HIGH: 'bg-salmon text-fixed',
  MEDIUM: 'bg-wheat text-fixed',
  LOW: 'bg-tcp text-fixed',
}

const sentenceCase = (s = '') => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export default function Projects() {
  return (
    <Section id="projects" title="Projects" note="Written up the way I would report a finding">
      <ol>
        {projects.map((project) => {
          const [kind, when] = splitOnDot(project.tag)
          return (
            <Entry
              key={project.name}
              aside={
                <>
                  {project.severity && (
                    <p
                      className={`rounded px-2.5 py-1 text-sm font-semibold ${
                        SEVERITY[project.severity] || SEVERITY.LOW
                      }`}
                    >
                      <span className="sr-only">Severity: </span>
                      {sentenceCase(project.severity)}
                    </p>
                  )}
                  <p className="font-semibold">{kind}</p>
                  {when && <p className="text-muted">{when}</p>}
                </>
              }
            >
              <h3 className="max-w-[30ch] text-2xl leading-tight font-semibold">{project.name}</h3>
              <Points items={project.points} />
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
                {project.tech.map((t) => (
                  <li key={t} className="cell">
                    {t}
                  </li>
                ))}
              </ul>
            </Entry>
          )
        })}
      </ol>
    </Section>
  )
}
