import type { Metadata } from 'next'
import { SectionTitle } from '@/components/SectionTitle'
import { CTASection } from '@/components/home/CTASection'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { getProjects, getServices, getMediaUrl } from '@/lib/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Descubre nuestro portfolio de proyectos: reformas, instalación de parquet, cocinas, muebles y más en Valencia.',
}

export default async function ProyectosPage() {
  const [projects, services] = await Promise.all([getProjects(), getServices()])

  const categories = ['Todos', ...services.map((s) => s.title)]

  const projectsData = projects.map((p) => {
    const firstService = Array.isArray(p.services) && p.services[0]
    const category = firstService && typeof firstService === 'object' ? firstService.title : 'Proyecto'
    return {
      title: p.title,
      image: getMediaUrl(p.coverImage),
      category,
      location: p.location || '',
      slug: p.slug,
    }
  })

  return (
    <>
      <section className="bg-primary-dark pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Portfolio" title="Nuestros Proyectos" light />
          <p className="text-center text-offwhite/70 font-body mt-4 max-w-2xl mx-auto">
            Cada proyecto es una historia de transformación. Descubre cómo hemos convertido
            espacios ordinarios en lugares extraordinarios.
          </p>
        </div>
      </section>

      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsGrid projects={projectsData} categories={categories} />
        </div>
      </section>

      <CTASection />
    </>
  )
}
