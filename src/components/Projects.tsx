import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { projects } from "../data/content";
import SectionHeading from "./ui/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          index="04"
          title="Selected Work"
          subtitle="Production systems I designed and shipped."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`card-glow group flex flex-col p-6 ${
                project.featured ? "sm:col-span-2" : ""
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 text-neon-cyan transition-transform duration-300 group-hover:scale-110">
                  <project.icon size={22} />
                </span>

                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-neon-violet/30 bg-neon-violet/10 px-2.5 py-1 text-[11px] font-medium text-neon-violet">
                      <Star size={11} />
                      Flagship
                    </span>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Repository"
                      className="grid h-9 w-9 place-items-center rounded-lg glass text-slate-300 transition-colors hover:text-neon-cyan"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open project"
                      className="grid h-9 w-9 place-items-center rounded-lg glass text-slate-300 transition-colors hover:text-neon-cyan"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
