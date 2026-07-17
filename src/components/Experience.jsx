import { SectionHeading, Reveal } from './Section.jsx'
import { experience } from '../data/resume.js'

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="git log --experience" title="Mission" accent="Log" />

      <div className="relative ml-3 border-l border-line pl-8 sm:ml-6">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.12} className="relative pb-12 last:pb-0">
            {/* timeline node */}
            <span
              className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 ${
                job.current
                  ? 'border-neon bg-neon/30 pulse-dot'
                  : 'border-mist/40 bg-panel'
              }`}
            />
            <div className="neon-card corner-brackets p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-bold text-ghost">{job.role}</h3>
                <span className="font-mono text-xs text-cyber">{job.period}</span>
              </div>
              <p className="mt-1 font-mono text-sm text-neon">
                @ {job.company}
                {job.current && (
                  <span className="ml-3 border border-neon/50 bg-neon/10 px-2 py-0.5 text-[10px] uppercase tracking-widest">
                    active
                  </span>
                )}
              </p>
              <ul className="mt-4 space-y-2.5">
                {job.points.map((point, pi) => (
                  <li key={pi} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                    <span className="mt-0.5 shrink-0 font-mono text-neon">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
