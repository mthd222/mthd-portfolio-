export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true" focusable="false">
        <rect x="1" y="1" width="62" height="62" rx="12" fill="var(--color-shell)" stroke="var(--color-rule)" strokeWidth="2" />
        <rect x="12" y="14" width="40" height="10" rx="2" fill="var(--color-tcp)" />
        <rect x="12" y="27" width="40" height="10" rx="2" fill="var(--color-http)" />
        <rect x="12" y="40" width="40" height="10" rx="2" fill="var(--color-icmp)" />
      </svg>
      <span className="display text-lg">mthd222</span>
    </span>
  )
}
