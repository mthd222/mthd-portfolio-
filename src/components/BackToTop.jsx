import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className="fixed right-4 bottom-4 z-30 grid h-12 w-12 place-items-center rounded-md border-2 border-ink bg-paper text-ink shadow-[0_2px_0_var(--color-ink)] transition-colors hover:bg-ink hover:text-paper sm:right-6 sm:bottom-6"
    >
      <Icon name="up" />
    </a>
  )
}
