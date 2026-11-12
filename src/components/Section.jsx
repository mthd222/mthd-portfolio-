import { tintOf, tintStyle } from '../sections.js'

export function Section({ id, title, note, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      style={tintStyle(tintOf(id))}
      className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
    >
      <header className="band mb-10">
        <h2 id={`${id}-title`} className="display">
          {title}
        </h2>
        {note && <p>{note}</p>}
      </header>
      {children}
    </section>
  )
}

// Shared "when | what" row used by experience, projects, research and education.
export function Entry({ aside, children, as: Tag = 'li' }) {
  return (
    <Tag className="grid gap-x-10 gap-y-4 border-t border-rule py-9 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[13.5rem_minmax(0,1fr)]">
      <div className="flex flex-col items-start gap-2">{aside}</div>
      <div className="min-w-0">{children}</div>
    </Tag>
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
