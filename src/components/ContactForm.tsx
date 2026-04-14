'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const services = [
  'Instalación de Parquet',
  'Rodapiés y Puertas',
  'Montaje de Cocinas',
  'Montaje de Muebles',
  'Albañilería y Reformas',
  'Jardinería',
  'Otro',
]

const serviceSlugMap: Record<string, string> = {
  'instalacion-parquet': 'Instalación de Parquet',
  'rodapies-puertas': 'Rodapiés y Puertas',
  'montaje-cocinas': 'Montaje de Cocinas',
  'montaje-muebles': 'Montaje de Muebles',
  'albanileria-reformas': 'Albañilería y Reformas',
  jardineria: 'Jardinería',
}

function ContactFormInner() {
  const searchParams = useSearchParams()
  const servicioParam = searchParams.get('servicio')
  const defaultService = servicioParam ? serviceSlugMap[servicioParam] || '' : ''

  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: defaultService,
    },
  })

  const messageLength = watch('message')?.length || 0

  async function onSubmit(data: ContactFormData) {
    setSubmitState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSubmitState('success')
      reset()
    } catch {
      setSubmitState('error')
    }
  }

  if (submitState === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
        <h3 className="font-heading font-bold text-2xl text-primary-dark mt-4">
          ¡Mensaje enviado!
        </h3>
        <p className="font-body text-brown mt-2">
          Hemos recibido tu solicitud. Te responderemos en menos de 24 horas.
        </p>
        <button
          onClick={() => setSubmitState('idle')}
          className="mt-6 text-gold font-heading font-bold hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" {...register('honeypot')} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-heading font-bold text-primary-dark mb-2">
            Nombre completo *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-xl border font-body text-primary-dark bg-offwhite focus:ring-2 focus:ring-gold focus:border-gold transition-colors ${
              errors.name ? 'border-red-400' : 'border-brown/20'
            }`}
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-heading font-bold text-primary-dark mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl border font-body text-primary-dark bg-offwhite focus:ring-2 focus:ring-gold focus:border-gold transition-colors ${
              errors.email ? 'border-red-400' : 'border-brown/20'
            }`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-heading font-bold text-primary-dark mb-2">
            Teléfono *
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-xl border font-body text-primary-dark bg-offwhite focus:ring-2 focus:ring-gold focus:border-gold transition-colors ${
              errors.phone ? 'border-red-400' : 'border-brown/20'
            }`}
            placeholder="600 000 000"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone.message}
            </p>
          )}
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-heading font-bold text-primary-dark mb-2">
            Servicio de interés *
          </label>
          <select
            id="service"
            {...register('service')}
            className={`w-full px-4 py-3 rounded-xl border font-body text-primary-dark bg-offwhite focus:ring-2 focus:ring-gold focus:border-gold transition-colors ${
              errors.service ? 'border-red-400' : 'border-brown/20'
            }`}
          >
            <option value="">Selecciona un servicio</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.service.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-heading font-bold text-primary-dark mb-2">
          Descripción del proyecto
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={`w-full px-4 py-3 rounded-xl border font-body text-primary-dark bg-offwhite focus:ring-2 focus:ring-gold focus:border-gold transition-colors resize-none ${
            errors.message ? 'border-red-400' : 'border-brown/20'
          }`}
          placeholder="Cuéntanos sobre tu proyecto..."
        />
        <div className="flex justify-between mt-1">
          {errors.message ? (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.message.message}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-brown/60">{messageLength}/1000</span>
        </div>
      </div>

      {/* Source */}
      <div>
        <label htmlFor="source" className="block text-sm font-heading font-bold text-primary-dark mb-2">
          ¿Cómo nos conociste?
        </label>
        <select
          id="source"
          {...register('source')}
          className="w-full px-4 py-3 rounded-xl border border-brown/20 font-body text-primary-dark bg-offwhite focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
        >
          <option value="">Selecciona una opción</option>
          <option value="google">Google</option>
          <option value="instagram">Instagram</option>
          <option value="recommendation">Recomendación</option>
          <option value="other">Otro</option>
        </select>
      </div>

      {/* Privacy */}
      <div className="flex items-start gap-3">
        <input
          id="privacy"
          type="checkbox"
          {...register('privacy')}
          className="mt-1 w-4 h-4 rounded border-brown/20 text-gold focus:ring-gold"
        />
        <label htmlFor="privacy" className="text-sm font-body text-brown">
          Acepto la{' '}
          <a href="/politica-privacidad" className="text-gold hover:underline" target="_blank">
            política de privacidad
          </a>{' '}
          y el tratamiento de mis datos personales. *
        </label>
      </div>
      {errors.privacy && (
        <p className="text-red-500 text-xs flex items-center gap-1 -mt-4">
          <AlertCircle className="w-3 h-3" /> {errors.privacy.message}
        </p>
      )}

      {/* Error message */}
      {submitState === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          Ha ocurrido un error. Por favor, inténtalo de nuevo o contacta por teléfono.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState === 'loading'}
        className="w-full bg-gold hover:bg-gold-light text-primary-dark font-heading font-bold text-lg py-4 rounded-xl transition-all duration-200 shadow-lg shadow-gold/20 hover:shadow-gold/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitState === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> Enviar solicitud
          </>
        )}
      </button>
    </form>
  )
}

export function ContactForm() {
  return (
    <Suspense>
      <ContactFormInner />
    </Suspense>
  )
}
