import { motion } from "framer-motion";
import { skillGroups, skillBars } from "../data/content";
import SectionHeading from "./ui/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          index="02"
          title="Tech Stack"
          subtitle="Technologies I work with every day."
        />

        {/* Группы навыков */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-glow p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan">
                  <group.icon size={20} />
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Полоски уровней */}
        <div className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {skillBars.map((bar, i) => (
            <motion.div
              key={bar.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-200">{bar.name}</span>
                <span className="font-mono text-neon-cyan">{bar.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${bar.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
