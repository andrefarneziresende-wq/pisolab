import type { Metadata } from 'next'
import { SectionTitle } from '@/components/SectionTitle'
import { ContactForm } from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta con piso.lab Valencia. Solicita tu presupuesto gratuito para reformas, parquet, cocinas, muebles y más.',
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Valencia, España',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+34 600 000 000',
    href: 'tel:+34600000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@pisolab.es',
    href: 'mailto:info@pisolab.es',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lun - Vie: 9:00 - 19:00\nSáb: 10:00 - 14:00',
  },
]

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Hablemos" title="Contacto" light />
          <p className="text-center text-offwhite/70 font-body mt-4 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Cuéntanos y te haremos un presupuesto sin compromiso.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-heading font-bold text-2xl text-primary-dark mb-8">
                Solicita tu presupuesto gratuito
              </h2>
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-cream rounded-2xl p-8">
                <h3 className="font-heading font-bold text-xl text-primary-dark mb-6">
                  Datos de contacto
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-sm text-primary-dark">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-brown hover:text-gold transition-colors font-body"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-brown font-body whitespace-pre-line">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden h-64 bg-cream flex items-center justify-center">
                <div className="text-center text-brown/60">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-body text-sm">Valencia, España</p>
                  <p className="text-xs mt-1">Mapa interactivo disponible próximamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
