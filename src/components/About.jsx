import { Section } from './Section.jsx'
import { profile, stats } from '../data/resume.js'

const formatValue = ({ value, suffix = '' }) => `${Number(value).toLocaleString('en-US')}${suffix}`

export default function About() {
  const [lead, ...rest] = profile.summary.split(/(?<=\.)\s+(?=[A-Z])/)

  return (
    <Section id="about" title="About" note={profile.location}>
      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="prose-measure">
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
        </div>

        <div>
          <h3 className="text-lg font-semibold">In numbers</h3>
          <dl className="mt-3 border-y border-rule">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] items-baseline gap-4 border-t border-rule py-4 first:border-t-0"
              >
                <dd className="display order-1 text-4xl">{formatValue(stat)}</dd>
                <dt className="order-2 text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
