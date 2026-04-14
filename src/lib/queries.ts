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

// Helper to get media URL from a Payload media object
export function getMediaUrl(media: unknown): string {
  if (!media) return '/images/hero-bg.jpg'
  if (typeof media === 'string') {
    return normalizeMediaUrl(media)
  }
  if (typeof media === 'object' && media !== null) {
    // Try filename first (most reliable for static serving)
    if ('filename' in media && (media as { filename: string }).filename) {
      return `/media/${(media as { filename: string }).filename}`
    }
    if ('url' in media && (media as { url: string }).url) {
      return normalizeMediaUrl((media as { url: string }).url)
    }
  }
  return '/images/hero-bg.jpg'
}

function normalizeMediaUrl(url: string): string {
  // Convert Payload API URLs to static paths
  // /api/media/file/xxx.jpg → /media/xxx.jpg
  if (url.startsWith('/api/media/file/')) {
    return '/media/' + url.replace('/api/media/file/', '')
  }
  return url
}
