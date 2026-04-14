import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { es } from '@payloadcms/translations/languages/es'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Testimonials } from './collections/Testimonials'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { ContactMessages } from './collections/ContactMessages'
import { SiteConfig } from './globals/SiteConfig'
import { LegalTexts } from './globals/LegalTexts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — piso.lab Admin',
      description: 'Panel de administración de piso.lab Valencia',
      icons: [],
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
    },
  },

  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },

  localization: false,

  collections: [
    Services,
    Projects,
    Testimonials,
    Media,
    Users,
    ContactMessages,
  ],

  globals: [SiteConfig, LegalTexts],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  sharp,

  plugins: [
    seoPlugin({
      collections: ['services', 'projects'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) =>
        `${(doc as Record<string, string>).title} — piso.lab Valencia`,
      generateDescription: ({ doc }) =>
        (doc as Record<string, string>).excerpt || '',
    }),
    // Vercel Blob storage for production (images uploaded via admin)
    // Only active when BLOB_READ_WRITE_TOKEN is set (i.e., in Vercel production)
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
