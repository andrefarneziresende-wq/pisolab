'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { ChevronDown } from 'lucide-react'

interface HeroData {
  title: string
  subtitle: string
  cta1: string
  cta2: string
  image: string
}

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${data.image}')` }}
      />
      <div className="absolute inset-0 bg-primary-dark/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-offwhite leading-tight"
        >
          {data.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display italic text-xl md:text-2xl text-offwhite/80 mt-6 max-w-2xl mx-auto"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Button href="/contacto" variant="primary" size="lg">
            {data.cta1}
          </Button>
          <Button href="/proyectos" variant="secondary" size="lg">
            {data.cta2}
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-8 h-8 text-offwhite/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
