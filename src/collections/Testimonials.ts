import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonio',
    plural: 'Testimonios',
  },
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'rating', 'service', 'featured', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      label: 'Nombre del cliente',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Texto del testimonio',
      required: true,
      maxLength: 500,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Puntuación (1-5)',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Servicio contratado',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto del cliente',
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
      defaultValue: 'active',
      options: [
        { label: 'Activo', value: 'active' },
        { label: 'Inactivo', value: 'inactive' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
