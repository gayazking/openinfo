import { motion } from "framer-motion";

type Props = {
  index: string; // например "01"
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-3 flex items-center gap-3 font-mono text-sm text-neon-cyan"
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-neon-cyan" />
        <span>{index}</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-neon-cyan" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-2xl text-balance text-slate-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
