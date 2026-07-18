import { SectionHeading, Reveal } from './Section.jsx'
import { research } from '../data/resume.js'

export default function Research() {
  return (
    <section id="research" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="grep -r 'published'" title="Research" accent="Publication" />

      <Reveal>
        <article className="neon-card corner-brackets mx-auto max-w-3xl p-7">
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
    </section>
  )
}
