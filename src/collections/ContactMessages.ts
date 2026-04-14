import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Mensaje',
    plural: 'Mensajes de contacto',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'messageStatus', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre completo',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
      required: true,
    },
    {
      name: 'service',
      type: 'text',
      label: 'Servicio de interés',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Descripción del proyecto',
      maxLength: 1000,
    },
    {
      name: 'source',
      type: 'select',
      label: 'Cómo nos conociste',
      options: [
        { label: 'Google', value: 'google' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Recomendación', value: 'recommendation' },
        { label: 'Otro', value: 'other' },
      ],
    },
    {
      name: 'messageStatus',
      type: 'select',
      label: 'Estado',
      defaultValue: 'new',
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'Leído', value: 'read' },
        { label: 'Respondido', value: 'replied' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Notas internas',
      admin: {
        description: 'Notas visibles solo para el equipo',
        position: 'sidebar',
      },
    },
  ],
}
