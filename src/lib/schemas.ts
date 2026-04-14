import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z.string().email('Introduce un email válido'),
  phone: z
    .string()
    .regex(/^(\+34)?[0-9]{9}$/, 'Introduce un teléfono válido (9 dígitos)'),
  service: z.string().min(1, 'Selecciona un servicio'),
  message: z
    .string()
    .max(1000, 'El mensaje no puede superar los 1000 caracteres')
    .optional()
    .or(z.literal('')),
  source: z.string().optional(),
  privacy: z.literal(true, {
    message: 'Debes aceptar la política de privacidad',
  }),
  honeypot: z.string().max(0).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
