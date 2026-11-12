import { Section, Points } from './Section.jsx'
import { research } from '../data/resume.js'
import { splitOnDash } from '../sections.js'

export default function Research() {
  const [short, full] = splitOnDash(research.journal)

  return (
    <Section id="research" title="Research" note={`Published ${research.date}`}>
      <article className="grid gap-x-10 gap-y-6 md:grid-cols-[13.5rem_minmax(0,1fr)]">
        <div className="tinted self-start rounded-md px-4 py-5">
          <p className="display text-3xl">{short}</p>
          <p className="mt-2 font-semibold">{research.date}</p>
          <p className="mt-1 text-sm">Peer-reviewed journal</p>
        </div>
        <div className="min-w-0">
          <h3 className="max-w-[32ch] text-2xl leading-tight font-semibold">{research.title}</h3>
          {full && <p className="mt-2 text-lg text-muted">{full}</p>}
          <Points items={research.points} />
        </div>
      </article>
    </Section>
  )
}
