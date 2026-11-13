import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, useCapturePaused } from '../motion.js'
import CaptureToggle from './CaptureToggle.jsx'
import { profile, experience, education, research, projects } from '../data/resume.js'
import { tintStyle, stripLeadingSymbols, splitOnDash } from '../sections.js'
import Icon from './Icons.jsx'

// First word on the top row with its trailing space, the rest below, so every
// byte of the name (spaces included) is on screen and offsets run straight through.
function nameRows(name) {
  const [first, ...rest] = name.trim().split(/\s+/)
  const rows = rest.length ? [`${first} `, rest.join(' ')] : [first]
  let offset = 0
  return rows.map((row) => [...row].map((char) => ({ char, code: char.charCodeAt(0), offset: offset++ })))
}

const hex = (n, width = 2) => n.toString(16).padStart(width, '0')

function Readout({ byte, total }) {
  if (!byte) {
    return <span>{total} bytes of ASCII. Pick a letter to read its byte.</span>
  }
  const fields = [
    ['offset', `0x${hex(byte.offset, 4)}`],
    ['hex', `0x${hex(byte.code)}`],
    ['dec', byte.code],
    ['bin', byte.code.toString(2).padStart(8, '0')],
    ['char', byte.char === ' ' ? 'space' : `'${byte.char}'`],
  ]
  return fields.map(([label, value]) => (
    <span key={label} className="whitespace-nowrap">
      {label} <span className="text-ink">{value}</span>
    </span>
  ))
}

function FrameName({ name }) {
  const rows = nameRows(name)
  const bytes = rows.flat()
  const [active, setActive] = useState(null)

  return (
    <div onMouseLeave={() => setActive(null)}>
      <h1>
        <span className="sr-only">{name}</span>
        <span aria-hidden="true" className="frame-name block">
          {rows.map((row) => (
            <span key={row[0].offset} className="frame-row">
              {row.map((b) => (
                <span
                  key={b.offset}
                  className="frame-cell"
                  style={{ '--i': b.offset }}
                  data-space={b.char === ' '}
                  data-on={active === b.offset}
                  onMouseEnter={() => setActive(b.offset)}
                  onClick={() => setActive(b.offset)}
                >
                  <span className="frame-glyph">{b.char === ' ' ? ' ' : b.char}</span>
                  <span className="frame-byte hex">{hex(b.code)}</span>
                </span>
              ))}
            </span>
          ))}
        </span>
      </h1>
      <p
        aria-hidden="true"
        className="hex mt-5 flex min-h-12 flex-wrap content-start gap-x-5 gap-y-1 text-[0.8125rem] text-muted"
      >
        <Readout byte={active === null ? null : bytes[active]} total={bytes.length} />
      </p>
    </div>
  )
}

function Summary() {
  const now = experience.find((e) => e.current) || experience[0]
  const degree = education[0]
  const degreeShort = degree?.degree.match(/\(([^)]+)\)/)?.[1] || degree?.degree
  const honor = degree?.honor && splitOnDash(stripLeadingSymbols(degree.honor))
  const journal = splitOnDash(research.journal)[0]
  const status = splitOnDash(profile.availability)[0]

  return (
    <div>
      <h2 className="sr-only">At a glance</h2>
      <ul className="packets">
        {now && (
          <li>
            <a href="#experience" className="packet" style={tintStyle('http')}>
              <span className="font-semibold">Now</span>
              <span>
                {now.role}, {now.company}
              </span>
            </a>
          </li>
        )}
        {degree && (
          <li>
            <a href="#education" className="packet" style={tintStyle('smb')}>
              <span className="font-semibold">Degree</span>
              <span>
                {degreeShort}, {degree.score}
                {honor && (
                  <span className="mt-1 flex items-center gap-1.5 font-semibold">
                    <Icon name="medal" size={18} />
                    {honor.join(', ')}
                  </span>
                )}
              </span>
            </a>
          </li>
        )}
        <li>
          <a href="#research" className="packet" style={tintStyle('icmp')}>
            <span className="font-semibold">Published</span>
            <span>
              {journal}, {research.date}
            </span>
          </a>
        </li>
        <li>
          <a href="#projects" className="packet" style={tintStyle('arp')}>
            <span className="font-semibold">Projects</span>
            <span>{projects.length} security builds, written up</span>
          </a>
        </li>
        <li>
          <a href="#contact" className="packet" style={tintStyle('udp')}>
            <span className="font-semibold">Based in</span>
            <span>{profile.location}</span>
          </a>
        </li>
        <li>
          <a href="#contact" className="packet" style={tintStyle('tcp')}>
            <span className="font-semibold">Status</span>
            <span>{status}</span>
          </a>
        </li>
      </ul>
      <CaptureFeed />
    </div>
  )
}

