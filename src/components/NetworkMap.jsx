import { useEffect, useRef } from 'react'
import { capture } from '../motion.js'

// Page background: a small network drawn on a grid. Packets in the protocol
// colours travel host to host, and a probe hops around scanning one port per
// host. Arrivals are announced on `window` so the hero can show a live count.

const PITCH = 32
const PROTOCOLS = ['tcp', 'udp', 'http', 'arp', 'icmp']
const SERVICES = [
  [21, 'ftp'], [22, 'ssh'], [25, 'smtp'], [53, 'dns'], [80, 'http'],
  [443, 'https'], [445, 'smb'], [3306, 'mysql'], [3389, 'rdp'], [8080, 'http-alt'],
]
const STATES = ['open', 'open', 'open', 'filtered', 'closed']
const LABEL_LIFE = 2.8

const rand = (min, max) => min + Math.random() * (max - min)
const pick = (list) => list[(Math.random() * list.length) | 0]
const snap = (v) => Math.round(v / PITCH) * PITCH + 0.5

function readPalette() {
  const cs = getComputedStyle(document.documentElement)
  const v = (name) => cs.getPropertyValue(name).trim()
  return {
    line: v('--map-line'),
    node: v('--map-node'),
    paper: v('--color-paper'),
    muted: v('--color-muted'),
    probe: v('--sig-probe'),
    open: v('--sig-open'),
    filtered: v('--sig-arp'),
    protocols: PROTOCOLS.map((p) => v(`--sig-${p}`)),
  }
}

function buildNetwork(w, h) {
  const cell = w < 640 ? 128 : 160
  const cols = Math.ceil(w / cell)
  const rows = Math.ceil(h / cell)
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null))
  const nodes = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.6) continue
      const node = {
        x: snap(c * cell + rand(PITCH, cell - PITCH)),
        y: snap(r * cell + rand(PITCH, cell - PITCH)),
        ip: `10.0.${r + 1}.${((c * 13 + 2 + ((Math.random() * 12) | 0)) % 254) + 1}`,
        links: [],
        pulse: 0,
        tone: '',
      }
      grid[r][c] = node
      nodes.push(node)
    }
  }

  const edges = []
  const link = (a, b, horizontalFirst) => {
    const corner = horizontalFirst ? { x: b.x, y: a.y } : { x: a.x, y: b.y }
    const first = Math.abs(corner.x - a.x) + Math.abs(corner.y - a.y)
    const second = Math.abs(b.x - corner.x) + Math.abs(b.y - corner.y)
    const edge = { a, b, corner, first, length: first + second }
    a.links.push(edge)
    b.links.push(edge)
    edges.push(edge)
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const node = grid[r][c]
      if (!node) continue
      for (let k = 1; k <= 2; k++) {
        const right = grid[r][c + k]
        if (right) {
          link(node, right, true)
          break
        }
      }
      for (let k = 1; k <= 2; k++) {
        const below = grid[r + k]?.[c]
        if (below) {
          link(node, below, false)
          break
        }
      }
    }
  }
  return { nodes, edges }
}

// Point at `along` px from edge.a, following the right-angle route.
function pointOn(edge, along) {
  const { a, b, corner, first, length } = edge
  if (along <= first) {
    const t = first ? along / first : 0
    return { x: a.x + (corner.x - a.x) * t, y: a.y + (corner.y - a.y) * t }
  }
  const second = length - first
  const t = second ? (along - first) / second : 1
  return { x: corner.x + (b.x - corner.x) * t, y: corner.y + (b.y - corner.y) * t }
}

function spawnPackets(edges, wide) {
  if (!edges.length) return []
  const count = Math.min(22, Math.max(6, Math.round(edges.length * 0.45)))
  const packets = Array.from({ length: count }, () => {
    const edge = pick(edges)
    return {
      edge,
      forward: Math.random() < 0.5,
      dist: rand(0, edge.length),
      speed: rand(55, 120),
      tone: (Math.random() * PROTOCOLS.length) | 0,
      probe: false,
    }
  })
  for (let i = 0; i < (wide ? 2 : 1); i++) {
    packets.push({ edge: pick(edges), forward: true, dist: 0, speed: 150, tone: 0, probe: true })
  }
  return packets
}

