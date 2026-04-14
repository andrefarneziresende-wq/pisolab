import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de piso.lab Valencia.',
  robots: { index: false },
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="bg-offwhite pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-black text-3xl md:text-4xl text-primary-dark mt-4">
          Política de Privacidad
        </h1>
        <div className="mt-8 prose prose-brown max-w-none font-body text-primary-dark/80 leading-relaxed space-y-6">
          <p>
            En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo,
            de 27 de abril de 2016 (RGPD), y de la Ley Orgánica 3/2018, de 5 de diciembre, de
            Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le
            informamos de lo siguiente:
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Responsable del tratamiento</h2>
          <p>
            piso.lab Valencia<br />
            Dirección: Valencia, España<br />
            Email: info@pisolab.es<br />
            Teléfono: +34 600 000 000
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Finalidad del tratamiento</h2>
          <p>
            Los datos personales recogidos a través del formulario de contacto serán tratados con
            la finalidad de atender su solicitud de presupuesto y mantener comunicación comercial
            relacionada con nuestros servicios.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Base jurídica</h2>
          <p>
            El tratamiento de sus datos se basa en el consentimiento otorgado al enviar el
            formulario de contacto, así como en el interés legítimo de la empresa para responder
            a sus consultas.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Destinatarios</h2>
          <p>
            Sus datos no serán cedidos a terceros salvo obligación legal. Utilizamos
            proveedores de servicios (hosting, email) que actúan como encargados del tratamiento
            con las garantías adecuadas.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Conservación de datos</h2>
          <p>
            Los datos se conservarán mientras sea necesario para la finalidad para la que fueron
            recogidos y durante los plazos legalmente establecidos.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Derechos</h2>
          <p>
            Puede ejercer sus derechos de acceso, rectificación, supresión, portabilidad,
            limitación y oposición enviando un email a info@pisolab.es. También tiene derecho
            a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
          </p>

          <p className="text-sm text-brown">
            Última actualización: Abril 2024
          </p>
        </div>
      </div>
    </section>
  )
}
