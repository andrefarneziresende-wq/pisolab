import { Button } from '@/components/Button'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Phone } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/cta-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-primary-dark/85 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <ScrollReveal>
          <span className="font-display italic text-gold-light text-lg">
            ¿Tienes un proyecto en mente?
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-offwhite mt-4 leading-tight">
            ¿Listo para transformar tu hogar?
          </h2>
          <p className="font-body text-offwhite/70 mt-6 text-lg max-w-xl mx-auto">
            Cuéntanos tu idea y te haremos un presupuesto sin compromiso. Estamos aquí para
            hacer realidad tu proyecto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button href="/contacto" variant="primary" size="lg">
              Solicitar presupuesto gratuito
            </Button>
            <a
              href="tel:+34600000000"
              className="inline-flex items-center gap-2 text-offwhite/80 hover:text-gold transition-colors font-heading font-bold"
            >
              <Phone className="w-5 h-5" />
              +34 600 000 000
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
