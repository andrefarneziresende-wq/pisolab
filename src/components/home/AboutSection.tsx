import Image from 'next/image'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/Button'
import { ScrollReveal } from '@/components/ScrollReveal'

interface StatItem {
  number: string
  label: string
}

export function AboutSection({ stats, image }: { stats: StatItem[]; image: string }) {
  const displayStats = stats.length > 0 ? stats : [
    { number: '15+', label: 'Años de experiencia' },
    { number: '500+', label: 'Proyectos completados' },
    { number: '98%', label: 'Clientes satisfechos' },
  ]

  return (
    <section className="py-24 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt="Equipo de piso.lab trabajando"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div>
              <SectionTitle
                subtitle="Sobre nosotros"
                title="Calidad artesanal en cada proyecto"
                light
                centered={false}
              />
              <p className="mt-6 font-body text-offwhite/70 leading-relaxed">
                En piso.lab somos un equipo de profesionales apasionados por la transformación
                de espacios. Desde Valencia, llevamos más de 15 años convirtiendo hogares en
                lugares únicos, combinando materiales de primera calidad con un acabado artesanal.
              </p>

              <div className="grid grid-cols-3 gap-8 mt-10">
                {displayStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading font-black text-3xl md:text-4xl text-gold">
                      {stat.number}
                    </p>
                    <p className="text-sm font-body text-offwhite/60 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button href="/sobre-nosotros" variant="outline">
                  Conocernos mejor
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
