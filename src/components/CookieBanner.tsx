'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('pisolab-cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('pisolab-cookie-consent', JSON.stringify({ analytics: true, marketing: true }))
    setIsVisible(false)
  }

  const rejectOptional = () => {
    localStorage.setItem('pisolab-cookie-consent', JSON.stringify({ analytics: false, marketing: false }))
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-primary-dark rounded-2xl p-6 shadow-2xl border border-offwhite/10">
            <div className="flex items-start gap-4">
              <Cookie className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-body text-offwhite/80 leading-relaxed">
                  Utilizamos cookies para mejorar tu experiencia de navegación y analizar el uso
                  del sitio. Puedes aceptar todas las cookies, rechazar las opcionales o
                  consultar nuestra{' '}
                  <Link href="/politica-cookies" className="text-gold hover:underline">
                    política de cookies
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={acceptAll}
                    className="bg-gold hover:bg-gold-light text-primary-dark font-heading font-bold text-sm px-5 py-2 rounded-lg transition-colors"
                  >
                    Aceptar todo
                  </button>
                  <button
                    onClick={rejectOptional}
                    className="bg-offwhite/10 hover:bg-offwhite/20 text-offwhite font-heading font-bold text-sm px-5 py-2 rounded-lg border border-offwhite/20 transition-colors"
                  >
                    Solo necesarias
                  </button>
                </div>
              </div>
              <button
                onClick={rejectOptional}
                className="text-offwhite/40 hover:text-offwhite transition-colors"
                aria-label="Cerrar banner de cookies"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
