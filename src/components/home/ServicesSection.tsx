import { SectionTitle } from '@/components/SectionTitle'
import { ServiceCard } from '@/components/ServiceCard'
import { ScrollReveal } from '@/components/ScrollReveal'

interface ServiceItem {
  title: string
  description: string
  image: string
  href: string
}

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  return (
    <section className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle subtitle="Nuestros servicios" title="Lo que hacemos" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, i) => (
            <ServiceCard key={service.href} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
