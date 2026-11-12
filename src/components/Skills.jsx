import { Section } from './Section.jsx'
import { skillRadar, skillGroups } from '../data/resume.js'
import Icon from './Icons.jsx'

export default function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0)
  const ranked = [...skillRadar].sort((a, b) => b.value - a.value)

  return (
    <Section id="skills" title="Skills" note={`${total} skills in ${skillGroups.length} groups`}>
      <div className="max-w-3xl">
        <h3 className="text-lg font-semibold">Where I am strongest</h3>
        <p className="text-muted">Self-assessed, out of 100.</p>
        <ul className="mt-5 grid gap-3">
          {ranked.map(({ axis, value }) => (
            <li key={axis} className="grid items-center gap-x-5 gap-y-1 sm:grid-cols-[12.5rem_minmax(0,1fr)]">
              <span className="font-medium">{axis}</span>
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className="h-6 flex-1 rounded-sm bg-ink/8">
                  <span
                    className="block h-full rounded-sm border-[1.5px] border-ink bg-(--tint)"
                    style={{ width: `${value}%` }}
                  />
                </span>
                <span className="hex w-8 text-right">{value}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="mt-14 text-lg font-semibold">Everything I work with</h3>
      <div className="mt-5 grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <section key={group.title} aria-label={group.title}>
            <h4 className="tinted flex min-h-12 items-center gap-2.5 rounded px-3 py-2.5 leading-tight font-semibold sm:min-h-16">
              <Icon name={group.icon} />
              <span className="flex-1">{group.title}</span>
              <span className="hex text-sm" aria-label={`${group.skills.length} skills`}>
                {group.skills.length}
              </span>
            </h4>
            <ul className="mt-1.5 flex flex-wrap gap-1.5 sm:grid">
              {group.skills.map((skill) => (
                <li key={skill} className="cell">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  )
}
