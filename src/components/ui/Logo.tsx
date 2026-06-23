/**
 * Custom "AG" monogram — geometric, neon-gradient, on a beveled chip.
 * Pure SVG (no JS), ~zero render cost, animates a single rotating
 * gradient sweep on hover via the parent .group:hover.
 */
export default function Logo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="logoGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dark chip + inner glow + gradient stroke */}
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#0a0b12" />
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#logoGlow)" />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="none"
        stroke="url(#logoStroke)"
        strokeWidth="2.5"
      />

      {/* Top-left corner facet — gives the chip a "cut" highlight */}
      <line
        x1="14"
        y1="5"
        x2="5"
        y2="14"
        stroke="url(#logoStroke)"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Letter A — clean triangular strokes with a crossbar */}
      <g
        fill="none"
        stroke="url(#logoStroke)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 9 49 L 19 14 L 29 49" />
        <path d="M 13 38 L 25 38" />
      </g>

      {/* Letter G — open 3/4 circle with the characteristic inner shelf */}
      <g
        fill="none"
        stroke="url(#logoStroke)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 55 22 A 13 13 0 1 0 55 42" />
        <path d="M 55 42 L 46 42 L 46 33 L 52 33" />
      </g>

      {/* Tiny "prompt" dot — bottom-right tech accent */}
      <circle cx="54" cy="54" r="2.2" fill="#22d3ee" />
    </svg>
  );
}
