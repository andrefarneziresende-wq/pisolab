'use client'

import { SectionTitle } from '@/components/SectionTitle'
import { TestimonialCard } from '@/components/TestimonialCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TestimonialItem {
  name: string
  text: string
  rating: number
  service?: string
}

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = () => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (testimonials.length === 0) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, testimonials.length])

  if (testimonials.length === 0) return null

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle subtitle="Testimonios" title="Lo que dicen nuestros clientes" />
        </ScrollReveal>

        <div className="mt-12 relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
              {testimonials.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-brown/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="Anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-gold w-8' : 'bg-brown/20'}`} aria-label={`Testimonio ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border-2 border-brown/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors" aria-label="Siguiente">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
