export default function Logo({ className = '' }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <svg className="brand-logo" viewBox="0 0 256 64" aria-hidden="true" focusable="false">
        <path className="brand-code-frame" d="M24 12H10v40h14M232 12h14v40h-14" />
        <text className="brand-code-label" x="8" y="9">01</text>
        <text className="brand-code-label brand-code-label-end" x="224" y="61">RUN</text>
        <path className="brand-letter brand-letter-accent" d="M34 49V15h9l14 16 14-16h9v34h-9V29L57 44 43 29v20Z" />
        <path className="brand-letter brand-letter-core" d="M84 15h36v9h-13v25H97V24H84Z" />
        <path className="brand-letter brand-letter-core" d="M124 15h10v12h15V15h10v34h-10V36h-15v13h-10Z" />
        <path className="brand-letter brand-letter-accent" fillRule="evenodd" d="M166 15h18c18 0 28 6 28 17s-10 17-28 17h-18Zm10 9v16h8c11 0 18-2 18-8s-7-8-18-8Z" />
        <path className="brand-trace" d="M18 32h13m49 0h8m24 0h16m29 0h13m40 0h28" />
        <path className="brand-circuit" d="M30 21h-8v-7M30 43h-8v7M216 20h9v-6h8M216 44h9v6h8" />
        <circle className="brand-node" cx="22" cy="14" r="2.5" />
        <circle className="brand-node brand-node-secondary" cx="233" cy="14" r="2.5" />
        <circle className="brand-node brand-node-tertiary" cx="22" cy="50" r="2.5" />
        <circle className="brand-node brand-node-secondary" cx="233" cy="50" r="2.5" />
      </svg>
    </span>
  )
}
