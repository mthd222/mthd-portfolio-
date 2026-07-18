import { useState } from 'react'
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
    label: 'WHATSAPP',
    value: 'Chat on WhatsApp',
    href: profile.whatsapp,
    icon: '✆',
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/mthd222',
    href: profile.linkedin,
    icon: 'in',
  },
  {
    label: 'GITHUB',
    value: 'github.com/mthd222',
    href: profile.github,
    icon: '{ }',
  },
]

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[Portfolio] Message from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const inputCls =
    'w-full border border-line bg-void/80 px-3.5 py-2.5 font-mono text-sm text-ghost caret-neon outline-none transition placeholder:text-mist/40 focus:border-neon/60 focus:shadow-neon'

  return (
    <form onSubmit={submit} className="neon-card corner-brackets p-6 sm:p-7">
      <p className="mb-5 font-mono text-xs text-mist/70">
        <span className="text-neon">$</span> ./send_transmission.sh --encrypted
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.25em] text-mist/60">
            &gt; name
          </span>
          <input
            required
            value={form.name}
            onChange={update('name')}
            placeholder="Jane Recruiter"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.25em] text-mist/60">
            &gt; reply_to
          </span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@company.com"
            className={inputCls}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.25em] text-mist/60">
          &gt; payload
        </span>
        <textarea
          required
          rows="5"
          value={form.message}
          onChange={update('message')}
          placeholder="We'd like to talk to you about a security role..."
          className={`${inputCls} resize-y`}
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="corner-brackets border border-neon/60 bg-neon/10 px-7 py-2.5 font-mono text-sm font-medium text-neon transition hover:bg-neon/20 hover:shadow-neon"
        >
          transmit --now ▸
        </button>
        {sent && (
          <span className="font-mono text-xs text-cyber">
            ✔ opening your mail client — transmission ready
          </span>
        )}
      </div>

      <p className="mt-4 font-mono text-[10px] text-mist/40">
        // routes through your own email client — nothing is stored on this site
      </p>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="nc -lvnp 4444" title="Open a" accent="Channel" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((ch, i) => (
          <Reveal key={ch.label} delay={i * 0.08}>
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

      <Reveal delay={0.2} className="mt-10">
        <ContactForm />
      </Reveal>

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
