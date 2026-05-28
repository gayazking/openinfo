import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  download?: boolean;
  className?: string;
};

/**
 * Кнопка с «магнитным» эффектом: слегка тянется к курсору.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  download,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "text-ink-900 bg-gradient-to-r from-neon-cyan to-neon-violet hover:shadow-glow"
      : "text-white glass hover:border-neon-cyan/50 hover:text-neon-cyan";

  const content = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          download={download}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`${base} ${styles} ${className}`}
        >
          {content}
        </a>
      ) : (
        <button onClick={onClick} className={`${base} ${styles} ${className}`}>
          {content}
        </button>
      )}
    </motion.div>
  );
}
