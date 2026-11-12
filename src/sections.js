// Page sections in order. `tint` names a colour token from index.css: the row
// colour that section carries in the nav, its heading band, and the hero summary.
export const SECTIONS = [
  { id: 'about', label: 'About', tint: 'tcp' },
  { id: 'skills', label: 'Skills', tint: 'udp' },
  { id: 'experience', label: 'Experience', tint: 'http' },
  { id: 'projects', label: 'Projects', tint: 'arp' },
  { id: 'research', label: 'Research', tint: 'icmp' },
  { id: 'education', label: 'Education', tint: 'smb' },
  { id: 'terminal', label: 'Shell', tint: 'syn' },
  { id: 'contact', label: 'Contact', tint: 'tcp' },
]

export const tintOf = (id) => SECTIONS.find((s) => s.id === id)?.tint || 'tcp'

export const tintStyle = (tint) => ({ '--tint': `var(--color-${tint})` })

// Content is free text from resume.json; these keep decoration out of it.
export const stripLeadingSymbols = (s = '') => s.replace(/^[^\p{L}\p{N}]+/u, '')
export const splitOnDash = (s = '') => s.split(/\s+[—–]\s+/)
export const splitOnDot = (s = '') => s.split(/\s+·\s+/)
