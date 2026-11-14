import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const callbacks = new WeakMap()
let observer

function whenSeen(el, onSeen) {
  if (!('IntersectionObserver' in window)) {
    onSeen()
    return () => {}
  }
  observer ||= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        callbacks.get(entry.target)?.()
        callbacks.delete(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  callbacks.set(el, onSeen)
  observer.observe(el)
  return () => {
    observer.unobserve(el)
    callbacks.delete(el)
  }
}

// [ref, seen]: `seen` flips to true once, the first time the element scrolls into view.
export function useSeen() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => whenSeen(ref.current, () => setSeen(true)), [])
  return [ref, seen]
}

const HEX = '0123456789abcdef'

// Text that starts as hex noise and resolves left to right once `active`.
export function useDecode(text, active) {
  const [shown, setShown] = useState(text)
  useEffect(() => {
    if (!active || prefersReducedMotion()) return
    const duration = 380 + text.length * 40
    let frameId = 0
    let start = 0
    let lastScramble = -Infinity
    const tick = (now) => {
      start ||= now
      const progress = Math.min(1, (now - start) / duration)
      if (progress === 1) {
        setShown(text)
        return
      }
      if (now - lastScramble > 45) {
        lastScramble = now
        const solved = Math.floor(progress * text.length)
        const noise = [...text.slice(solved)].map((ch) => (ch === ' ' ? ' ' : HEX[(Math.random() * 16) | 0]))
        setShown(text.slice(0, solved) + noise.join(''))
      }
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [text, active])
  return shown
}

// Counts from 0 up to `value` once `active`; holds the final value otherwise.
export function useCountUp(value, active, duration = 1100) {
  const [shown, setShown] = useState(value)
  useEffect(() => {
    if (!active || prefersReducedMotion()) return
    let frameId = 0
    let start = 0
    const tick = (now) => {
      start ||= now
      const progress = Math.min(1, (now - start) / duration)
      setShown(Math.round(value * (1 - (1 - progress) ** 3)))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [value, active, duration])
  return shown
}
