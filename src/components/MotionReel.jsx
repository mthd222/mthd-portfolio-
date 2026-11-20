import { useRef, useState } from 'react'
import { Section, Reveal } from './Section.jsx'
import Icon from './Icons.jsx'

const CHAPTERS = [
  { code: 'MAP', title: 'Attack surface', detail: 'Make every exposed asset visible.' },
  { code: 'DETECT', title: 'Signal correlation', detail: 'Turn endpoint and network noise into context.' },
  { code: 'CONTAIN', title: 'Early response', detail: 'Validate the signal and reduce the blast radius.' },
  { code: 'HARDEN', title: 'Secure by design', detail: 'Feed evidence back into stronger controls.' },
]

export default function MotionReel() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    videoRef.current?.play().catch(() => {})
  }

  return (
    <Section id="motion" title="Active defense" note="18-second motion brief">
      <div className="motion-layout">
        <Reveal className="motion-copy">
          <p className="motion-kicker">MTHD / VISUAL PROTOCOL</p>
          <h3>A security story in four moves.</h3>
          <p>
            A short visual statement of how I approach security work: understand the edge, connect the
            evidence, contain risk early, and use every finding to harden the system.
          </p>

          <ol className="motion-sequence" aria-label="Motion brief chapters">
            {CHAPTERS.map((chapter, index) => (
              <li key={chapter.code}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{chapter.title}</strong>
                  <p>{chapter.detail}</p>
                </div>
                <i>{chapter.code}</i>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="figure" delay={1} className="motion-figure">
          <div className={`motion-screen ${playing ? 'is-playing' : ''}`}>
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster="/mthd-active-defense-poster.jpg"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              aria-label="MTHD active defense cybersecurity motion brief"
            >
              <source src="/mthd-active-defense.mp4" type="video/mp4" />
              Your browser does not support embedded video.
            </video>

            {!playing && (
              <button type="button" className="motion-play" onClick={play} aria-label="Play active defense video">
                <Icon name="play" size={25} />
                <span>Play field reel</span>
                <small>00:18</small>
              </button>
            )}

            <div className="motion-corner motion-corner-top" aria-hidden="true" />
            <div className="motion-corner motion-corner-bottom" aria-hidden="true" />
          </div>
          <figcaption>
            <span>CONCEPT REEL / NO LIVE TELEMETRY</span>
            <span>H.264 · 1280 × 760</span>
          </figcaption>
        </Reveal>
      </div>
    </Section>
  )
}
