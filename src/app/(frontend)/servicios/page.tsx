import type { Metadata } from 'next'
import { ServiceCard } from '@/components/ServiceCard'
import { SectionTitle } from '@/components/SectionTitle'
import { CTASection } from '@/components/home/CTASection'
import { getServices, getMediaUrl } from '@/lib/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Descubre todos nuestros servicios: instalación de parquet, reformas integrales, montaje de cocinas y muebles, puertas, rodapiés y jardinería en Valencia.',
}

export default async function ServiciosPage() {
  const services = await getServices()

  return (
    <>
      <section className="bg-primary-dark pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Lo que hacemos" title="Nuestros Servicios" light />
          <p className="text-center text-offwhite/70 font-body mt-4 max-w-2xl mx-auto">
            Ofrecemos una gama completa de servicios para transformar tu hogar. Cada proyecto
            recibe nuestra dedicación total y los más altos estándares de calidad.
          </p>
        </div>
      </section>

      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                description={service.shortDescription || ''}
                image={getMediaUrl(service.heroImage)}
                href={`/servicios/${service.slug}`}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
