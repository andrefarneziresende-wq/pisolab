import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/Button'
import { SectionTitle } from '@/components/SectionTitle'
import { ScrollReveal } from '@/components/ScrollReveal'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { getServiceBySlug, getServices, getMediaUrl } from '@/lib/queries'

export const dynamic = 'force-dynamic'

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.shortDescription || '',
    keywords: service.seoKeywords || '',
  }
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const heroImage = getMediaUrl(service.heroImage)
  const faqItems = service.faq || []
  const processItems = service.process || []
  const subserviceItems = service.subservices || []

  const faqJsonLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null

  return (
    <>
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image src={heroImage} alt={service.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <span className="font-display italic text-gold-light text-lg">{service.subtitle}</span>
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-offwhite mt-2">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-body text-lg text-primary-dark/80 leading-relaxed">
              {service.shortDescription}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Subservices */}
      {subserviceItems.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal><SectionTitle subtitle="Especialidades" title="¿Qué incluye?" /></ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 max-w-3xl mx-auto">
              {subserviceItems.map((sub: { title: string }, i: number) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-3 bg-offwhite rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="font-body text-primary-dark">{sub.title}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {processItems.length > 0 && (
        <section className="py-20 bg-primary-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal><SectionTitle subtitle="Paso a paso" title="Nuestro proceso" light /></ScrollReveal>
            <div className="mt-12 space-y-8">
              {processItems.map((step: { step: string; description: string }, i: number) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="font-heading font-black text-gold text-lg">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-offwhite">{step.step}</h3>
                      <p className="font-body text-offwhite/60 mt-1">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="py-20 bg-offwhite">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal><SectionTitle subtitle="Dudas frecuentes" title="Preguntas frecuentes" /></ScrollReveal>
            <div className="mt-12 space-y-6">
              {faqItems.map((item: { question: string; answer: string }, i: number) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <details className="group bg-cream rounded-xl p-6 cursor-pointer">
                    <summary className="font-heading font-bold text-primary-dark flex items-center justify-between list-none">
                      {item.question}
                      <span className="text-gold group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                    </summary>
                    <p className="font-body text-primary-dark/70 mt-4 leading-relaxed">{item.answer}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <SectionTitle subtitle="¿Te interesa este servicio?" title="Solicita tu presupuesto gratuito" />
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href={`/contacto?servicio=${slug}`} variant="primary" size="lg">Solicitar presupuesto</Button>
              <Button href="/proyectos" variant="outline" size="lg">Ver proyectos <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
