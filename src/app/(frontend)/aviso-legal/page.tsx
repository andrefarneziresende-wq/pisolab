import type { Metadata } from 'next'
import { getLegalTexts } from '@/lib/queries'
import { RichText } from '@/components/RichText'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de piso.lab Valencia.',
  robots: { index: false },
}

export default async function AvisoLegalPage() {
  const legal = await getLegalTexts()

  return (
    <>
      <section className="bg-primary-dark pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-black text-3xl md:text-4xl text-offwhite">
            Aviso Legal
          </h1>
        </div>
      </section>
      <section className="bg-offwhite py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RichText data={legal.legalNotice as never} />
        </div>
      </section>
    </>
  )
}
