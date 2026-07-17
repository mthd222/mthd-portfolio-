import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeading, Reveal } from './Section.jsx'
import { skillRadar, skillGroups } from '../data/resume.js'

const ICONS = {
  radar: '◎',
  crosshair: '⌖',
  globe: '🌐',
  target: '◈',
  tool: '⚙',
  network: '🕸',
  code: '</>',
  doc: '☰',
}

function RadarChart() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const size = 340
  const cx = size / 2
  const cy = size / 2
  const maxR = 120
  const n = skillRadar.length

  const point = (i, r) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
  }

  const polygon = skillRadar
    .map((s, i) => point(i, (s.value / 100) * maxR).join(','))
    .join(' ')

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-sm">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full">
        {/* rings */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon
            key={f}
            points={skillRadar.map((_, i) => point(i, maxR * f).join(',')).join(' ')}
            fill="none"
            stroke="rgba(0,255,156,0.12)"
            strokeWidth="1"
          />
        ))}
        {/* spokes */}
        {skillRadar.map((_, i) => {
          const [x, y] = point(i, maxR)
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(0,255,156,0.12)" strokeWidth="1" />
        })}
        {/* value polygon */}
        <motion.polygon
          points={polygon}
          fill="rgba(0,255,156,0.14)"
          stroke="#00ff9c"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {/* vertex dots */}
        {skillRadar.map((s, i) => {
          const [x, y] = point(i, (s.value / 100) * maxR)
          return (
            <motion.circle
              key={s.axis}
              cx={x}
              cy={y}
              r="4"
              fill="#00d4ff"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.08 }}
            />
          )
        })}
        {/* labels */}
        {skillRadar.map((s, i) => {
          const [x, y] = point(i, maxR + 28)
          return (
            <text
              key={s.axis}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10.5"
              fill="#9fb8ac"
            >
              <tspan x={x} dy="-0.3em">{s.axis}</tspan>
              <tspan x={x} dy="1.2em" fill="#00ff9c" fontWeight="bold">{s.value}%</tspan>
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-24">
      <SectionHeading tag="nmap -sV skills.local" title="Attack" accent="Surface" />

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.5fr]">
        <Reveal className="lg:sticky lg:top-24">
          <div className="neon-card corner-brackets p-6">
            <p className="mb-4 font-mono text-xs text-mist/70">
              <span className="text-neon">$</span> ./skill_radar --scan
            </p>
            <RadarChart />
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={(gi % 2) * 0.08}>
              <div className="neon-card h-full p-5">
                <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-ghost">
                  <span className="font-mono text-neon">{ICONS[group.icon]}</span>
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-line bg-panel px-2 py-1 font-mono text-[11.5px] text-mist transition hover:border-neon/50 hover:text-neon"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
