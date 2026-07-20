import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#01'

/* Decrypt effect: text resolves from random glyphs when scrolled into view */
export function ScrambleText({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const interval = setInterval(() => {
      frame += 1
      const resolved = frame * 0.6
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ' || i < resolved) return ch
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join(''),
      )
      if (resolved >= text.length) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, 28)
    return () => clearInterval(interval)
  }, [inView, text])

  return <span ref={ref}>{display}</span>
}

export function SectionHeading({ tag, title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="section-tag mb-2">
        <span className="mr-2 text-mist/50">//</span>
        {tag}
      </p>
      <h2 className="glitch font-display text-3xl font-bold sm:text-4xl" data-text={`${title} ${accent}`}>
        <ScrambleText text={title} /> <span className="text-neon"><ScrambleText text={accent} /></span>
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-neon to-transparent" />
    </motion.div>
  )
}

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
