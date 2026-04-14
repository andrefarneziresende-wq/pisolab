import type { Metadata } from 'next'
import { League_Spartan, Playfair_Display, DM_Sans } from 'next/font/google'
import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { CookieBanner } from '@/components/CookieBanner'
import { getSiteConfig } from '@/lib/queries'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
  display: 'swap',
  weight: ['700', '800', '900'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    template: '%s — piso.lab Valencia',
    default: 'piso.lab Valencia — Reformas, Parquet y Diseño',
  },
  description:
    'Especialistas en reformas integrales, instalación de parquet, montaje de cocinas, muebles y jardinería en Valencia. Solicita tu presupuesto gratuito.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'piso.lab Valencia',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = await getSiteConfig()
  const whatsappPhone = config.whatsapp?.number || '34600000000'
  const whatsappMessage = config.whatsapp?.message || 'Hola, me interesa solicitar un presupuesto para...'

  return (
    <html
      lang="es"
      className={`${leagueSpartan.variable} ${playfairDisplay.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col font-body bg-offwhite text-primary-dark antialiased">
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton phone={whatsappPhone} message={whatsappMessage} />
        <CookieBanner />
      </body>
    </html>
  )
}
