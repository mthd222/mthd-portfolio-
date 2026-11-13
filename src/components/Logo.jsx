export default function Logo({ className = '' }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <svg className="brand-logo" viewBox="0 0 184 96" aria-hidden="true" focusable="false">
        <path className="brand-frame" d="M2 2h164l16 16v76H18L2 78Z" />
        <path className="brand-wordmark" d="M16 68V28l14 20 14-20v40M58 28h32M74 28v40M102 28v40M130 28v40M102 48h28M144 28v40h12c18 0 18-40 0-40Z" />
        <path className="brand-signal" d="M9 13h24M151 82h22" />
        <circle className="brand-alert" cx="168" cy="13" r="4" />
      </svg>
      <span className="brand-caption" aria-hidden="true">OFFSEC // SOC</span>
    </span>
  )
}