export default function NetworkMap() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const still = document.createElement('canvas')
    const stillCtx = still.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let palette = readPalette()
    let w = 0
    let h = 0
    let dpr = 1
    let net = { nodes: [], edges: [] }
    let packets = []
    let labels = []
    let frameId = 0
    let last = 0

    const drawStill = () => {
      stillCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stillCtx.clearRect(0, 0, w, h)

      stillCtx.fillStyle = palette.node
      stillCtx.globalAlpha = 0.4
      for (let x = PITCH; x < w; x += PITCH) {
        for (let y = PITCH; y < h; y += PITCH) stillCtx.fillRect(x, y, 1, 1)
      }
      stillCtx.globalAlpha = 1

      stillCtx.strokeStyle = palette.line
      stillCtx.lineWidth = 1
      stillCtx.beginPath()
      for (const { a, b, corner } of net.edges) {
        stillCtx.moveTo(a.x, a.y)
        stillCtx.lineTo(corner.x, corner.y)
        stillCtx.lineTo(b.x, b.y)
      }
      stillCtx.stroke()

      stillCtx.fillStyle = palette.paper
      stillCtx.strokeStyle = palette.node
      for (const { x, y } of net.nodes) {
        stillCtx.fillRect(x - 3, y - 3, 6, 6)
        stillCtx.strokeRect(x - 3, y - 3, 6, 6)
      }
    }

    const draw = () => {
      if (!w || !h) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(still, 0, 0, w, h)

      ctx.lineWidth = 1.5
      for (const node of net.nodes) {
        if (node.pulse <= 0) continue
        const half = 5 + (1 - node.pulse) * 12
        ctx.globalAlpha = node.pulse * 0.7
        ctx.strokeStyle = node.tone
        ctx.strokeRect(node.x - half, node.y - half, half * 2, half * 2)
      }

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      for (const p of packets) {
        const { edge } = p
        const toAlong = (d) => (p.forward ? d : edge.length - d)
        const headAlong = toAlong(p.dist)
        const tailAlong = toAlong(Math.max(0, p.dist - (p.probe ? 28 : 16)))
        const head = pointOn(edge, headAlong)
        const tail = pointOn(edge, tailAlong)
        const color = p.probe ? palette.probe : palette.protocols[p.tone]

        ctx.globalAlpha = p.probe ? 1 : 0.85
        ctx.strokeStyle = color
        ctx.fillStyle = color
        ctx.lineWidth = p.probe ? 2.5 : 2
        ctx.beginPath()
        ctx.moveTo(tail.x, tail.y)
        if (Math.min(headAlong, tailAlong) < edge.first && Math.max(headAlong, tailAlong) > edge.first) {
          ctx.lineTo(edge.corner.x, edge.corner.y)
        }
        ctx.lineTo(head.x, head.y)
        ctx.stroke()
        const size = p.probe ? 6 : 4
        ctx.fillRect(head.x - size / 2, head.y - size / 2, size, size)
      }

      ctx.font = '500 11px "Martian Mono Variable", ui-monospace, monospace'
      if ('fontStretch' in ctx) ctx.fontStretch = 'condensed'
      ctx.textBaseline = 'middle'
      for (const label of labels) {
        const fade = Math.min(1, label.age / 0.25) * Math.min(1, (LABEL_LIFE - label.age) / 0.6)
        ctx.globalAlpha = Math.max(0, fade) * 0.9
        ctx.fillStyle = palette[label.state] || palette.muted
        const width = ctx.measureText(label.text).width
        const x = label.node.x + 12 + width > w ? label.node.x - 12 - width : label.node.x + 12
        ctx.fillText(label.text, x, label.node.y - 12)
      }
      ctx.globalAlpha = 1
    }

    const step = (dt) => {
      for (const node of net.nodes) if (node.pulse > 0) node.pulse -= dt * 1.6
      for (const label of labels) label.age += dt
      labels = labels.filter((label) => label.age < LABEL_LIFE)

      for (const p of packets) {
        p.dist += p.speed * dt
        if (p.dist < p.edge.length) continue

        const node = p.forward ? p.edge.b : p.edge.a
        node.pulse = 1
        node.tone = p.probe ? palette.probe : palette.protocols[p.tone]
        if (p.probe) {
          const [port, service] = pick(SERVICES)
          const state = pick(STATES)
          if (labels.length >= 3) labels.shift()
          labels.push({ node, state, age: 0, text: `${node.ip}:${port} ${state}` })
          window.dispatchEvent(
            new CustomEvent('capture:probe', { detail: { ip: node.ip, port, service, state } }),
          )
        } else {
          window.dispatchEvent(new CustomEvent('capture:packet'))
        }

        const onward = node.links.filter((e) => e !== p.edge)
        p.edge = onward.length ? pick(onward) : p.edge
        p.forward = p.edge.a === node
        p.dist = 0
      }
    }

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      step(dt)
      draw()
      frameId = requestAnimationFrame(frame)
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = 0
    }
    const start = () => {
      stop()
      if (reduced.matches || document.hidden || capture.isPaused()) {
        draw()
        return
      }
      last = performance.now()
      frameId = requestAnimationFrame(frame)
    }

    const rebuild = () => {
      stop()
      w = canvas.clientWidth
      h = canvas.clientHeight
      if (!w || !h) return
      dpr = Math.min(2, window.devicePixelRatio || 1)
      for (const c of [canvas, still]) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
      }
      net = buildNetwork(w, h)
      packets = reduced.matches ? [] : spawnPackets(net.edges, w > 1100)
      labels = []
      drawStill()
      start()
    }

    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (canvas.clientWidth !== w || canvas.clientHeight !== h) rebuild()
      }, 180)
    }
    const onShift = new MutationObserver(() => {
      palette = readPalette()
      drawStill()
      if (!frameId) draw()
    })

    rebuild()
    const onSize = new ResizeObserver(onResize)
    onSize.observe(canvas)
    const unsubscribe = capture.subscribe(start)
    document.addEventListener('visibilitychange', start)
    reduced.addEventListener('change', rebuild)
    onShift.observe(document.documentElement, { attributes: true, attributeFilter: ['data-shift'] })

    return () => {
      stop()
      clearTimeout(resizeTimer)
      onSize.disconnect()
      unsubscribe()
      document.removeEventListener('visibilitychange', start)
      reduced.removeEventListener('change', rebuild)
      onShift.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="netmap" aria-hidden="true" />
}
