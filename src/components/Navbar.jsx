import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { SECTIONS, tintStyle } from '../sections.js'
import { prefersReducedMotion } from '../motion.js'
import Logo from './Logo.jsx'
import Icon from './Icons.jsx'

function useShift() {
  const [shift, setShift] = useState(() => document.documentElement.dataset.shift || 'night')
  const toggle = (e) => {
    const next = shift === 'night' ? 'day' : 'night'
    try {
      localStorage.setItem('shift', next)
    } catch {
      // private mode: the choice just lasts for this visit
    }
    const apply = () => {
      document.documentElement.dataset.shift = next
      setShift(next)
    }
    if (!document.startViewTransition || prefersReducedMotion()) {
      apply()
      return
    }
    // The new colours open out in a circle from the toggle button.
    const box = e.currentTarget.getBoundingClientRect()
    const x = box.left + box.width / 2
    const y = box.top + box.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => flushSync(apply))
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 560, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {})
  }
  return [shift, toggle]
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])
  return active
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [shift, toggleShift] = useShift()
  const active = useActiveSection()

  const progressRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const range = document.documentElement.scrollHeight - window.innerHeight
      const done = range > 0 ? Math.min(1, window.scrollY / range) : 0
      progressRef.current?.style.setProperty('--p', `${(done * 100).toFixed(2)}%`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const night = shift === 'night'

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        open ? 'bg-paper' : 'bg-paper/92 backdrop-blur-sm'
      } ${scrolled || open ? 'border-rule' : 'border-transparent'} site-header`}
    >
      <div className="nav-shell mx-auto flex h-16 max-w-6xl items-center gap-2 px-5 sm:px-8">
        <a href="#top" aria-label="MTHD, back to top" className="logo-link mr-auto py-2">
          <Logo />
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {SECTIONS.map(({ id, label, tint }, index) => {
              const current = active === id
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={current ? 'true' : undefined}
                    style={tintStyle(tint)}
                    className={`nav-link block px-2.5 py-2 text-[0.8125rem] font-medium transition-colors ${
                      current ? 'tinted' : 'hover:bg-ink/8'
                    }`}
                  >
                    <span className="nav-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={toggleShift}
          aria-label={night ? 'Switch to day shift (light colours)' : 'Switch to night shift (dark colours)'}
          title={night ? 'Day shift' : 'Night shift'}
          className="icon-button grid h-11 w-11 place-items-center transition-colors hover:bg-ink/8"
        >
          <Icon name={night ? 'sun' : 'moon'} />
        </button>

        <a
          href="/Milan_Tej_Resume.pdf"
          download="Milan_Tej_Resume.pdf"
          className="btn btn-solid !min-h-11 !px-4 !py-2 max-sm:!hidden"
        >
          <Icon name="download" size={18} />
          Resume
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="icon-button grid h-11 w-11 place-items-center transition-colors hover:bg-ink/8 lg:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Sections"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rule lg:hidden"
        >
          <ul className="mx-auto grid max-w-6xl gap-0.5 px-5 py-3 sm:grid-cols-2 sm:px-8">
            {SECTIONS.map(({ id, label, tint }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  style={tintStyle(tint)}
                  className={`mobile-nav-link flex min-h-12 items-center gap-3 px-3 font-medium ${
                    active === id ? 'tinted' : 'hover:bg-ink/8'
                  }`}
                >
                  <span className="nav-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href="/Milan_Tej_Resume.pdf"
                download="Milan_Tej_Resume.pdf"
                onClick={() => setOpen(false)}
                className="btn btn-solid mt-2 w-full"
              >
                <Icon name="download" size={18} />
                Download resume (PDF)
              </a>
            </li>
          </ul>
        </nav>
      )}
      <div ref={progressRef} className="scan-progress" aria-hidden="true" />
    </header>
  )
}
