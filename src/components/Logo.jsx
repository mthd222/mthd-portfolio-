export default function Logo({ className = '' }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <svg className="brand-logo" viewBox="0 0 184 64" aria-hidden="true" focusable="false">
        <path className="brand-frame" d="M2 18V2h16M166 2h16v16M182 46v16h-16M18 62H2V46" />
        <path className="brand-wordmark" fillRule="evenodd" d="M12 49V15h8l10 14 10-14h8v34h-8V28L30 41 20 28v21Zm43-34h34v8H76v26h-8V23H55Zm40 0h8v13h14V15h8v34h-8V36h-14v13h-8Zm38 0h14c20 0 27 8 27 17s-7 17-27 17h-14Zm9 8v18h6c11 0 17-3 17-9s-6-9-17-9Z" />
        <path className="brand-signal" d="M10 56h76M98 56h38" />
        <circle className="brand-alert" cx="174" cy="10" r="3.5" />
      </svg>
    </span>
  )
}
