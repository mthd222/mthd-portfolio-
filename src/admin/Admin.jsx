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
  { key: 'projects', label: 'Projects', type: 'array', titleField: 'name', fields: { name: 'text', tag: 'text', severity: 'text', tech: LIST, points: LIST }, hint: 'severity: CRITICAL | HIGH | MEDIUM' },
  { key: 'education', label: 'Education', type: 'array', titleField: 'degree', fields: { degree: 'text', school: 'text', period: 'text', score: 'text' } },
  { key: 'certifications', label: 'Certifications', type: 'array', titleField: 'name', fields: { name: 'text', issuer: 'text' } },
  { key: 'interests', label: 'Interests', type: 'stringlist' },
  { key: 'languages', label: 'Languages', type: 'stringlist' },
]

const inputCls =
  'w-full border border-line bg-void px-3 py-2 font-mono text-sm text-ghost caret-neon outline-none transition focus:border-neon/60'
const labelCls = 'mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-mist/60'

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
      <label className="flex cursor-pointer items-center gap-2 py-2 font-mono text-sm text-mist">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#00ff9c]" />
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
        <div key={i} className="border border-line bg-panel">
          <div className="flex items-center gap-1 px-3 py-2">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex-1 text-left font-mono text-sm text-cyber hover:text-neon">
              {open === i ? '▾' : '▸'} {item[section.titleField] || `item ${i + 1}`}
            </button>
            <button onClick={() => move(i, -1)} title="move up" className="px-1.5 font-mono text-mist/60 hover:text-neon">↑</button>
            <button onClick={() => move(i, 1)} title="move down" className="px-1.5 font-mono text-mist/60 hover:text-neon">↓</button>
            <button
              onClick={() => window.confirm('Delete this entry?') && onChange(items.filter((_, k) => k !== i))}
              title="delete" className="px-1.5 font-mono text-danger/70 hover:text-danger"
            >
              ✕
            </button>
          </div>
          {open === i && (
            <div className="border-t border-line p-4">
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
        className="border border-dashed border-neon/40 py-2 font-mono text-sm text-neon hover:bg-neon/10"
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
    <div className="min-h-screen bg-bg px-4 py-8 text-ghost">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">
              <span className="text-neon">MTHD</span> content editor
            </h1>
            <p className="mt-1 font-mono text-xs text-mist/60">
              // local only — saves to src/data/resume.json, site hot-reloads instantly
            </p>
          </div>
          <div className="flex items-center gap-3">
            {status && (
              <span className={`font-mono text-xs ${status.startsWith('✗') ? 'text-danger' : 'text-cyber'}`}>{status}</span>
            )}
            <button
              onClick={save}
              disabled={!dirty}
              className="border border-neon/60 bg-neon/10 px-5 py-2 font-mono text-sm font-medium text-neon transition enabled:hover:bg-neon/20 disabled:opacity-40"
            >
              save changes
            </button>
            <a href="/" className="border border-line px-4 py-2 font-mono text-sm text-mist hover:text-cyber">
              view site →
            </a>
          </div>
        </header>

        <nav className="mb-6 flex flex-wrap gap-1.5">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`border px-3 py-1.5 font-mono text-xs transition ${
                active === s.key
                  ? 'border-neon/60 bg-neon/10 text-neon'
                  : 'border-line text-mist hover:border-neon/40 hover:text-neon'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <main className="border border-line bg-panel/60 p-5">
          {section.hint && <p className="mb-4 font-mono text-xs text-amber/80">hint: {section.hint}</p>}

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

        <footer className="mt-6 font-mono text-xs leading-6 text-mist/50">
          <p>&gt; to publish: save here, then commit &amp; push (git add -A · git commit · git push) — your host redeploys automatically.</p>
        </footer>
      </div>
    </div>
  )
}
