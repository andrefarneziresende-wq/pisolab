import Link from 'next/link'
import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-offwhite">
      <div className="text-center px-4">
        <span className="font-heading font-black text-8xl text-gold/30">404</span>
        <h1 className="font-heading font-black text-3xl text-primary-dark mt-4">
          Página no encontrada
        </h1>
        <p className="font-body text-brown mt-4 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary">
            Volver al inicio
          </Button>
        </div>
      </div>
    </section>
  )
}
