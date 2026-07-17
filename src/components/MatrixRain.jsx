import { useEffect, useRef } from 'react'

const GLYPHS = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>/\\{}[]$#@%&*+=?!'

export default function MatrixRain({ opacity = 0.5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let cols = []
    const fontSize = 15

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const n = Math.floor(canvas.width / fontSize)
      cols = Array.from({ length: n }, () => Math.random() * -canvas.height / fontSize)
    }
    resize()
    window.addEventListener('resize', resize)

    let last = 0
    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 50) return
      last = t
      ctx.fillStyle = 'rgba(5, 10, 8, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      cols.forEach((y, i) => {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * fontSize
        // bright head
        ctx.fillStyle = Math.random() > 0.975 ? '#c8ffe8' : 'rgba(0, 255, 156, 0.55)'
        ctx.fillText(char, x, y * fontSize)
        cols[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}
