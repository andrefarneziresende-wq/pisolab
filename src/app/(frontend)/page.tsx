import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { AboutSection } from '@/components/home/AboutSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CTASection } from '@/components/home/CTASection'
import {
  getServices,
  getFeaturedProjects,
  getFeaturedTestimonials,
  getSiteConfig,
  getMediaUrl,
} from '@/lib/queries'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [services, projects, testimonials, config] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
    getFeaturedTestimonials(),
    getSiteConfig(),
  ])

  const servicesData = services.map((s) => ({
    title: s.title,
    description: s.shortDescription || '',
    image: getMediaUrl(s.heroImage),
    href: `/servicios/${s.slug}`,
  }))

  const projectsData = projects.map((p) => {
    const firstService = Array.isArray(p.services) && p.services[0]
    const categoryName = firstService && typeof firstService === 'object' ? firstService.title : 'Proyecto'
    return {
      title: p.title,
      image: getMediaUrl(p.coverImage),
      category: categoryName,
      location: p.location || '',
      href: `/proyectos/${p.slug}`,
    }
  })

  const testimonialsData = testimonials.map((t) => ({
    name: t.clientName,
    text: t.text,
    rating: t.rating,
    service: t.service && typeof t.service === 'object' ? t.service.title : undefined,
  }))

  const heroData = {
    title: config.heroTitle || 'Transformamos tu hogar',
    subtitle: config.heroSubtitle || 'Reformas integrales, parquet y diseño en Valencia',
    cta1: config.heroCta1Text || 'Solicitar presupuesto',
    cta2: config.heroCta2Text || 'Ver nuestros proyectos',
    image: getMediaUrl(config.heroImage),
  }

  const statsData = (config.stats || []).map((s: { number: string; label: string }) => ({
    number: s.number,
    label: s.label,
  }))

  const aboutImage = getMediaUrl(config.aboutImage)

  return (
    <>
      <HeroSection data={heroData} />
      <ServicesSection services={servicesData} />
      <AboutSection stats={statsData} image={aboutImage} />
      <ProjectsSection projects={projectsData} />
      <TestimonialsSection testimonials={testimonialsData} />
      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: config.companyName || 'piso.lab Valencia',
            description: 'Especialistas en reformas integrales, instalación de parquet, montaje de cocinas, muebles y jardinería en Valencia.',
            url: process.env.NEXT_PUBLIC_SERVER_URL,
            telephone: config.phone,
            email: config.email,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Valencia',
              addressRegion: 'Comunidad Valenciana',
              addressCountry: 'ES',
            },
            openingHours: ['Mo-Fr 09:00-19:00', 'Sa 10:00-14:00'],
          }),
        }}
      />
    </>
  )
}
