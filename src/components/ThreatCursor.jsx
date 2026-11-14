import { useEffect, useRef } from 'react'

const TARGETS = 'a, button, [role="button"], .frame-cell'
const FIELDS = 'input, textarea, select'

export default function ThreatCursor() {
  const coreRef = useRef(null)
  const reticleRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return

    const root = document.documentElement
    const core = coreRef.current
    const reticle = reticleRef.current
    let targetX = -80
    let targetY = -80
    let currentX = targetX
    let currentY = targetY
    let frameId = 0
    let clickTimer = 0

    root.dataset.customCursor = 'active'

    const render = () => {
      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2
      reticle.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frameId = requestAnimationFrame(render)
      } else {
        currentX = targetX
        currentY = targetY
        frameId = 0
      }
    }

    const onMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY
      core.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
      root.dataset.cursorVisible = 'true'

      const element = event.target instanceof Element ? event.target : null
      reticle.dataset.target = element?.closest(TARGETS) ? 'true' : 'false'
      const overField = element?.closest(FIELDS) ? 'true' : 'false'
      reticle.dataset.field = overField
      core.dataset.field = overField
      if (!frameId) frameId = requestAnimationFrame(render)
    }

    const onDown = () => {
      clearTimeout(clickTimer)
      reticle.dataset.click = 'true'
      clickTimer = window.setTimeout(() => delete reticle.dataset.click, 280)
    }
    const onLeave = () => { root.dataset.cursorVisible = 'false' }
    const onEnter = () => { root.dataset.cursorVisible = 'true' }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(clickTimer)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      delete root.dataset.customCursor
      delete root.dataset.cursorVisible
    }
  }, [])

  return (
    <div className="threat-cursor" aria-hidden="true">
      <span ref={reticleRef} className="cursor-reticle">
        <span className="cursor-label">TARGET</span>
      </span>
      <span ref={coreRef} className="cursor-core" />
    </div>
  )
}
