import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const services = [
  'instalacion-parquet',
  'rodapies-puertas',
  'montaje-cocinas',
  'montaje-muebles',
  'albanileria-reformas',
  'jardineria',
]

const projects = [
  'reforma-integral-ruzafa',
  'parquet-roble-atico',
  'cocina-moderna-medida',
  'mueble-salon-empotrado',
  'puertas-correderas-roble',
  'jardin-mediterraneo',
]


export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/servicios`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/proyectos`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/sobre-nosotros`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contacto`, changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  const servicePages = services.map((slug) => ({
    url: `${BASE_URL}/servicios/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projectPages = projects.map((slug) => ({
    url: `${BASE_URL}/proyectos/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...projectPages]
}
