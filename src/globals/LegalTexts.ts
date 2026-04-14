import type { GlobalConfig } from 'payload'

export const LegalTexts: GlobalConfig = {
  slug: 'legal-texts',
  label: 'Textos legales',
  admin: {
    group: 'Ajustes',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'privacyPolicy',
      type: 'richText',
      label: 'Política de privacidad',
    },
    {
      name: 'legalNotice',
      type: 'richText',
      label: 'Aviso legal',
    },
    {
      name: 'cookiePolicy',
      type: 'richText',
      label: 'Política de cookies',
    },
  ],
}
