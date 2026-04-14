import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Configuración del sitio',
  admin: {
    group: 'Ajustes',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              label: 'Nombre de la empresa',
              defaultValue: 'piso.lab Valencia',
            },
            {
              name: 'logoDark',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (versión clara, para fondos oscuros)',
            },
            {
              name: 'logoLight',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (versión oscura, para fondos claros)',
            },
          ],
        },
        {
          label: 'Contacto',
          fields: [
            {
              name: 'address',
              type: 'textarea',
              label: 'Dirección completa',
            },
            {
              name: 'coordinates',
              type: 'group',
              label: 'Coordenadas GPS',
              fields: [
                {
                  name: 'lat',
                  type: 'number',
                  label: 'Latitud',
                },
                {
                  name: 'lng',
                  type: 'number',
                  label: 'Longitud',
                },
              ],
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Teléfono principal',
            },
            {
              name: 'whatsapp',
              type: 'group',
              label: 'WhatsApp',
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  label: 'Número (con código país, ej: 34600000000)',
                },
                {
                  name: 'message',
                  type: 'text',
                  label: 'Mensaje pre-configurado',
                  defaultValue: 'Hola, me interesa solicitar un presupuesto para...',
                },
              ],
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email de contacto',
            },
            {
              name: 'schedule',
              type: 'textarea',
              label: 'Horario de atención',
            },
          ],
        },
        {
          label: 'Redes sociales',
          fields: [
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
            },
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
            },
            {
              name: 'tiktok',
              type: 'text',
              label: 'TikTok URL',
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
            },
          ],
        },
        {
          label: 'SEO & Analytics',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics 4 ID',
              admin: {
                description: 'Ej: G-XXXXXXXXXX',
              },
            },
            {
              name: 'googleTagManagerId',
              type: 'text',
              label: 'Google Tag Manager ID',
            },
            {
              name: 'headScripts',
              type: 'code',
              label: 'Scripts adicionales (head)',
              admin: {
                language: 'html',
                description: 'Código a insertar en el <head>',
              },
            },
            {
              name: 'bodyScripts',
              type: 'code',
              label: 'Scripts adicionales (body)',
              admin: {
                language: 'html',
                description: 'Código a insertar al inicio del <body>',
              },
            },
          ],
        },
        {
          label: 'Sobre nosotros',
          fields: [
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'Título sección sobre nosotros',
              defaultValue: 'Sobre piso.lab',
            },
            {
              name: 'aboutText',
              type: 'richText',
              label: 'Texto sobre nosotros',
            },
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen sobre nosotros',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Cifras clave',
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  label: 'Número',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Etiqueta',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Título hero',
              defaultValue: 'Transformamos tu hogar',
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'Subtítulo hero',
              defaultValue: 'Reformas integrales, parquet y diseño en Valencia',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen hero',
            },
            {
              name: 'heroCta1Text',
              type: 'text',
              label: 'CTA primario texto',
              defaultValue: 'Solicitar presupuesto',
            },
            {
              name: 'heroCta2Text',
              type: 'text',
              label: 'CTA secundario texto',
              defaultValue: 'Ver nuestros proyectos',
            },
          ],
        },
      ],
    },
  ],
}
