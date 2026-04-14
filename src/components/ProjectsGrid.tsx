'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  title: string
  image: string
  category: string
  location: string
  slug: string
}

export function ProjectsGrid({
  projects,
  categories,
}: {
  projects: Project[]
  categories: string[]
}) {
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filtered =
    activeCategory === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-heading font-bold transition-all ${
              activeCategory === cat
                ? 'bg-gold text-primary-dark'
                : 'bg-cream text-brown hover:bg-gold/20 hover:text-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.05}>
              <Link href={`/proyectos/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold/90 backdrop-blur-sm text-primary-dark font-heading font-bold text-xs px-3 py-1.5 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-heading font-bold text-lg mt-4 text-primary-dark group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                {project.location && (
                  <p className="flex items-center gap-1 mt-1 text-sm text-brown">
                    <MapPin className="w-4 h-4" /> {project.location}
                  </p>
                )}
              </Link>
            </ScrollReveal>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="text-center text-brown py-12">No hay proyectos en esta categoría todavía.</p>
      )}
    </div>
  )
}
