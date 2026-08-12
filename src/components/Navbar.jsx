import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scrollspy: highlight the nav link of the section currently on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    LINKS.forEach(([, href]) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
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
                className={`rounded px-2.5 py-1.5 transition hover:bg-neon/10 hover:text-neon ${
                  activeSection === href ? 'bg-neon/10 text-neon' : 'text-mist'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="relative z-10 font-mono text-neon md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <motion.span animate={{ rotate: open ? 90 : 0 }} className="inline-block">
            {open ? '[x]' : '[≡]'}
          </motion.span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-line bg-void/95 font-mono text-sm backdrop-blur-md md:hidden"
          >
            {LINKS.map(([label, href], i) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block px-5 py-2.5 transition hover:bg-neon/10 hover:text-neon ${
                    activeSection === href ? 'text-neon' : 'text-mist'
                  }`}
                >
                  {label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
