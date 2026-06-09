import { skillGroups } from "../../data/content";

/**
 * Infinite tech ticker. Pure CSS transform animation (compositor thread) —
 * the track is duplicated once and slides -50%, so the loop is seamless.
 */
export default function Marquee() {
  // Cap the track length: the moving strip is one big GPU texture, and
  // 30+ items × 2 tracks ≈ 9000px wide — too much for mobile GPUs.
  const items = Array.from(new Set(skillGroups.flatMap((g) => g.items))).slice(
    0,
    16
  );

  const Track = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-3 whitespace-nowrap font-mono text-sm text-slate-500 transition-colors hover:text-neon-cyan"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-mask relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-5">
      <div className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}
