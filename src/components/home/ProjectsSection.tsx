'use client'

import { SectionTitle } from '@/components/SectionTitle'
import { ProjectCard } from '@/components/ProjectCard'
import { Button } from '@/components/Button'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectItem {
  title: string
  image: string
  category: string
  location: string
  href: string
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: direction === 'left' ? -420 : 420, behavior: 'smooth' })
  }

  if (projects.length === 0) return null

  return (
    <section className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <ScrollReveal>
            <SectionTitle subtitle="Portfolio" title="Proyectos destacados" centered={false} />
          </ScrollReveal>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border-2 border-brown/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="Anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border-2 border-brown/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="Siguiente">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pl-4 sm:pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-8 pb-4" style={{ scrollbarWidth: 'none' }}>
        {projects.map((project) => (
          <ProjectCard key={project.href} {...project} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <Button href="/proyectos" variant="outline">Ver todos los proyectos</Button>
      </div>
    </section>
  )
}
