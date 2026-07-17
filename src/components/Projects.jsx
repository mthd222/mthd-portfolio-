import { SectionHeading, Reveal } from './Section.jsx'
import { projects } from '../data/resume.js'

const SEVERITY_STYLES = {
  CRITICAL: 'border-danger/60 text-danger bg-danger/10',
  HIGH: 'border-amber/60 text-amber bg-amber/10',
  MEDIUM: 'border-cyber/60 text-cyber bg-cyber/10',
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="ls -la ~/projects" title="Exploit" accent="Archive" />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={(i % 2) * 0.1}>
            <article className="neon-card corner-brackets flex h-full flex-col p-6">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-bold leading-snug text-ghost">
                  {project.name}
                </h3>
                <span
                  className={`shrink-0 border px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${SEVERITY_STYLES[project.severity]}`}
                  title="Impact rating"
                >
                  {project.severity}
                </span>
              </div>

              <p className="mb-4 font-mono text-xs text-mist/60">{project.tag}</p>

              <ul className="mb-5 flex-1 space-y-2.5">
                {project.points.map((point, pi) => (
                  <li key={pi} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                    <span className="mt-0.5 shrink-0 font-mono text-neon">▸</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-panel-2 px-2 py-1 font-mono text-[11px] text-cyber"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
