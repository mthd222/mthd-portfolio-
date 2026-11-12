import { Section, Entry } from './Section.jsx'
import { education, certifications } from '../data/resume.js'
import { stripLeadingSymbols, splitOnDash } from '../sections.js'
import Icon from './Icons.jsx'

export default function Education() {
  return (
    <Section id="education" title="Education" note={education[0]?.score}>
      <ol>
        {education.map((item) => {
          const honor = item.honor && splitOnDash(stripLeadingSymbols(item.honor))
          return (
            <Entry key={item.degree} aside={<p className="font-semibold">{item.period}</p>}>
              <h3 className="text-2xl leading-tight font-semibold">{item.degree}</h3>
              <p className="mt-1 text-lg text-muted">{item.school}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                <p className="display text-2xl">{item.score}</p>
                {honor && (
                  <p className="tinted inline-flex items-center gap-2 rounded px-3 py-1.5 font-semibold">
                    <Icon name="medal" />
                    {honor.join(', ')}
                  </p>
                )}
              </div>
            </Entry>
          )
        })}
      </ol>

      {certifications.length > 0 && (
        <div className="mt-12 grid gap-x-10 gap-y-3 md:grid-cols-[13.5rem_minmax(0,1fr)]">
          <h3 className="text-lg font-semibold">Certifications</h3>
          <ul className="border-y border-rule">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule py-3.5 first:border-t-0"
              >
                <span className="font-semibold">{cert.name}</span>
                <span className="text-muted">{cert.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}
