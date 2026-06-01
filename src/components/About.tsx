import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { about, stats } from "../data/content";
import SectionHeading from "./ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading index="01" title="About me" />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-pretty leading-relaxed text-slate-300">
                {p}
              </p>
            ))}

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {about.facts.map((f) => (
                <div key={f.label} className="rounded-xl glass p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-neon-cyan">
                    {f.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{f.value}</p>
                </div>
              ))}
            </div>

            {/* Stats for mobile / tablet */}
            <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4 lg:hidden">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl glass p-4 text-center">
                  <p className="gradient-text text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {about.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-glow flex items-start gap-3 p-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-neon-cyan/15 text-neon-cyan">
                  <Check size={14} />
                </span>
                <span className="text-sm text-slate-200">{h}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
