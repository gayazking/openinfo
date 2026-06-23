/**
 * Strict monochrome "AG" monogram — thin outlined square, clean stroke
 * letters, single off-white color. No gradients, no glows, no accents.
 */
export default function Logo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const ink = "#e2e8f0";
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Thin outlined square, gently rounded */}
      <rect
        x="3.25"
        y="3.25"
        width="57.5"
        height="57.5"
        rx="6"
        fill="none"
        stroke={ink}
        strokeWidth="1.5"
      />

      <g
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* A — two diagonal strokes with a crossbar */}
        <path d="M 9 50 L 18 13 L 27 50" />
        <path d="M 13 38 L 23 38" />

        {/* G — clean 3/4 arc with a single inner shelf */}
        <path d="M 53 22 A 12 12 0 1 0 53 42" />
        <path d="M 53 42 L 46 42 L 46 34 L 51 34" />
      </g>
    </svg>
  );
}
