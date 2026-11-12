import { useState } from 'react'
import { Section } from './Section.jsx'
import { profile, interests, languages } from '../data/resume.js'
import { splitOnDash } from '../sections.js'
import Icon from './Icons.jsx'

const bare = (url = '') => url.replace(/^https?:\/\/(www\.)?/, '')

const CHANNELS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'WhatsApp', value: 'Start a chat', href: profile.whatsapp, icon: 'chat' },
  { label: 'LinkedIn', value: bare(profile.linkedin), href: profile.linkedin, icon: 'linkedin' },
  { label: 'GitHub', value: bare(profile.github), href: profile.github, icon: 'github' },
]

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [opened, setOpened] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[Portfolio] Message from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setOpened(true)
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="font-semibold">Your name</span>
          <input
            required
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            className="field"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="font-semibold">Your email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            className="field"
          />
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className="font-semibold">Message</span>
        <textarea
          required
          rows="6"
          name="message"
          value={form.message}
          onChange={update('message')}
          className="field resize-y"
        />
      </label>

      <div>
        <button type="submit" className="btn btn-solid">
          <Icon name="mail" size={18} />
          Open email draft
        </button>
        <p className="mt-3 text-muted" role="status">
          {opened
            ? `Draft opened in your email app. If nothing happened, write to ${profile.email}.`
            : 'This opens a draft in your own email app. Nothing is stored on this site.'}
        </p>
      </div>
    </form>
  )
}

function ChipList({ title, items }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className="cell">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Contact() {
  return (
    <Section id="contact" title="Contact" note={splitOnDash(profile.availability)[0]}>
      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div>
          <p className="flex items-start gap-3 text-xl leading-snug font-medium">
            <span className="live-dot mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
            {profile.availability}
          </p>

          <ul className="mt-7 border-y border-rule">
            {CHANNELS.map((channel) => {
              const external = channel.href.startsWith('http')
              return (
                <li key={channel.label} className="border-t border-rule first:border-t-0">
                  <a
                    href={channel.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer noopener' : undefined}
                    className="group flex min-h-14 items-center gap-3.5 py-2.5"
                  >
                    <Icon name={channel.icon} size={22} />
                    <span className="w-24 shrink-0 font-semibold">{channel.label}</span>
                    <span className="link min-w-0 break-words group-hover:decoration-current">
                      {channel.value}
                    </span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <ContactForm />
      </div>

      <div className="mt-14 grid gap-x-14 gap-y-8 sm:grid-cols-2">
        <ChipList title="Outside work" items={interests} />
        <ChipList title="Languages" items={languages} />
      </div>
    </Section>
  )
}
