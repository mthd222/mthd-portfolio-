// Page sections in order. `tint` names a colour token from index.css: the row
// colour that section carries in the nav, its heading band, and the hero summary.
export const SECTIONS = [
  { id: 'motion', label: 'Field reel', tint: 'coral' },
  { id: 'projects', label: 'Case files', tint: 'acid' },
  { id: 'experience', label: 'Experience', tint: 'cyan' },
  { id: 'methodology', label: 'Method', tint: 'amber' },
  { id: 'skills', label: 'Capabilities', tint: 'violet' },
  { id: 'research', label: 'Research', tint: 'coral' },
  { id: 'education', label: 'Credentials', tint: 'cyan' },
  { id: 'terminal', label: 'Lab', tint: 'acid' },
  { id: 'contact', label: 'Contact', tint: 'amber' },
]

export const tintOf = (id) => SECTIONS.find((s) => s.id === id)?.tint || 'acid'

export const tintStyle = (tint) => ({ '--tint': `var(--tone-${tint})` })

// Content is free text from resume.json; these keep decoration out of it.
export const stripLeadingSymbols = (s = '') => s.replace(/^[^\p{L}\p{N}]+/u, '')
export const splitOnDash = (s = '') => s.split(/\s+[—–]\s+/)
export const splitOnDot = (s = '') => s.split(/\s+·\s+/)
