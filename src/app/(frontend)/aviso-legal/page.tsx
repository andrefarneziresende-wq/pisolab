import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de piso.lab Valencia.',
  robots: { index: false },
}

export default function AvisoLegalPage() {
  return (
    <section className="bg-offwhite pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-black text-3xl md:text-4xl text-primary-dark mt-4">
          Aviso Legal
        </h1>
        <div className="mt-8 prose prose-brown max-w-none font-body text-primary-dark/80 leading-relaxed space-y-6">
          <h2 className="font-heading font-bold text-xl text-primary-dark">Datos identificativos</h2>
          <p>
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de
            la Información y de Comercio Electrónico (LSSI-CE), se informan los siguientes datos
            del titular del sitio web:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Denominación social: piso.lab Valencia</li>
            <li>Domicilio: Valencia, España</li>
            <li>Email: info@pisolab.es</li>
            <li>Teléfono: +34 600 000 000</li>
          </ul>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Objeto</h2>
          <p>
            El presente sitio web tiene por objeto facilitar información sobre los servicios
            ofrecidos por piso.lab Valencia, así como permitir la solicitud de presupuestos
            y contacto directo con la empresa.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Propiedad intelectual</h2>
          <p>
            Todos los contenidos del sitio web (textos, imágenes, diseño, logotipos, marcas,
            código fuente) son propiedad de piso.lab Valencia o se utilizan con la debida
            autorización. Queda prohibida su reproducción sin autorización expresa.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Limitación de responsabilidad</h2>
          <p>
            piso.lab Valencia no se responsabiliza de los posibles daños o perjuicios derivados
            de interferencias, omisiones, interrupciones o fallos técnicos en el funcionamiento
            del sitio web.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Legislación aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para cualquier
            controversia se someterán a los Juzgados y Tribunales de Valencia.
          </p>

          <p className="text-sm text-brown">Última actualización: Abril 2024</p>
        </div>
      </div>
    </section>
  )
}
