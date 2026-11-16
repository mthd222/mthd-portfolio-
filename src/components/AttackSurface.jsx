export default function AttackSurface() {
  return (
    <div className="atlas-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="atlas-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0V80" className="atlas-grid-line" />
          </pattern>
          <radialGradient id="atlas-fade">
            <stop offset="0" stopColor="white" />
            <stop offset="0.58" stopColor="white" stopOpacity=".64" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="atlas-mask">
            <rect width="1600" height="1000" fill="url(#atlas-fade)" />
          </mask>
        </defs>
        <rect width="1600" height="1000" fill="url(#atlas-grid)" mask="url(#atlas-mask)" />
        <g className="atlas-map">
          <path d="M-60 245H210L310 145H520L610 235H835L965 105H1260L1370 215H1660" />
          <path d="M80 850L255 675H450L560 785H735L845 675H1025L1170 530H1440L1660 310" />
          <path d="M136 245V420L265 549V675M520 145V340L680 500V785M965 105V330L1120 485V580M1370 215V410L1270 510V690" />
          <circle cx="210" cy="245" r="7" />
          <circle cx="310" cy="145" r="7" />
          <circle cx="520" cy="145" r="11" />
          <circle cx="610" cy="235" r="6" />
          <circle cx="965" cy="105" r="10" />
          <circle cx="1370" cy="215" r="7" />
          <circle cx="265" cy="675" r="10" />
          <circle cx="560" cy="785" r="7" />
          <circle cx="845" cy="675" r="11" />
          <circle cx="1170" cy="530" r="7" />
          <circle cx="1270" cy="690" r="10" />
        </g>
        <g className="atlas-labels">
          <text x="92" y="224">EDGE_01</text>
          <text x="538" y="125">SOC_NODE</text>
          <text x="982" y="86">XDR_CORE</text>
          <text x="1190" y="512">TRUST_BOUNDARY</text>
          <text x="282" y="705">ATTACK_SURFACE</text>
          <text x="862" y="705">CONTROL_PLANE</text>
        </g>
        <g className="atlas-pulses">
          <g className="atlas-packet">
            <circle className="packet-ring" r="10" />
            <circle r="3.5" />
            <animateMotion dur="18s" repeatCount="indefinite" path="M-60 245H210L310 145H520L610 235H835L965 105H1260L1370 215H1660" />
          </g>
          <g className="atlas-packet atlas-packet-cyan">
            <circle className="packet-ring" r="10" />
            <circle r="3.5" />
            <animateMotion begin="-8s" dur="23s" repeatCount="indefinite" path="M80 850L255 675H450L560 785H735L845 675H1025L1170 530H1440L1660 310" />
          </g>
          <g className="atlas-packet atlas-packet-violet">
            <circle className="packet-ring" r="10" />
            <circle r="3.5" />
            <animateMotion begin="-13s" dur="27s" repeatCount="indefinite" path="M520 145V340L680 500V785H845L1025 675L1170 530" />
          </g>
        </g>
      </svg>
    </div>
  )
}
