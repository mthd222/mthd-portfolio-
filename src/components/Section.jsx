import { SECTIONS, tintOf, tintStyle } from '../sections.js'
import { useSeen } from '../motion.js'

export function Section({ id, title, note, children }) {
  const [ref, seen] = useSeen()
  const index = SECTIONS.findIndex((section) => section.id === id)
  const sectionNumber = String(index + 1).padStart(2, '0')

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      style={tintStyle(tintOf(id))}
      className="content-section"
    >
      <header className="section-head" data-reveal="band" data-seen={seen || undefined}>
        <div className="section-number" aria-hidden="true">{sectionNumber}</div>
        <div>
          <p className="section-protocol">MTHD / FIELD DOSSIER</p>
          <h2 id={`${id}-title`}>{title}</h2>
        </div>
        {note && <p className="section-note">{note}</p>}
      </header>
      {children}
    </section>
  )
}

export function Reveal({ as: Tag = 'div', kind = '', delay = 0, style, children, ...rest }) {
  const [ref, seen] = useSeen()
  return (
    <Tag
      ref={ref}
      data-reveal={kind}
      data-seen={seen || undefined}
      style={delay ? { ...style, '--d': delay } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Entry({ aside, children, as = 'li' }) {
  return (
    <Reveal as={as} kind="row" className="entry-row">
      <div className="entry-aside">{aside}</div>
      <div className="entry-main">{children}</div>
    </Reveal>
  )
}

export function Points({ items }) {
  return (
    <ul className="point-list">
      {items.map((point) => <li key={point}>{point}</li>)}
    </ul>
  )
}
