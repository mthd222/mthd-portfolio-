import { SectionHeading, Reveal } from './Section.jsx'
import { education, certifications } from '../data/resume.js'

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="sudo cat /etc/education" title="Education &" accent="Certifications" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 0.1}>
            <div className="neon-card corner-brackets h-full p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyber">
                ▚ Degree
              </p>
              <h4 className="mt-2 font-display text-lg font-bold text-ghost">{edu.degree}</h4>
              <p className="mt-1.5 text-sm text-mist">{edu.school}</p>
              <p className="mt-1 font-mono text-xs text-mist/60">{edu.period}</p>
              <p className="mt-3 inline-block bg-neon/10 px-2.5 py-1 font-mono text-sm font-bold text-neon">
                {edu.score}
              </p>
            </div>
          </Reveal>
        ))}

        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={0.2 + i * 0.1}>
            <div className="neon-card corner-brackets h-full p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-amber">
                ★ Certification
              </p>
              <h4 className="mt-2 font-display text-lg font-bold text-ghost">{cert.name}</h4>
              <p className="mt-1.5 text-sm text-mist">{cert.issuer}</p>
              <p className="mt-3 inline-block bg-amber/10 px-2.5 py-1 font-mono text-xs font-bold text-amber">
                VERIFIED ✔
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
