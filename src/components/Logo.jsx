export default function Logo({ className = '' }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <svg className="brand-logo" viewBox="0 0 232 64" aria-hidden="true" focusable="false">
        <path className="brand-frame" d="M4 16 16 4h40l12 12v32L56 60H16L4 48Z" />
        <path className="brand-frame-inner" d="M11 19 19 11h34l8 8v26l-8 8H19l-8-8Z" />
        <path className="brand-glyph" d="M18 44V21l15 17 15-17v23" />
        <path className="brand-wordmark" fillRule="evenodd" d="M79 14h35v9h-13v27h-9V23H79Zm42 0h9v13h15V14h9v36h-9V36h-15v14h-9Zm42 0h18c18 0 28 6 28 18s-10 18-28 18h-18Zm9 9v18h9c12 0 18-2 18-9s-6-9-18-9Z" />
        <path className="brand-cut" d="M88 31h20v3H88Zm48 0h17v3h-17Zm34 0h35v3h-35Z" />
        <path className="brand-trace" d="M14 32h12m14 0h24m14 0h10m20 0h28m17 0h18m34 0h17" />
        <path className="brand-bracket" d="M217 17h8v30h-8" />
        <circle className="brand-node" cx="68" cy="16" r="3.5" />
        <circle className="brand-node brand-node-secondary" cx="226" cy="32" r="2.5" />
      </svg>
    </span>
  )
}
