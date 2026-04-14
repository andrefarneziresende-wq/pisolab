import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date))
}

export function getMediaUrl(media: { url?: string } | string | null | undefined): string {
  if (!media) return '/placeholder.jpg'
  if (typeof media === 'string') return media
  return media.url || '/placeholder.jpg'
}
