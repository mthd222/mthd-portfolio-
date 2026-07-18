import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MatrixRain from './MatrixRain.jsx'
import { profile } from '../data/resume.js'

function useTypewriter(words, speed = 75, pause = 1600) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx % words.length]
    let delay = deleting ? speed / 2 : speed
    if (!deleting && text === word) delay = pause
    if (deleting && text === '') delay = 300

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setWordIdx((i) => i + 1)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, wordIdx, words, speed, pause])

  return text
}

function HexShield() {
  return (
    <div className="float-slow relative mx-auto w-56 sm:w-64 lg:w-80">
      <svg viewBox="0 0 200 220" className="w-full drop-shadow-[0_0_25px_rgba(0,255,156,0.25)]">
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ff9c" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
        {/* outer shield */}
        <path
          d="M100 8 L180 36 V110 C180 160 145 195 100 212 C55 195 20 160 20 110 V36 Z"
          fill="rgba(10,20,16,0.9)"
          stroke="url(#shieldGrad)"
          strokeWidth="2.5"
        />
        {/* inner circuit lines */}
        <g stroke="rgba(0,255,156,0.35)" strokeWidth="1" fill="none">
          <path d="M40 60 H80 V90 H120 V60 H160" />
          <path d="M40 130 H70 V110 H130 V130 H160" />
          <path d="M100 150 V180" />
          <circle cx="80" cy="90" r="3" fill="#00ff9c" />
          <circle cx="120" cy="60" r="3" fill="#00d4ff" />
          <circle cx="70" cy="110" r="3" fill="#00ff9c" />
          <circle cx="130" cy="130" r="3" fill="#00d4ff" />
          <circle cx="100" cy="180" r="3" fill="#00ff9c" />
        </g>
        {/* terminal face */}
        <rect x="46" y="78" width="108" height="60" rx="6" fill="rgba(3,7,6,0.95)" stroke="rgba(0,255,156,0.6)" strokeWidth="1.5" />
        <text x="55" y="100" fontFamily="monospace" fontSize="12" fill="#00ff9c">&gt; whoami</text>
        <text x="55" y="120" fontFamily="monospace" fontSize="12" fill="#00d4ff">
          milan_tej_hd
          <tspan fill="#00ff9c">_</tspan>
        </text>
        {/* lock */}
        <rect x="86" y="158" width="28" height="22" rx="4" fill="none" stroke="url(#shieldGrad)" strokeWidth="2" />
        <path d="M91 158 V150 a9 9 0 0 1 18 0 V158" fill="none" stroke="url(#shieldGrad)" strokeWidth="2" />
      </svg>
      {/* radar sweep ring */}
      <div className="absolute -inset-6 -z-10 rounded-full border border-neon/10">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,255,156,0.12) 40deg, transparent 80deg)',
            animation: 'radar-sweep 5s linear infinite',
          }}
        />
      </div>
    </div>
  )
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <MatrixRain opacity={0.32} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/60 to-bg" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 font-mono text-sm text-neon"
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-neon pulse-dot" />
            SYSTEM ONLINE // {profile.location.toUpperCase()}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="glitch font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            data-text={profile.name}
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-5 font-mono text-lg text-mist sm:text-xl"
          >
            <span className="text-neon">$</span> role --current{' '}
            <span className="text-cyber">{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-2.5 translate-y-1 bg-cyber cursor-blink" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-6 max-w-xl leading-relaxed text-mist"
          >
            Breaking things ethically, defending them professionally. SOC lab builder,
            OWASP hunter, and published security researcher — turning attack surfaces
            into hardened perimeters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-9 flex flex-wrap gap-4 font-mono text-sm"
          >
            <a
              href="#projects"
              className="corner-brackets border border-neon/60 bg-neon/10 px-6 py-3 font-medium text-neon transition hover:bg-neon/20 hover:shadow-neon"
            >
              ./view_projects.sh
            </a>
            <a
              href="#terminal"
              className="border border-line px-6 py-3 text-mist transition hover:border-cyber/60 hover:text-cyber hover:shadow-cyber"
            >
              &gt;_ open terminal
            </a>
            <a
              href="/Milan_Tej_Resume.pdf"
              download="Milan_Tej_Resume.pdf"
              className="border border-amber/40 px-6 py-3 text-amber/90 transition hover:border-amber/70 hover:bg-amber/10 hover:text-amber"
            >
              ⭳ wget resume.pdf
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="hidden lg:block"
        >
          <HexShield />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 font-mono text-xs text-mist/60 transition hover:text-neon"
      >
        <span className="mb-1 block text-center">scroll_down</span>
        <span className="block animate-bounce text-center text-neon">▼</span>
      </motion.a>
    </section>
  )
}
