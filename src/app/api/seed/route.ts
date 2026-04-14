import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import fs from 'fs'
import path from 'path'

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Seed disabled in production' }, { status: 403 })
  }

  const payload = await getPayloadClient()
  const results: string[] = []

  try {
    // 1. Create admin user
    const existingUsers = await payload.find({ collection: 'users', limit: 1 })
    let adminUser
    if (existingUsers.docs.length === 0) {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@pisolab.es',
          password: 'pisolab2024',
          name: 'Admin piso.lab',
          role: 'admin',
        },
      })
      results.push('Admin user created: admin@pisolab.es / pisolab2024')
    } else {
      adminUser = existingUsers.docs[0]
      results.push('Admin user already exists')
    }

    // 2. Upload images as media
    const mediaMap: Record<string, number> = {}
    const imageFiles = [
      { name: 'hero-bg', file: 'public/images/hero-bg.jpg', alt: 'piso.lab hero background' },
      { name: 'cta-bg', file: 'public/images/cta-bg.jpg', alt: 'piso.lab CTA background' },
      { name: 'about', file: 'public/images/about.jpg', alt: 'Equipo piso.lab' },
      { name: 'parquet', file: 'public/images/services/parquet.jpg', alt: 'Instalación de parquet' },
      { name: 'puertas', file: 'public/images/services/puertas.jpg', alt: 'Rodapiés y puertas' },
      { name: 'cocinas', file: 'public/images/services/cocinas.jpg', alt: 'Montaje de cocinas' },
      { name: 'muebles', file: 'public/images/services/muebles.jpg', alt: 'Montaje de muebles' },
      { name: 'reformas', file: 'public/images/services/reformas.jpg', alt: 'Albañilería y reformas' },
      { name: 'jardineria', file: 'public/images/services/jardineria.jpg', alt: 'Jardinería' },
      { name: 'project-1', file: 'public/images/projects/project-1.jpg', alt: 'Reforma integral Ruzafa' },
      { name: 'project-2', file: 'public/images/projects/project-2.jpg', alt: 'Parquet roble ático' },
      { name: 'project-3', file: 'public/images/projects/project-3.jpg', alt: 'Cocina moderna' },
      { name: 'project-4', file: 'public/images/projects/project-4.jpg', alt: 'Mueble salón empotrado' },
      { name: 'project-5', file: 'public/images/projects/project-5.jpg', alt: 'Puertas correderas roble' },
      { name: 'project-6', file: 'public/images/projects/project-6.jpg', alt: 'Jardín mediterráneo' },
    ]

    for (const img of imageFiles) {
      try {
        const filePath = path.resolve(process.cwd(), img.file)
        if (!fs.existsSync(filePath)) continue
        const buffer = fs.readFileSync(filePath)
        const media = await payload.create({
          collection: 'media',
          data: { alt: img.alt },
          file: {
            data: buffer,
            name: `${img.name}.jpg`,
            mimetype: 'image/jpeg',
            size: buffer.length,
          },
        })
        mediaMap[img.name] = media.id as number
        results.push(`Media: ${img.name}`)
      } catch (e: unknown) {
        results.push(`Media error (${img.name}): ${(e as Error).message}`)
      }
    }

    // 3. Create services
    const servicesData = [
      {
        title: 'Instalación de Parquet', slug: 'instalacion-parquet',
        subtitle: 'Suelos que hablan de calidad',
        shortDescription: 'Suelos de madera natural, tarima flotante, parquet macizo, lijado y barnizado de suelos existentes.',
        heroImage: mediaMap['parquet'], icon: 'hammer', order: 1, status: 'published' as const,
        seoKeywords: 'parquet valencia, instalación parquet, tarima flotante valencia',
        subservices: [
          { title: 'Parquet macizo de roble, nogal y otras maderas nobles', description: '' },
          { title: 'Tarima flotante de alta gama', description: '' },
          { title: 'Lijado y barnizado de suelos existentes', description: '' },
          { title: 'Restauración de parquet antiguo', description: '' },
          { title: 'Instalación sobre suelo radiante', description: '' },
        ],
        process: [
          { step: 'Evaluación', description: 'Visitamos tu hogar para evaluar el suelo actual' },
          { step: 'Propuesta', description: 'Opciones de materiales y presupuesto detallado' },
          { step: 'Preparación', description: 'Preparamos la superficie para la instalación' },
          { step: 'Instalación', description: 'Colocamos el parquet con precisión artesanal' },
          { step: 'Acabado', description: 'Lijado, barnizado y limpieza final' },
        ],
        faq: [
          { question: '¿Cuánto tiempo tarda la instalación?', answer: 'Entre 2 y 5 días laborables para una vivienda estándar.' },
          { question: '¿Se puede instalar sobre suelo radiante?', answer: 'Sí, con sistemas y adhesivos especiales compatibles.' },
        ],
      },
      {
        title: 'Rodapiés y Puertas', slug: 'rodapies-puertas',
        subtitle: 'Los detalles que marcan la diferencia',
        shortDescription: 'Rodapiés en MDF, madera maciza y lacados. Puertas interiores correderas, batientes y plegables.',
        heroImage: mediaMap['puertas'], icon: 'door-open', order: 2, status: 'published' as const,
        seoKeywords: 'puertas interiores valencia, rodapiés, puertas correderas',
        subservices: [
          { title: 'Rodapiés de MDF lacado', description: '' },
          { title: 'Puertas batientes de madera', description: '' },
          { title: 'Puertas correderas empotradas', description: '' },
          { title: 'Marcos y guarniciones', description: '' },
        ],
        process: [
          { step: 'Medición', description: 'Medidas exactas de todos los huecos' },
          { step: 'Selección', description: 'Elegimos materiales y acabados' },
          { step: 'Instalación', description: 'Montaje profesional' },
          { step: 'Revisión', description: 'Verificación y ajustes finales' },
        ],
        faq: [
          { question: '¿Qué tipo de rodapié recomendáis?', answer: 'Depende del suelo. Para parquet recomendamos MDF lacado o madera natural.' },
        ],
      },
      {
        title: 'Montaje de Cocinas', slug: 'montaje-cocinas',
        subtitle: 'El corazón de tu hogar, a medida',
        shortDescription: 'Cocinas a medida, modulares y de diseño. Integración de electrodomésticos y encimeras.',
        heroImage: mediaMap['cocinas'], icon: 'chef-hat', order: 3, status: 'published' as const,
        seoKeywords: 'montaje cocinas valencia, cocinas a medida',
        subservices: [
          { title: 'Montaje de cocinas modulares', description: '' },
          { title: 'Cocinas a medida', description: '' },
          { title: 'Integración de electrodomésticos', description: '' },
          { title: 'Instalación de encimeras', description: '' },
        ],
        process: [
          { step: 'Diseño', description: 'Planificamos la instalación' },
          { step: 'Preparación', description: 'Fontanería, electricidad y nivelación' },
          { step: 'Montaje', description: 'Instalamos con precisión milimétrica' },
          { step: 'Entrega', description: 'Limpieza y verificación completa' },
        ],
        faq: [
          { question: '¿Montáis cocinas de cualquier marca?', answer: 'Sí, todas las marcas del mercado.' },
        ],
      },
      {
        title: 'Montaje de Muebles', slug: 'montaje-muebles',
        subtitle: 'Diseño y funcionalidad a medida',
        shortDescription: 'Muebles a medida, estanterías, armarios empotrados, muebles de salón y librerías.',
        heroImage: mediaMap['muebles'], icon: 'sofa', order: 4, status: 'published' as const,
        seoKeywords: 'muebles a medida valencia, armarios empotrados',
        subservices: [
          { title: 'Armarios empotrados a medida', description: '' },
          { title: 'Muebles de salón y TV', description: '' },
          { title: 'Estanterías y librerías', description: '' },
          { title: 'Vestidores', description: '' },
        ],
        process: [
          { step: 'Consulta', description: 'Escuchamos necesidades y medimos' },
          { step: 'Diseño', description: 'Diseño personalizado' },
          { step: 'Montaje', description: 'Instalación profesional' },
          { step: 'Acabado', description: 'Ajustes finales' },
        ],
        faq: [
          { question: '¿Hacéis muebles a medida?', answer: 'Sí, totalmente personalizados según tus necesidades.' },
        ],
      },
      {
        title: 'Albañilería y Reformas', slug: 'albanileria-reformas',
        subtitle: 'Transformamos espacios por completo',
        shortDescription: 'Reformas integrales de viviendas, baños, redistribución de espacios, alicatado y acabados.',
        heroImage: mediaMap['reformas'], icon: 'hard-hat', order: 5, status: 'published' as const,
        seoKeywords: 'reformas valencia, reformas integrales, reforma baño',
        subservices: [
          { title: 'Reformas integrales de vivienda', description: '' },
          { title: 'Reformas de baños', description: '' },
          { title: 'Redistribución de espacios', description: '' },
          { title: 'Alicatado y solados', description: '' },
        ],
        process: [
          { step: 'Visita técnica', description: 'Evaluamos estado y necesidades' },
          { step: 'Proyecto', description: 'Presupuesto y planificación' },
          { step: 'Obra', description: 'Ejecución con materiales de primera' },
          { step: 'Acabados', description: 'Pintura, limpieza y entrega' },
        ],
        faq: [
          { question: '¿Cuánto tarda una reforma integral?', answer: 'Entre 6 y 12 semanas según superficie y complejidad.' },
        ],
      },
      {
        title: 'Jardinería', slug: 'jardineria',
        subtitle: 'Naturaleza viva en tu hogar',
        shortDescription: 'Diseño de jardines, césped, riego automático, poda ornamental y paisajismo.',
        heroImage: mediaMap['jardineria'], icon: 'trees', order: 6, status: 'published' as const,
        seoKeywords: 'jardinería valencia, mantenimiento jardines, paisajismo',
        subservices: [
          { title: 'Diseño de jardines', description: '' },
          { title: 'Césped natural y artificial', description: '' },
          { title: 'Sistemas de riego automático', description: '' },
          { title: 'Poda ornamental', description: '' },
        ],
        process: [
          { step: 'Diseño', description: 'Diseño paisajístico adaptado' },
          { step: 'Preparación', description: 'Preparamos terreno y sistemas' },
          { step: 'Plantación', description: 'Plantas, césped y decoración' },
          { step: 'Mantenimiento', description: 'Plan de mantenimiento periódico' },
        ],
        faq: [
          { question: '¿Ofrecéis mantenimiento periódico?', answer: 'Sí, planes semanal, quincenal o mensual.' },
        ],
      },
    ]

    const serviceIds: Record<string, number> = {}
    for (const svc of servicesData) {
      try {
        const service = await payload.create({ collection: 'services', data: svc })
        serviceIds[svc.slug] = service.id as number
        results.push(`Service: ${svc.title}`)
      } catch (e: unknown) {
        results.push(`Service error (${svc.title}): ${(e as Error).message}`)
      }
    }

    // 4. Create projects
    const projectsData = [
      { title: 'Reforma integral en Ruzafa', slug: 'reforma-integral-ruzafa', services: [serviceIds['albanileria-reformas']], coverImage: mediaMap['project-1'], gallery: [{ image: mediaMap['project-1'] }], location: 'Ruzafa, Valencia', completionDate: '2024-03-01', featured: true, status: 'published' as const },
      { title: 'Parquet de roble en ático', slug: 'parquet-roble-atico', services: [serviceIds['instalacion-parquet']], coverImage: mediaMap['project-2'], gallery: [{ image: mediaMap['project-2'] }], location: 'Eixample, Valencia', completionDate: '2024-01-01', featured: true, status: 'published' as const },
      { title: 'Cocina moderna a medida', slug: 'cocina-moderna-medida', services: [serviceIds['montaje-cocinas']], coverImage: mediaMap['project-3'], gallery: [{ image: mediaMap['project-3'] }], location: 'El Carmen, Valencia', completionDate: '2024-02-01', featured: true, status: 'published' as const },
      { title: 'Mueble salón empotrado', slug: 'mueble-salon-empotrado', services: [serviceIds['montaje-muebles']], coverImage: mediaMap['project-4'], gallery: [{ image: mediaMap['project-4'] }], location: 'Benimaclet, Valencia', completionDate: '2023-12-01', featured: true, status: 'published' as const },
      { title: 'Puertas correderas de roble', slug: 'puertas-correderas-roble', services: [serviceIds['rodapies-puertas']], coverImage: mediaMap['project-5'], gallery: [{ image: mediaMap['project-5'] }], location: 'Ciutat Vella, Valencia', completionDate: '2023-11-01', featured: false, status: 'published' as const },
      { title: 'Jardín mediterráneo', slug: 'jardin-mediterraneo', services: [serviceIds['jardineria']], coverImage: mediaMap['project-6'], gallery: [{ image: mediaMap['project-6'] }], location: 'Paterna, Valencia', completionDate: '2023-10-01', featured: false, status: 'published' as const },
    ]

    for (const proj of projectsData) {
      try {
        await payload.create({ collection: 'projects', data: proj })
        results.push(`Project: ${proj.title}`)
      } catch (e: unknown) {
        results.push(`Project error: ${(e as Error).message}`)
      }
    }

    // 5. Create testimonials
    const testimonialsData = [
      { clientName: 'María García', text: 'Increíble trabajo con nuestro parquet. El equipo fue muy profesional y el resultado superó expectativas.', rating: 5, service: serviceIds['instalacion-parquet'], featured: true, status: 'active' as const },
      { clientName: 'Carlos Martínez', text: 'Reformaron nuestro baño completamente y quedó espectacular. Cumplieron plazos y presupuesto.', rating: 5, service: serviceIds['albanileria-reformas'], featured: true, status: 'active' as const },
      { clientName: 'Ana López', text: 'El montaje de la cocina fue impecable. Cada detalle cuidado al milímetro.', rating: 5, service: serviceIds['montaje-cocinas'], featured: true, status: 'active' as const },
      { clientName: 'Pedro Sánchez', text: 'Nos hicieron un mueble a medida para el salón que es una obra de arte.', rating: 5, service: serviceIds['montaje-muebles'], featured: true, status: 'active' as const },
    ]

    for (const test of testimonialsData) {
      try {
        await payload.create({ collection: 'testimonials', data: test })
        results.push(`Testimonial: ${test.clientName}`)
      } catch (e: unknown) {
        results.push(`Testimonial error: ${(e as Error).message}`)
      }
    }

    // 6. Update site config
    try {
      await payload.updateGlobal({
        slug: 'site-config',
        data: {
          companyName: 'piso.lab Valencia',
          phone: '+34 600 000 000',
          email: 'info@pisolab.es',
          address: 'Valencia, España',
          schedule: 'Lunes a Viernes: 9:00 - 19:00\nSábado: 10:00 - 14:00',
          heroTitle: 'Transformamos tu hogar',
          heroSubtitle: 'Reformas integrales, parquet y diseño en Valencia',
          heroCta1Text: 'Solicitar presupuesto',
          heroCta2Text: 'Ver nuestros proyectos',
          aboutTitle: 'Sobre piso.lab',
          stats: [
            { number: '15+', label: 'Años de experiencia' },
            { number: '500+', label: 'Proyectos completados' },
            { number: '98%', label: 'Clientes satisfechos' },
          ],
          whatsapp: { number: '34600000000', message: 'Hola, me interesa solicitar un presupuesto para...' },
          coordinates: { lat: 39.4699, lng: -0.3763 },
          instagram: 'https://instagram.com/pisolab',
          facebook: 'https://facebook.com/pisolab',
        },
      })
      results.push('Site config updated')
    } catch (e: unknown) {
      results.push(`Config error: ${(e as Error).message}`)
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
