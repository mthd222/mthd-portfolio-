import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { SectionHeading, Reveal } from './Section.jsx'
import { profile, stats } from '../data/resume.js'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1)
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="font-mono text-4xl font-bold text-neon sm:text-5xl">
      {n.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="cat about.txt" title="Threat Actor" accent="(Ethical)" />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="neon-card corner-brackets p-7">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-mist/60">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon/80" />
              <span className="ml-2">about_milan.md — read-only</span>
            </div>
            <p className="leading-relaxed text-mist">{profile.summary}</p>
            <p className="mt-4 font-mono text-sm text-cyber">
              <span className="text-neon">$</span> status: {profile.availability}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="neon-card flex h-full flex-col justify-between p-5">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="mt-2 text-sm leading-snug text-mist">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
