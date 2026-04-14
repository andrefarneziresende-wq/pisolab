import { getPayloadClient } from './payload'

export async function getServices() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    where: { status: { equals: 'published' } },
    sort: 'order',
    limit: 20,
  })
  return result.docs
}

export async function getServiceBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getProjects(limit = 20) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: '-completionDate',
    limit,
    depth: 2,
  })
  return result.docs
}

export async function getFeaturedProjects() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: {
      status: { equals: 'published' },
      featured: { equals: true },
    },
    sort: '-completionDate',
    limit: 8,
    depth: 2,
  })
  return result.docs
}

export async function getProjectBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
}

export async function getTestimonials() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    where: { status: { equals: 'active' } },
    limit: 20,
    depth: 1,
  })
  return result.docs
}

export async function getFeaturedTestimonials() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    where: {
      status: { equals: 'active' },
      featured: { equals: true },
    },
    limit: 10,
    depth: 1,
  })
  return result.docs
}

export async function getSiteConfig() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-config', depth: 1 })
}

export async function getLegalTexts() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'legal-texts' })
}

// Resolve media URL from a Payload media object
// Payload 3.x computes /api/media/file/{filename} dynamically
// but our files are in public/media/ served as static /media/{filename}
export function getMediaUrl(media: unknown): string {
  if (!media) return '/images/hero-bg.jpg'

  if (typeof media === 'string') {
    if (media.startsWith('https://')) return media
    return media
  }

  if (typeof media === 'object' && media !== null) {
    const obj = media as Record<string, unknown>

    // Absolute URL (Vercel Blob, etc.) — use directly
    if (typeof obj.url === 'string' && obj.url.startsWith('https://')) {
      return obj.url
    }

    // Use filename to build static URL — most reliable
    if (typeof obj.filename === 'string' && obj.filename) {
      return `/media/${obj.filename}`
    }

    // Fallback to whatever url Payload gives
    if (typeof obj.url === 'string') return obj.url
  }

  return '/images/hero-bg.jpg'
}