// Live readout of the background map: packets delivered so far and the last
// port the probe scanned. Decorative, so it is hidden from assistive tech.
function CaptureFeed() {
  const countRef = useRef(null)
  const [probe, setProbe] = useState(null)
  const [reduced] = useState(prefersReducedMotion)
  const paused = useCapturePaused()

  useEffect(() => {
    let count = 0
    const onPacket = () => {
      count += 1
      if (countRef.current) countRef.current.textContent = count.toLocaleString('en-US')
    }
    const onProbe = (e) => setProbe(e.detail)
    window.addEventListener('capture:packet', onPacket)
    window.addEventListener('capture:probe', onProbe)
    return () => {
      window.removeEventListener('capture:packet', onPacket)
      window.removeEventListener('capture:probe', onProbe)
    }
  }, [])

  if (reduced) {
    return (
      <p className="hex mt-4 text-[0.8125rem] text-muted" aria-hidden="true">
        Capture paused: reduced motion is on.
      </p>
    )
  }

  return (
    <div className="hero-rise mt-3 flex flex-wrap items-center justify-between gap-x-4" style={{ '--d': 8 }}>
      <p
        aria-hidden="true"
        className="hex flex min-h-11 flex-wrap items-center gap-x-4 gap-y-1 py-1 text-[0.8125rem] text-muted"
      >
        <span className="inline-flex items-center gap-2">
          <span className="live-dot h-2 w-2 rounded-full bg-alert" />
          {paused ? 'paused' : 'capturing'}
        </span>
        <span className="whitespace-nowrap">
          <span ref={countRef} className="text-ink">
            0
          </span>{' '}
          packets
        </span>
        <span className="whitespace-nowrap">
          probe{' '}
          <span className="text-ink">
            {probe ? `${probe.ip}:${probe.port} ${probe.service} ${probe.state}` : 'starting'}
          </span>
        </span>
      </p>
      <CaptureToggle className="-ml-2 sm:ml-0" />
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="hero-section mx-auto max-w-6xl px-5 pt-10 pb-14 sm:px-8 sm:pt-16 lg:pb-20">
      <div className="grid items-end gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div>
          <p className="hero-kicker hero-rise">Offensive security / detection engineering</p>
          <FrameName name={profile.name} />
          <p className="prose-measure hero-rise mt-4 text-xl leading-snug font-medium sm:text-[1.375rem]">
            Cybersecurity intern in Bengaluru, working on SOC and XDR. I set up detection on Wazuh, and I
            test web apps and networks the way an attacker would.
          </p>
          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ '--d': 1 }}>
            <a href="#projects" className="btn btn-solid">
              See the projects
            </a>
            <a href="/Milan_Tej_Resume.pdf" download="Milan_Tej_Resume.pdf" className="btn">
              <Icon name="download" size={18} />
              Download resume (PDF)
            </a>
            <a href="#terminal" className="btn">
              <Icon name="terminal" size={18} />
              Open the shell
            </a>
          </div>
        </div>
        <Summary />
      </div>
    </section>
  )
}
