import { ArrowUp } from "lucide-react";
import { profile, navLinks } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-px flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Built with React &amp;
          Framer Motion.
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() =>
                document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm text-slate-400 transition-colors hover:text-neon-cyan"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-10 w-10 place-items-center rounded-full glass text-slate-300 transition-all hover:-translate-y-1 hover:border-neon-cyan/50 hover:text-neon-cyan"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
