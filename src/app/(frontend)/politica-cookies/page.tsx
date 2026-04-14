import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de piso.lab Valencia.',
  robots: { index: false },
}

export default function PoliticaCookiesPage() {
  return (
    <section className="bg-offwhite pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-black text-3xl md:text-4xl text-primary-dark mt-4">
          Política de Cookies
        </h1>
        <div className="mt-8 prose prose-brown max-w-none font-body text-primary-dark/80 leading-relaxed space-y-6">
          <h2 className="font-heading font-bold text-xl text-primary-dark">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando
            visita un sitio web. Se utilizan para recordar sus preferencias, mejorar la experiencia
            de navegación y obtener datos analíticos sobre el uso del sitio.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Tipos de cookies que utilizamos</h2>

          <h3 className="font-heading font-bold text-lg text-primary-dark">Cookies necesarias</h3>
          <p>
            Esenciales para el funcionamiento del sitio web. No requieren consentimiento e incluyen
            cookies de sesión y de seguridad.
          </p>

          <h3 className="font-heading font-bold text-lg text-primary-dark">Cookies analíticas</h3>
          <p>
            Utilizamos Google Analytics para comprender cómo los usuarios interactúan con nuestro
            sitio web. Estas cookies recopilan información de forma anónima sobre páginas visitadas,
            tiempo de navegación y fuentes de tráfico.
          </p>

          <h3 className="font-heading font-bold text-lg text-primary-dark">Cookies de marketing</h3>
          <p>
            Pueden utilizarse para mostrar publicidad relevante y medir la efectividad de las
            campañas publicitarias.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Gestión de cookies</h2>
          <p>
            Puede configurar sus preferencias de cookies a través del banner de consentimiento
            que aparece al visitar nuestro sitio. También puede configurar su navegador para
            bloquear o eliminar cookies, aunque esto podría afectar al funcionamiento del sitio.
          </p>

          <h2 className="font-heading font-bold text-xl text-primary-dark">Más información</h2>
          <p>
            Para más información sobre nuestra política de privacidad, puede consultar la{' '}
            <a href="/politica-privacidad" className="text-gold hover:underline">
              política de privacidad
            </a>
            . Para cualquier consulta, contacte con nosotros en info@pisolab.es.
          </p>

          <p className="text-sm text-brown">Última actualización: Abril 2024</p>
        </div>
      </div>
    </section>
  )
}
