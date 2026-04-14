import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Servicio',
    plural: 'Servicios',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'status', 'updatedAt'],
    group: 'Contenido',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
      maxLength: 120,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL amigable (ej: instalacion-parquet)',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo',
      maxLength: 200,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Descripción corta',
      maxLength: 160,
      admin: {
        description: 'Para cards y listados (máx 160 caracteres)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido detallado',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen hero',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galería de imágenes',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icono (nombre de Lucide)',
      admin: {
        description: 'Nombre del icono de Lucide Icons (ej: hammer, home, tree)',
      },
    },
    {
      name: 'subservices',
      type: 'array',
      label: 'Subservicios',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
      ],
    },
    {
      name: 'process',
      type: 'array',
      label: 'Proceso de trabajo',
      fields: [
        {
          name: 'step',
          type: 'text',
          label: 'Paso',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'Preguntas frecuentes',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Pregunta',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Respuesta',
          required: true,
        },
      ],
    },
    {
      name: 'seoKeywords',
      type: 'text',
      label: 'Palabras clave SEO',
      admin: {
        position: 'sidebar',
        description: 'Separadas por coma',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de visualización',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
