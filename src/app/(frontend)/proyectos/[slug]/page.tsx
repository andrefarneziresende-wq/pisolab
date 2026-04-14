import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/Button'
import { ScrollReveal } from '@/components/ScrollReveal'
import { MapPin, Calendar, Tag } from 'lucide-react'
import { getProjectBySlug, getMediaUrl } from '@/lib/queries'

export const dynamic = 'force-dynamic'

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return { title: project.title }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const coverImage = getMediaUrl(project.coverImage)
  const gallery = (project.gallery || []) as Array<{ image: unknown; caption?: string }>
  const firstService = Array.isArray(project.services) && project.services[0]
  const category = firstService && typeof firstService === 'object' ? firstService.title : 'Proyecto'

  const completionDate = project.completionDate
    ? new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long' }).format(new Date(project.completionDate))
    : ''

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px]">
        <Image src={coverImage} alt={project.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent" />
      </section>

      <section className="py-16 bg-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-offwhite rounded-2xl p-8 md:p-12 shadow-xl">
            <h1 className="font-heading font-black text-3xl md:text-4xl text-primary-dark">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4 mt-4">
              <span className="flex items-center gap-2 text-sm text-brown">
                <Tag className="w-4 h-4 text-gold" /> {category}
              </span>
              {project.location && (
                <span className="flex items-center gap-2 text-sm text-brown">
                  <MapPin className="w-4 h-4 text-gold" /> {project.location}
                </span>
              )}
              {completionDate && (
                <span className="flex items-center gap-2 text-sm text-brown">
                  <Calendar className="w-4 h-4 text-gold" /> {completionDate}
                </span>
              )}
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                {gallery.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className={`relative overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
                      <Image
                        src={getMediaUrl(item.image)}
                        alt={item.caption || `${project.title} - ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes={i === 0 ? '100vw' : '50vw'}
                      />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}

            <div className="text-center mt-12 pt-8 border-t border-cream">
              <p className="font-display italic text-gold text-lg">¿Te gustaría un resultado similar?</p>
              <div className="mt-4">
                <Button href="/contacto" variant="primary" size="lg">Solicitar presupuesto</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
