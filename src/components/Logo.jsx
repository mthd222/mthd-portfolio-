/*
 * MTHD logo — "MTHD" boxed, with terminal fragments deliberately
 * breaking out of the border (> whoami / milan_tej_hd / 10000+).
 * Background-colored rects sit under each fragment to cut the border line.
 */
export default function Logo({ className = 'h-12 w-auto' }) {
  return (
    <svg viewBox="0 0 226 78" className={className} aria-label="MTHD logo">
      <defs>
        <linearGradient id="mthdGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00ff9c" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      </defs>

      {/* main box */}
      <rect
        x="16" y="16" width="150" height="46"
        fill="rgba(3,7,6,0.65)"
        stroke="url(#mthdGrad)"
        strokeWidth="2"
      />
      {/* corner accents */}
      <path d="M16 24 V16 H24" fill="none" stroke="#00ff9c" strokeWidth="4" />
      <path d="M166 54 V62 H158" fill="none" stroke="#00d4ff" strokeWidth="4" />

      {/* MTHD wordmark */}
      <text
        x="91" y="49"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="5"
        fill="url(#mthdGrad)"
      >
        MTHD
      </text>

      {/* "> whoami" breaking the top border */}
      <rect x="26" y="10" width="56" height="12" fill="#050a08" />
      <text x="29" y="20" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#00ff9c">
        &gt; whoami
      </text>

      {/* "10000+" breaking out of the top-right corner */}
      <rect x="142" y="10" width="48" height="12" fill="#050a08" />
      <text x="145" y="20" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#00d4ff">
        10000+
      </text>

      {/* "milan_tej_hd" breaking the bottom border and spilling past the right edge */}
      <rect x="92" y="56" width="96" height="12" fill="#050a08" />
      <text x="95" y="66" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#9fb8ac">
        milan_tej_hd
      </text>
      <rect x="184" y="58" width="6" height="9" fill="#00ff9c" className="cursor-blink" />
    </svg>
  )
}
