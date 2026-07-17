import { SectionHeading, Reveal } from './Section.jsx'
import { profile, interests, languages } from '../data/resume.js'

const CHANNELS = [
  {
    label: 'EMAIL',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: '✉',
  },
  {
    label: 'PHONE',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    icon: '☎',
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/mthd22',
    href: profile.linkedin,
    icon: 'in',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="nc -lvnp 4444" title="Open a" accent="Channel" />

      <div className="grid gap-6 lg:grid-cols-3">
        {CHANNELS.map((ch, i) => (
          <Reveal key={ch.label} delay={i * 0.1}>
            <a
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="neon-card corner-brackets group block p-6 text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center border border-neon/40 font-mono text-xl text-neon transition group-hover:bg-neon/10 group-hover:shadow-neon">
                {ch.icon}
              </span>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60">
                {ch.label}
              </p>
              <p className="mt-1.5 break-all font-mono text-sm text-cyber group-hover:text-neon">
                {ch.value}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.25}>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="neon-card p-6">
            <p className="section-tag mb-3 !text-xs">// off-duty operations</p>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((interest) => (
                <span key={interest} className="border border-line bg-panel px-2.5 py-1 font-mono text-xs text-mist">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div className="neon-card p-6">
            <p className="section-tag mb-3 !text-xs">// languages loaded</p>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <span key={lang} className="border border-line bg-panel px-2.5 py-1 font-mono text-xs text-mist">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.35}>
        <p className="mt-12 text-center font-mono text-sm text-neon">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-neon pulse-dot" />
          {profile.availability}
        </p>
      </Reveal>
    </section>
  )
}
