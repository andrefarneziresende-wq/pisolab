import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Proyecto',
    plural: 'Proyectos',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'services', 'location', 'featured', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título del proyecto',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Servicios relacionados',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descripción del proyecto',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galería de imágenes',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Pie de foto',
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Ubicación / Barrio',
      admin: {
        description: 'Ej: Ruzafa, Valencia',
      },
    },
    {
      name: 'completionDate',
      type: 'date',
      label: 'Fecha de realización',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MM/yyyy',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacado en home',
      defaultValue: false,
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
