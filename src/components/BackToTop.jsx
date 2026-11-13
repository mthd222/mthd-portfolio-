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
      className="back-to-top fixed right-4 bottom-4 z-30 grid h-12 w-12 place-items-center border border-rule bg-paper text-ink transition-colors sm:right-6 sm:bottom-6"
    >
      <Icon name="up" />
    </a>
  )
}
