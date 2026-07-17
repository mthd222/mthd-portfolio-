import { motion } from 'framer-motion'

export function SectionHeading({ tag, title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="section-tag mb-2">
        <span className="mr-2 text-mist/50">//</span>
        {tag}
      </p>
      <h2 className="glitch font-display text-3xl font-bold sm:text-4xl" data-text={title}>
        {title} <span className="text-neon">{accent}</span>
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-neon to-transparent" />
    </motion.div>
  )
}

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
