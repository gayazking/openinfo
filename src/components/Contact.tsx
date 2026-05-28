import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { contact, socials, profile, cvIcon as CvIcon } from "../data/content";
import SectionHeading from "./ui/SectionHeading";
import MagneticButton from "./ui/MagneticButton";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading index="05" title={contact.heading} subtitle={contact.text} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-ink-700/60 p-8 text-center backdrop-blur-md sm:p-12"
        >
          {/* Свечение внутри карточки */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-neon-cyan/20 blur-[90px]" />

          <div className="relative">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-3 text-2xl font-semibold text-white transition-colors hover:text-neon-cyan sm:text-3xl"
            >
              <Mail className="text-neon-cyan" />
              {contact.email}
              <ArrowUpRight
                size={22}
                className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
              />
            </a>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={`mailto:${contact.email}`}>
                <Mail size={16} />
                Написать письмо
              </MagneticButton>
              <MagneticButton href={profile.cvUrl} download variant="ghost">
                <CvIcon size={16} />
                Скачать CV
              </MagneticButton>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
