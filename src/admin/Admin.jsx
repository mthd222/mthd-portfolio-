import { useState } from 'react'
import initialData from '../data/resume.json'

/*
 * Dev-only content editor served at http://localhost:5173/admin
 * Edits are saved straight into src/data/resume.json via the dev server;
 * the portfolio hot-reloads instantly. Never included in production builds.
 */

const LIST = 'list' // multi-line textarea → array of strings

const SECTIONS = [
  {
    key: 'profile', label: 'Profile', type: 'object',
    fields: {
      name: 'text', roles: LIST, location: 'text', email: 'text',
      linkedin: 'text', github: 'text', whatsapp: 'text',
      summary: 'textarea', availability: 'text',
    },
  },
  { key: 'stats', label: 'Stats (counters)', type: 'array', titleField: 'label', fields: { label: 'text', value: 'number', suffix: 'text' } },
  { key: 'skillRadar', label: 'Skill Radar', type: 'array', titleField: 'axis', fields: { axis: 'text', value: 'number' } },
  { key: 'skillGroups', label: 'Skill Groups', type: 'array', titleField: 'title', fields: { title: 'text', icon: 'text', skills: LIST }, hint: 'icon: radar | crosshair | globe | target | tool | network | code | doc' },
  { key: 'experience', label: 'Experience', type: 'array', titleField: 'role', fields: { role: 'text', company: 'text', period: 'text', current: 'bool', points: LIST } },
  { key: 'research', label: 'Research Publication', type: 'object', fields: { title: 'textarea', journal: 'text', date: 'text', points: LIST } },
  { key: 'projects', label: 'Projects', type: 'array', titleField: 'name', fields: { name: 'text', tag: 'text', severity: 'text', tech: LIST, points: LIST }, hint: 'severity: CRITICAL | HIGH | MEDIUM | LOW' },
  { key: 'education', label: 'Education', type: 'array', titleField: 'degree', fields: { degree: 'text', school: 'text', period: 'text', score: 'text', honor: 'text' } },
  { key: 'certifications', label: 'Certifications', type: 'array', titleField: 'name', fields: { name: 'text', issuer: 'text' } },
  { key: 'interests', label: 'Interests', type: 'stringlist' },
  { key: 'languages', label: 'Languages', type: 'stringlist' },
]

const inputCls =
  'field'
const labelCls = 'mb-1 block text-sm font-semibold text-muted'

function Field({ type, value, onChange }) {
  if (type === LIST) {
    return (
      <textarea
        rows={Math.max(3, (value?.length || 0) + 1)}
        className={inputCls}
        value={(value || []).join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
        onBlur={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
      />
    )
  }
  if (type === 'textarea') {
    return <textarea rows="4" className={inputCls} value={value || ''} onChange={(e) => onChange(e.target.value)} />
  }
  if (type === 'number') {
    return <input type="number" className={inputCls} value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />
  }
  if (type === 'bool') {
    return (
      <label className="flex cursor-pointer items-center gap-2 py-2 text-muted">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-ink" />
        enabled
      </label>
    )
  }
  return <input className={inputCls} value={value || ''} onChange={(e) => onChange(e.target.value)} />
}

function FieldSet({ fields, obj, onChange }) {
  return (
    <div className="grid gap-3">
      {Object.entries(fields).map(([name, type]) => (
        <div key={name}>
          <span className={labelCls}>{name}</span>
          <Field type={type} value={obj?.[name]} onChange={(v) => onChange({ ...obj, [name]: v })} />
        </div>
      ))}
    </div>
  )
}

function emptyItem(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([name, type]) => [
      name,
      type === LIST ? [] : type === 'number' ? 0 : type === 'bool' ? false : '',
    ]),
  )
}

function ArrayEditor({ section, items, onChange }) {
  const [open, setOpen] = useState(null)
  const move = (i, dir) => {
    const next = [...items]
    const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpen(j)
  }
  return (
    <div className="grid gap-2">
      {items.map((item, i) => (
        <div key={i} className="rounded border border-rule bg-panel">
          <div className="flex items-center gap-1 px-3 py-2">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex-1 py-1 text-left font-semibold hover:underline">
              {open === i ? '▾' : '▸'} {item[section.titleField] || `item ${i + 1}`}
            </button>
            <button onClick={() => move(i, -1)} title="move up" className="px-2 py-1 text-muted hover:text-ink">↑</button>
            <button onClick={() => move(i, 1)} title="move down" className="px-2 py-1 text-muted hover:text-ink">↓</button>
            <button
              onClick={() => window.confirm('Delete this entry?') && onChange(items.filter((_, k) => k !== i))}
              title="delete" className="px-2 py-1 text-alert hover:underline"
            >
              ✕
            </button>
          </div>
          {open === i && (
            <div className="border-t border-rule p-4">
              <FieldSet fields={section.fields} obj={item} onChange={(v) => onChange(items.map((it, k) => (k === i ? v : it)))} />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          onChange([...items, emptyItem(section.fields)])
          setOpen(items.length)
        }}
        className="rounded border-2 border-dashed border-rule py-2 font-semibold hover:border-ink"
      >
        + add {section.label.toLowerCase().replace(/s?\s*\(.*/, '')}
      </button>
    </div>
  )
}

export default function Admin() {
  const [data, setData] = useState(initialData)
  const [active, setActive] = useState('profile')
  const [status, setStatus] = useState(null)
  const [dirty, setDirty] = useState(false)

  const section = SECTIONS.find((s) => s.key === active)
  const update = (key, value) => {
    setData({ ...data, [key]: value })
    setDirty(true)
    setStatus(null)
  }

  const save = async () => {
    setStatus('saving...')
    try {
      const res = await fetch('/__save-resume', { method: 'POST', body: JSON.stringify(data) })
      const out = await res.json()
      if (!out.ok) throw new Error(out.error)
      setStatus('✔ saved — site updated')
      setDirty(false)
    } catch (err) {
      setStatus(`✗ save failed: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-paper px-4 py-8 text-ink">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="display text-2xl">
              mthd222 content editor
            </h1>
            <p className="mt-1 text-sm text-muted">
              Local only. Saves to src/data/resume.json and the site hot-reloads.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {status && (
              <span className={`text-sm font-semibold ${status.startsWith('✗') ? 'text-alert' : 'text-ink'}`}>{status}</span>
            )}
            <button
              onClick={save}
              disabled={!dirty}
              className="btn btn-solid disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save changes
            </button>
            <a href="/" className="btn">
              View site
            </a>
          </div>
        </header>

        <nav className="mb-6 flex flex-wrap gap-1.5">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`rounded border px-3 py-1.5 text-sm font-medium transition-colors ${
                active === s.key
                  ? 'border-ink bg-ink text-paper'
                  : 'border-rule text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <main className="rounded-md border border-rule bg-panel p-5">
          {section.hint && <p className="mb-4 text-sm text-muted">Hint: {section.hint}</p>}

          {section.type === 'object' && (
            <FieldSet fields={section.fields} obj={data[section.key]} onChange={(v) => update(section.key, v)} />
          )}
          {section.type === 'array' && (
            <ArrayEditor section={section} items={data[section.key]} onChange={(v) => update(section.key, v)} />
          )}
          {section.type === 'stringlist' && (
            <div>
              <span className={labelCls}>one entry per line</span>
              <Field type={LIST} value={data[section.key]} onChange={(v) => update(section.key, v)} />
            </div>
          )}
        </main>

        <footer className="mt-6 text-sm text-muted">
          <p>To publish: save here, then commit and push. Your host redeploys automatically.</p>
        </footer>
      </div>
    </div>
  )
}
