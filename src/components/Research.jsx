import { SectionHeading, Reveal } from './Section.jsx'
import { research, education, certifications } from '../data/resume.js'

export default function Research() {
  return (
    <section id="research" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="grep -r 'published'" title="Research &" accent="Credentials" />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* publication */}
        <Reveal>
          <article className="neon-card corner-brackets h-full p-7">
            <p className="mb-3 inline-block border border-violet/50 bg-violet/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-violet">
              Peer-Reviewed Publication
            </p>
            <h3 className="font-display text-xl font-bold leading-snug text-ghost">
              {research.title}
            </h3>
            <p className="mt-2 font-mono text-xs text-cyber">
              {research.journal} · {research.date}
            </p>
            <ul className="mt-5 space-y-2.5">
              {research.points.map((point, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                  <span className="mt-0.5 shrink-0 font-mono text-neon">▸</span>
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* education + certs */}
        <div className="flex flex-col gap-6">
          {education.map((edu, i) => (
            <Reveal key={edu.degree} delay={0.1 + i * 0.1}>
              <div className="neon-card p-6">
                <p className="font-mono text-xs text-mist/60">{edu.period}</p>
                <h4 className="mt-1.5 font-display text-base font-bold text-ghost">
                  {edu.degree}
                </h4>
                <p className="mt-1 text-sm text-mist">{edu.school}</p>
                <p className="mt-2 inline-block bg-neon/10 px-2 py-0.5 font-mono text-xs font-bold text-neon">
                  {edu.score}
                </p>
              </div>
            </Reveal>
          ))}
          {certifications.map((cert) => (
            <Reveal key={cert.name} delay={0.3}>
              <div className="neon-card p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber">
                  ★ Certification
                </p>
                <h4 className="mt-1.5 font-display text-base font-bold text-ghost">
                  {cert.name}
                </h4>
                <p className="mt-1 text-sm text-mist">{cert.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
