import type { Metadata } from 'next'
import Image from 'next/image'
import { SectionTitle } from '@/components/SectionTitle'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/Button'
import { CTASection } from '@/components/home/CTASection'
import { Shield, Heart, Star, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description:
    'Conoce a piso.lab Valencia. Más de 15 años transformando hogares con calidad artesanal y dedicación total en cada proyecto.',
}

const values = [
  {
    icon: Star,
    title: 'Calidad',
    description: 'Utilizamos solo materiales de primera calidad y técnicas probadas para garantizar resultados duraderos.',
  },
  {
    icon: Heart,
    title: 'Pasión',
    description: 'Cada proyecto recibe nuestra dedicación total. Nos apasiona transformar espacios y superar expectativas.',
  },
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Cumplimos presupuestos y plazos. La transparencia y la honestidad son la base de nuestra relación con el cliente.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Trabajamos codo a codo con nuestros clientes para entender su visión y hacerla realidad.',
  },
]

const stats = [
  { number: '15+', label: 'Años de experiencia' },
  { number: '500+', label: 'Proyectos completados' },
  { number: '98%', label: 'Clientes satisfechos' },
  { number: '6', label: 'Servicios especializados' },
]

export default function SobreNosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Nuestra historia" title="Sobre piso.lab" light />
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/about.jpg"
                  alt="Equipo piso.lab"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <span className="font-display italic text-gold text-lg">Nuestra historia</span>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-primary-dark mt-2">
                  Transformando hogares desde Valencia
                </h2>
                <div className="space-y-4 mt-6 font-body text-primary-dark/70 leading-relaxed">
                  <p>
                    piso.lab nació de una idea simple: que cada hogar merece un acabado excepcional.
                    Lo que comenzó como un pequeño taller de instalación de parquet en Valencia se ha
                    convertido en un equipo multidisciplinar capaz de transformar cualquier espacio.
                  </p>
                  <p>
                    A lo largo de más de 15 años, hemos tenido el privilegio de trabajar en cientos de
                    hogares valencianos, aportando nuestra experiencia y cariño en cada instalación de
                    parquet, cada reforma, cada cocina montada y cada jardín diseñado.
                  </p>
                  <p>
                    Nuestro compromiso es simple: tratar cada proyecto como si fuera nuestro propio hogar.
                    Eso significa utilizar los mejores materiales, cuidar hasta el último detalle y no
                    descansar hasta que el cliente esté completamente satisfecho.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-heading font-black text-4xl md:text-5xl text-gold">
                    {stat.number}
                  </p>
                  <p className="font-body text-offwhite/60 mt-2">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionTitle subtitle="Lo que nos define" title="Nuestros valores" />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="bg-offwhite rounded-2xl p-8 text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto">
                    <value.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-primary-dark mt-4">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-brown mt-2 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-offwhite text-center">
        <div className="max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <SectionTitle subtitle="¿Listo para empezar?" title="Hablemos de tu proyecto" />
            <p className="font-body text-brown mt-4">
              Contacta con nosotros para una consulta gratuita y sin compromiso.
            </p>
            <div className="mt-8">
              <Button href="/contacto" variant="primary" size="lg">
                Solicitar presupuesto
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
