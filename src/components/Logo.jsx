export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true" focusable="false">
        <path d="M32 2 57 12v18c0 15-9.8 25.7-25 32C16.8 55.7 7 45 7 30V12L32 2Z" fill="var(--color-shell)" stroke="var(--accent)" strokeWidth="2" />
        <path d="m19 24 8 8-8 8M31 40h14" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" />
        <circle cx="47" cy="17" r="3" fill="var(--color-alert)" />
      </svg>
      <span className="display text-lg">mthd222</span>
    </span>
  )
}
