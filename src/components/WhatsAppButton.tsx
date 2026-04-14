'use client'

import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  phone?: string
  message?: string
}

export function WhatsAppButton({ phone = '34600000000', message = 'Hola, me interesa solicitar un presupuesto para...' }: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </a>
  )
}
