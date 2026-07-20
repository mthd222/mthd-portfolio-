import { useEffect, useRef, useState } from 'react'

/* Neon scroll-progress bar along the top edge */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-neon to-cyber shadow-[0_0_8px_rgba(0,255,156,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

/* Cursor FX: soft green "flashlight" glow + trailing ring that locks onto links.
   Desktop (fine pointer) only — disabled for touch devices. */
export function CursorFx() {
  const glowRef = useRef(null)
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const pos = { x: -400, y: -400 }
    const ring = { x: -400, y: -400 }
    let hoveringLink = false
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      hoveringLink = !!e.target.closest?.('a, button, input, textarea, [role="button"]')
    }

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16
      ring.y += (pos.y - ring.y) * 0.16
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${pos.x - 250}px, ${pos.y - 250}px)`
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.x - 3}px, ${pos.y - 3}px)`
      if (ringRef.current) {
        const scale = hoveringLink ? 1.7 : 1
        ringRef.current.style.transform = `translate(${ring.x - 14}px, ${ring.y - 14}px) scale(${scale})`
        ringRef.current.style.borderColor = hoveringLink
          ? 'rgba(0, 212, 255, 0.9)'
          : 'rgba(0, 255, 156, 0.6)'
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[3] hidden h-[500px] w-[500px] rounded-full md:block"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,156,0.055) 0%, transparent 60%)',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96] hidden h-7 w-7 rounded-full border transition-[border-color] duration-200 md:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96] hidden h-1.5 w-1.5 rounded-full bg-neon md:block"
      />
    </>
  )
}

/* "cd ~" back-to-top button, appears after scrolling down */
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-[80] border border-neon/50 bg-void/90 px-4 py-2.5 font-mono text-xs text-neon backdrop-blur transition-all duration-300 hover:bg-neon/15 hover:shadow-neon ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      ▲ cd ~/
    </button>
  )
}
