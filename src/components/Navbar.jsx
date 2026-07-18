import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo.jsx'

const LINKS = [
  ['~/about', '#about'],
  ['~/skills', '#skills'],
  ['~/experience', '#experience'],
  ['~/projects', '#projects'],
  ['~/research', '#research'],
  ['~/education', '#education'],
  ['~/terminal', '#terminal'],
  ['~/contact', '#contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-void/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="group transition hover:drop-shadow-[0_0_10px_rgba(0,255,156,0.4)]">
          <Logo className="h-11 w-auto" />
        </a>

        <ul className="hidden items-center gap-1 font-mono text-[13px] md:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="rounded px-2.5 py-1.5 text-mist transition hover:bg-neon/10 hover:text-neon"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="font-mono text-neon md:hidden"
          aria-label="Toggle menu"
        >
          {open ? '[x]' : '[≡]'}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-line bg-void/95 px-5 py-3 font-mono text-sm backdrop-blur-md md:hidden">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 text-mist transition hover:text-neon"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.header>
  )
}
