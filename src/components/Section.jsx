import { SECTIONS, tintOf, tintStyle } from '../sections.js'
import { useSeen, useDecode } from '../motion.js'

export function Section({ id, title, note, children }) {
  const [ref, seen] = useSeen()
  const decoded = useDecode(title, seen)
  const sectionNumber = String(SECTIONS.findIndex((section) => section.id === id) + 1).padStart(2, '0')

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      style={tintStyle(tintOf(id))}
      className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
    >
      <header className="band mb-10" data-reveal="band" data-seen={seen || undefined}>
        <span className="band-index" aria-hidden="true">{sectionNumber}</span>
        <h2 id={`${id}-title`} className="display">
          <span className="sr-only">{title}</span>
          <span aria-hidden="true">{decoded}</span>
        </h2>
        {note && <p>{note}</p>}
      </header>
      {children}
    </section>
  )
}

// Fades and lifts its content into place the first time it scrolls into view.
// `kind="row"` slides in from the left instead; `delay` staggers siblings.
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

// Shared "when | what" row used by experience, projects, research and education.
export function Entry({ aside, children, as = 'li' }) {
  return (
    <Reveal
      as={as}
      kind="row"
      className="grid gap-x-10 gap-y-4 border-t border-rule py-9 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[13.5rem_minmax(0,1fr)]"
    >
      <div className="flex flex-col items-start gap-2">{aside}</div>
      <div className="min-w-0">{children}</div>
    </Reveal>
  )
}

export function Points({ items }) {
  return (
    <ul className="prose-measure mt-4 grid list-disc gap-3 pl-5 marker:text-muted">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  )
}
