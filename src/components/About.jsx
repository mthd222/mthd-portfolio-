import { Section, Reveal } from './Section.jsx'
import { profile, stats } from '../data/resume.js'
import { useSeen, useCountUp } from '../motion.js'

const format = (value, suffix = '') => `${Number(value).toLocaleString('en-US')}${suffix}`

function Stat({ stat, active }) {
  const shown = useCountUp(Number(stat.value), active)
  return (
    <div className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] items-baseline gap-4 border-t border-rule py-4 first:border-t-0">
      <dd className="display order-1 text-4xl">
        <span className="sr-only">{format(stat.value, stat.suffix)}</span>
        <span aria-hidden="true">{format(shown, stat.suffix)}</span>
      </dd>
      <dt className="order-2 text-muted">{stat.label}</dt>
    </div>
  )
}

export default function About() {
  const [lead, ...rest] = profile.summary.split(/(?<=\.)\s+(?=[A-Z])/)
  const [numbersRef, numbersSeen] = useSeen()

  return (
    <Section id="about" title="About" note={profile.location}>
      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Reveal className="prose-measure">
          <p className="text-xl leading-snug font-medium">{lead}</p>
          {rest.map((sentence) => (
            <p key={sentence} className="mt-4">
              {sentence}
            </p>
          ))}
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Roles">
            {profile.roles.map((role) => (
              <li key={role} className="cell">
                {role}
              </li>
            ))}
          </ul>
        </Reveal>

        <div ref={numbersRef} data-reveal="" data-seen={numbersSeen || undefined} style={{ '--d': 1 }}>
          <h3 className="text-lg font-semibold">In numbers</h3>
          <dl className="mt-3 border-y border-rule">
            {stats.map((stat) => (
              <Stat key={stat.label} stat={stat} active={numbersSeen} />
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
