import { Section, Entry, Points } from './Section.jsx'
import { experience } from '../data/resume.js'

export default function Experience() {
  const count = experience.length

  return (
    <Section id="experience" title="Experience" note={`${count} ${count === 1 ? 'role' : 'roles'} so far`}>
      <ol>
        {experience.map((job) => (
          <Entry
            key={`${job.company}-${job.period}`}
            aside={
              <>
                <p className="font-semibold">{job.period}</p>
                {job.current && (
                  <p className="tinted inline-flex items-center gap-2 rounded px-2.5 py-1 text-sm font-semibold">
                    <span className="live-dot h-2 w-2 rounded-full bg-fixed" aria-hidden="true" />
                    Current role
                  </p>
                )}
              </>
            }
          >
            <h3 className="text-2xl leading-tight font-semibold">{job.role}</h3>
            <p className="mt-1 text-lg text-muted">{job.company}</p>
            <Points items={job.points} />
          </Entry>
        ))}
      </ol>
    </Section>
  )
}
