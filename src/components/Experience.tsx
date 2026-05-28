import { motion } from "framer-motion";
import { experience, briefcaseIcon as BriefcaseIcon } from "../data/content";
import SectionHeading from "./ui/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          index="03"
          title="Опыт работы"
          subtitle="Путь, проекты и роли."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Вертикальная линия */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan/60 via-neon-violet/40 to-transparent sm:left-1/2" />

          <div className="space-y-10">
            {experience.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={`${exp.company}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                    left ? "sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"
                  }`}
                >
                  {/* Точка */}
                  <span
                    className={`absolute top-1.5 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-ink-700 text-neon-cyan left-0 sm:left-auto ${
                      left ? "sm:-right-4" : "sm:-left-4"
                    }`}
                  >
                    <BriefcaseIcon size={14} />
                  </span>

                  <div className="card-glow p-5">
                    <p className="font-mono text-xs text-neon-cyan">
                      {exp.period}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-neon-violet">{exp.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {exp.description}
                    </p>
                    <div
                      className={`mt-4 flex flex-wrap gap-2 ${
                        left ? "sm:justify-end" : ""
                      }`}
                    >
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
