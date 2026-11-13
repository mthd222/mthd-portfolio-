export default function Logo({ className = '' }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <svg className="brand-logo" viewBox="0 0 200 64" aria-hidden="true" focusable="false">
        <path className="brand-badge" d="M6 12 18 2h42l10 10v40L60 62H18L6 50Z" />
        <path className="brand-monogram" d="M17 47V17h8l12 15 12-15h8v30h-8V29L37 43 25 29v18Z" />
        <path className="brand-wordmark" fillRule="evenodd" d="M78 17h32v8H98v22h-8V25H78Zm38 0h8v11h12V17h8v30h-8V36h-12v11h-8Zm35 0h13c19 0 27 7 27 15s-8 15-27 15h-13Zm9 8v14h5c11 0 17-2 17-7s-6-7-17-7Z" />
        <path className="brand-signal" d="M13 54h49M78 54h66" />
        <circle className="brand-alert" cx="61" cy="11" r="3.5" />
      </svg>
    </span>
  )
}
