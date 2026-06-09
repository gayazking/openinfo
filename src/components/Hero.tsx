import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Download, MapPin, User2 } from "lucide-react";
import { profile, socials, stats, cvIcon as CvIcon } from "../data/content";
import MagneticButton from "./ui/MagneticButton";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const delay = done ? 1600 : cleared ? 250 : deleting ? 45 : 85;

    const t = setTimeout(() => {
      if (done) {
        setDeleting(true);
      } else if (cleared) {
        setDeleting(false);
        setWordIndex((i) => i + 1);
      } else {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  // Scroll-linked exit: hero content drifts up and fades as you scroll past.
  // Transform/opacity only — handled off the main thread by Framer Motion.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Параллакс фото от движения мыши
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });
  const photoRef = useRef<HTMLDivElement>(null);

  function onMouse(e: React.MouseEvent) {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center pt-24 pb-16"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container-px grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]"
      >
        {/* Текстовая колонка */}
        <motion.div variants={container} initial="hidden" animate="show">
          {profile.available && (
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-slate-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to remote work worldwide
            </motion.div>
          )}

          <motion.p
            variants={item}
            className="mb-3 font-mono text-sm text-neon-cyan"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            variants={item}
            className="text-shimmer text-5xl font-bold leading-[1.02] tracking-tighter sm:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-4 flex h-10 items-center text-2xl font-semibold sm:text-3xl"
          >
            <span className="gradient-text">{typed}</span>
            <span className="ml-1 inline-block h-7 w-[2px] animate-pulse bg-neon-cyan" />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-slate-400"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 flex items-center gap-1.5 text-sm text-slate-500"
          >
            <MapPin size={15} className="text-neon-violet" />
            {profile.location}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={profile.cvUrl} download>
              <Download size={16} />
              Download CV
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View my work
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl glass text-slate-300 transition-all hover:-translate-y-1 hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Фото */}
        <motion.div
          ref={photoRef}
          onMouseMove={onMouse}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm"
          style={{ perspective: 1000 }}
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Вращающееся кольцо-свечение */}
            <div className="absolute -inset-4 animate-spin-slow rounded-[2rem] bg-[conic-gradient(from_0deg,rgba(34,211,238,0.5),rgba(168,85,247,0.5),rgba(34,211,238,0.5))] opacity-40 blur-xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-700">
              <img
                src={profile.photo}
                alt={profile.name}
                className="aspect-[4/5] w-full object-cover"
                onError={(e) => {
                  // Заглушка, если фото нет
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const ph = e.currentTarget
                    .nextElementSibling as HTMLElement | null;
                  if (ph) ph.style.display = "flex";
                }}
              />
              <div
                className="hidden aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-600 to-ink-800 text-slate-500"
                style={{ display: "none" }}
              >
                <User2 size={56} />
                <p className="px-6 text-center font-mono text-xs">
                  Add your photo to /public/me.jpg
                </p>
              </div>

              {/* Блик/градиент поверх */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
            </div>

            {/* Плавающая карточка-метка */}
            <motion.div
              className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-xl glass px-4 py-3 shadow-glow"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <CvIcon size={18} className="text-neon-cyan" />
              <div className="leading-tight">
                <p className="text-xs text-slate-400">Role</p>
                <p className="text-sm font-semibold text-white">{profile.role}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Полоса статистики */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="container-px absolute inset-x-0 bottom-6 hidden lg:block"
      >
        <div className="grid grid-cols-4 gap-4 rounded-2xl glass px-6 py-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="gradient-text text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
