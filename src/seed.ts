import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting seed...')

  // 1. Create admin user
  console.log('Creating admin user...')
  let adminUser
  try {
    const existing = await payload.find({ collection: 'users', limit: 1 })
    if (existing.docs.length === 0) {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@pisolab.es',
          password: 'pisolab2024',
          name: 'Admin piso.lab',
          role: 'admin',
        },
      })
      console.log('✅ Admin user created: admin@pisolab.es / pisolab2024')
    } else {
      adminUser = existing.docs[0]
      console.log('⏭️  Admin user already exists')
    }
  } catch (e) {
    console.error('Error creating admin:', e)
  }

  // 2. Upload images as media
  console.log('Uploading media...')
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
      if (!fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping ${img.name} (file not found)`)
        continue
      }
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
      console.log(`✅ Media: ${img.name}`)
    } catch (e: unknown) {
      console.error(`Error uploading ${img.name}:`, (e as Error).message)
    }
  }

  // 3. Create services
  console.log('Creating services...')
  const servicesData = [
    {
      title: 'Instalación de Parquet',
      slug: 'instalacion-parquet',
      subtitle: 'Suelos que hablan de calidad',
      shortDescription: 'Suelos de madera natural, tarima flotante, parquet macizo, lijado y barnizado de suelos existentes.',
      heroImage: mediaMap['parquet'],
      icon: 'hammer',
      order: 1,
      status: 'published' as const,
      seoKeywords: 'parquet valencia, instalación parquet, tarima flotante valencia, suelos madera',
      subservices: [
        { title: 'Parquet macizo de roble, nogal y otras maderas nobles', description: '' },
        { title: 'Tarima flotante de alta gama', description: '' },
        { title: 'Suelo laminado de última generación', description: '' },
        { title: 'Lijado y barnizado de suelos existentes', description: '' },
        { title: 'Restauración de parquet antiguo', description: '' },
        { title: 'Instalación sobre suelo radiante', description: '' },
      ],
      process: [
        { step: 'Evaluación', description: 'Visitamos tu hogar para evaluar el suelo actual y tomar medidas' },
        { step: 'Propuesta', description: 'Te presentamos opciones de materiales y presupuesto detallado' },
        { step: 'Preparación', description: 'Preparamos la superficie para la instalación óptima' },
        { step: 'Instalación', description: 'Colocamos el parquet con precisión y cuidado artesanal' },
        { step: 'Acabado', description: 'Lijado, barnizado y limpieza final del espacio' },
      ],
      faq: [
        { question: '¿Cuánto tiempo tarda la instalación de parquet?', answer: 'Depende de la superficie, pero generalmente entre 2 y 5 días laborables para una vivienda estándar.' },
        { question: '¿Se puede instalar parquet sobre suelo radiante?', answer: 'Sí, utilizamos sistemas y adhesivos especiales compatibles con calefacción por suelo radiante.' },
        { question: '¿Qué mantenimiento necesita el parquet?', answer: 'Recomendamos limpieza regular con productos específicos y un rebarnizado cada 5-7 años según el uso.' },
      ],
    },
    {
      title: 'Rodapiés y Puertas',
      slug: 'rodapies-puertas',
      subtitle: 'Los detalles que marcan la diferencia',
      shortDescription: 'Rodapiés en MDF, madera maciza y lacados. Puertas interiores de madera, correderas, batientes y plegables.',
      heroImage: mediaMap['puertas'],
      icon: 'door-open',
      order: 2,
      status: 'published' as const,
      seoKeywords: 'puertas interiores valencia, rodapiés, puertas madera, puertas correderas',
      subservices: [
        { title: 'Rodapiés de MDF lacado en cualquier color', description: '' },
        { title: 'Rodapiés de madera maciza', description: '' },
        { title: 'Puertas batientes de madera', description: '' },
        { title: 'Puertas correderas empotradas', description: '' },
        { title: 'Puertas plegables', description: '' },
        { title: 'Marcos y guarniciones', description: '' },
      ],
      process: [
        { step: 'Medición', description: 'Tomamos medidas exactas de todos los huecos y estancias' },
        { step: 'Selección', description: 'Te ayudamos a elegir materiales, colores y acabados' },
        { step: 'Fabricación', description: 'Preparamos los elementos a medida si es necesario' },
        { step: 'Instalación', description: 'Montaje profesional con acabados perfectos' },
        { step: 'Revisión', description: 'Verificación del funcionamiento y ajustes finales' },
      ],
      faq: [
        { question: '¿Qué tipo de rodapié recomendáis?', answer: 'Depende del suelo y el estilo. Para parquet recomendamos MDF lacado o madera natural coordinada con el suelo.' },
        { question: '¿Se pueden instalar puertas correderas en cualquier pared?', answer: 'En la mayoría de los casos sí, aunque es necesario verificar que la pared tenga espacio para alojar el sistema de corredera empotrada.' },
      ],
    },
    {
      title: 'Montaje de Cocinas',
      slug: 'montaje-cocinas',
      subtitle: 'El corazón de tu hogar, a medida',
      shortDescription: 'Montaje e instalación de cocinas a medida, modulares y de diseño. Integración de electrodomésticos y encimeras.',
      heroImage: mediaMap['cocinas'],
      icon: 'chef-hat',
      order: 3,
      status: 'published' as const,
      seoKeywords: 'montaje cocinas valencia, cocinas a medida, instalación cocina',
      subservices: [
        { title: 'Montaje de cocinas modulares', description: '' },
        { title: 'Cocinas a medida', description: '' },
        { title: 'Integración de electrodomésticos', description: '' },
        { title: 'Instalación de encimeras', description: '' },
        { title: 'Fontanería y conexiones', description: '' },
        { title: 'Iluminación de cocina', description: '' },
      ],
      process: [
        { step: 'Diseño', description: 'Revisamos el diseño de tu cocina y planificamos la instalación' },
        { step: 'Preparación', description: 'Preparamos el espacio: fontanería, electricidad y nivelación' },
        { step: 'Montaje', description: 'Instalamos los muebles con precisión milimétrica' },
        { step: 'Integración', description: 'Conectamos electrodomésticos, grifo y fregadero' },
        { step: 'Entrega', description: 'Limpieza final y verificación del funcionamiento completo' },
      ],
      faq: [
        { question: '¿Montáis cocinas de cualquier marca?', answer: 'Sí, trabajamos con todas las marcas del mercado: IKEA, Leroy Merlin, cocinas de diseño a medida, etc.' },
        { question: '¿Incluís la fontanería en el montaje?', answer: 'Sí, nos encargamos de las conexiones de agua y desagüe necesarias para la instalación completa.' },
      ],
    },
    {
      title: 'Montaje de Muebles',
      slug: 'montaje-muebles',
      subtitle: 'Diseño y funcionalidad a medida',
      shortDescription: 'Muebles a medida, estanterías, armarios empotrados, muebles de salón, librerías y muebles TV a medida.',
      heroImage: mediaMap['muebles'],
      icon: 'sofa',
      order: 4,
      status: 'published' as const,
      seoKeywords: 'muebles a medida valencia, montaje muebles, armarios empotrados',
      subservices: [
        { title: 'Armarios empotrados a medida', description: '' },
        { title: 'Muebles de salón y TV', description: '' },
        { title: 'Estanterías y librerías', description: '' },
        { title: 'Vestidores', description: '' },
        { title: 'Muebles de baño', description: '' },
        { title: 'Montaje de muebles modulares', description: '' },
      ],
      process: [
        { step: 'Consulta', description: 'Escuchamos tus necesidades y medimos el espacio disponible' },
        { step: 'Diseño', description: 'Creamos un diseño personalizado con materiales de calidad' },
        { step: 'Fabricación', description: 'Fabricamos o preparamos las piezas según el diseño' },
        { step: 'Montaje', description: 'Instalación profesional en tu hogar' },
        { step: 'Acabado', description: 'Ajustes finales y limpieza del espacio' },
      ],
      faq: [
        { question: '¿Hacéis muebles completamente a medida?', answer: 'Sí, diseñamos y fabricamos muebles totalmente personalizados según tus necesidades y el espacio disponible.' },
        { question: '¿Qué materiales utilizáis?', answer: 'Trabajamos con madera maciza, MDF, melamina de alta calidad y otros materiales premium según el proyecto.' },
      ],
    },
    {
      title: 'Albañilería y Reformas',
      slug: 'albanileria-reformas',
      subtitle: 'Transformamos espacios por completo',
      shortDescription: 'Reformas integrales de viviendas, baños, redistribución de espacios, alicatado, solados y acabados.',
      heroImage: mediaMap['reformas'],
      icon: 'hard-hat',
      order: 5,
      status: 'published' as const,
      seoKeywords: 'reformas valencia, reformas integrales, reforma baño valencia',
      subservices: [
        { title: 'Reformas integrales de vivienda', description: '' },
        { title: 'Reformas de baños', description: '' },
        { title: 'Redistribución de espacios', description: '' },
        { title: 'Alicatado y solados', description: '' },
        { title: 'Tabiquería y falsos techos', description: '' },
        { title: 'Impermeabilización', description: '' },
      ],
      process: [
        { step: 'Visita técnica', description: 'Evaluamos el estado actual y tus necesidades' },
        { step: 'Proyecto', description: 'Elaboramos presupuesto detallado y planificación' },
        { step: 'Demolición', description: 'Retiramos los elementos existentes de forma controlada' },
        { step: 'Obra', description: 'Ejecución de la reforma con materiales de primera' },
        { step: 'Acabados', description: 'Pintura, limpieza y entrega del espacio terminado' },
      ],
      faq: [
        { question: '¿Cuánto tarda una reforma integral?', answer: 'Una reforma integral de vivienda suele tardar entre 6 y 12 semanas, dependiendo de la superficie y complejidad.' },
        { question: '¿Gestionáis los permisos necesarios?', answer: 'Sí, nos encargamos de tramitar las licencias y permisos de obra necesarios con el ayuntamiento.' },
      ],
    },
    {
      title: 'Jardinería',
      slug: 'jardineria',
      subtitle: 'Naturaleza viva en tu hogar',
      shortDescription: 'Diseño y mantenimiento de jardines, instalación de césped, sistemas de riego, poda ornamental y paisajismo.',
      heroImage: mediaMap['jardineria'],
      icon: 'trees',
      order: 6,
      status: 'published' as const,
      seoKeywords: 'jardinería valencia, mantenimiento jardines, paisajismo',
      subservices: [
        { title: 'Diseño de jardines', description: '' },
        { title: 'Instalación de césped natural y artificial', description: '' },
        { title: 'Sistemas de riego automático', description: '' },
        { title: 'Poda ornamental y artística', description: '' },
        { title: 'Mantenimiento periódico', description: '' },
        { title: 'Paisajismo y iluminación exterior', description: '' },
      ],
      process: [
        { step: 'Diseño', description: 'Creamos un diseño paisajístico adaptado a tu espacio y gustos' },
        { step: 'Preparación', description: 'Preparamos el terreno y los sistemas necesarios' },
        { step: 'Plantación', description: 'Instalamos plantas, césped y elementos decorativos' },
        { step: 'Riego', description: 'Configuramos el sistema de riego automático' },
        { step: 'Mantenimiento', description: 'Plan de mantenimiento periódico para tu jardín' },
      ],
      faq: [
        { question: '¿Ofrecéis servicio de mantenimiento periódico?', answer: 'Sí, ofrecemos planes de mantenimiento semanal, quincenal o mensual según las necesidades de tu jardín.' },
        { question: '¿Instaláis césped artificial?', answer: 'Sí, instalamos césped artificial de alta calidad que no requiere mantenimiento y mantiene un aspecto natural.' },
      ],
    },
  ]

  const serviceIds: Record<string, number> = {}
  for (const svc of servicesData) {
    try {
      const service = await payload.create({
        collection: 'services',
        data: svc,
      })
      serviceIds[svc.slug] = service.id as number
      console.log(`✅ Service: ${svc.title}`)
    } catch (e: unknown) {
      console.error(`Error creating service ${svc.title}:`, (e as Error).message)
    }
  }

  // 4. Create projects
  console.log('Creating projects...')
  const projectsData = [
    {
      title: 'Reforma integral en Ruzafa',
      slug: 'reforma-integral-ruzafa',
      services: [serviceIds['albanileria-reformas']].filter(Boolean),
      coverImage: mediaMap['project-1'],
      gallery: [{ image: mediaMap['project-1'] }].filter((g) => g.image),
      location: 'Ruzafa, Valencia',
      completionDate: '2024-03-01',
      featured: true,
      status: 'published' as const,
    },
    {
      title: 'Parquet de roble en ático',
      slug: 'parquet-roble-atico',
      services: [serviceIds['instalacion-parquet']].filter(Boolean),
      coverImage: mediaMap['project-2'],
      gallery: [{ image: mediaMap['project-2'] }].filter((g) => g.image),
      location: 'Eixample, Valencia',
      completionDate: '2024-01-01',
      featured: true,
      status: 'published' as const,
    },
    {
      title: 'Cocina moderna a medida',
      slug: 'cocina-moderna-medida',
      services: [serviceIds['montaje-cocinas']].filter(Boolean),
      coverImage: mediaMap['project-3'],
      gallery: [{ image: mediaMap['project-3'] }].filter((g) => g.image),
      location: 'El Carmen, Valencia',
      completionDate: '2024-02-01',
      featured: true,
      status: 'published' as const,
    },
    {
      title: 'Mueble salón empotrado',
      slug: 'mueble-salon-empotrado',
      services: [serviceIds['montaje-muebles']].filter(Boolean),
      coverImage: mediaMap['project-4'],
      gallery: [{ image: mediaMap['project-4'] }].filter((g) => g.image),
      location: 'Benimaclet, Valencia',
      completionDate: '2023-12-01',
      featured: true,
      status: 'published' as const,
    },
    {
      title: 'Puertas correderas de roble',
      slug: 'puertas-correderas-roble',
      services: [serviceIds['rodapies-puertas']].filter(Boolean),
      coverImage: mediaMap['project-5'],
      gallery: [{ image: mediaMap['project-5'] }].filter((g) => g.image),
      location: 'Ciutat Vella, Valencia',
      completionDate: '2023-11-01',
      featured: false,
      status: 'published' as const,
    },
    {
      title: 'Jardín mediterráneo',
      slug: 'jardin-mediterraneo',
      services: [serviceIds['jardineria']].filter(Boolean),
      coverImage: mediaMap['project-6'],
      gallery: [{ image: mediaMap['project-6'] }].filter((g) => g.image),
      location: 'Paterna, Valencia',
      completionDate: '2023-10-01',
      featured: false,
      status: 'published' as const,
    },
  ]

  for (const proj of projectsData) {
    try {
      await payload.create({ collection: 'projects', data: proj })
      console.log(`✅ Project: ${proj.title}`)
    } catch (e: unknown) {
      console.error(`Error creating project ${proj.title}:`, (e as Error).message)
    }
  }

  // 5. Create testimonials
  console.log('Creating testimonials...')
  const testimonialsData = [
    {
      clientName: 'María García',
      text: 'Increíble trabajo con nuestro parquet. El equipo fue muy profesional y el resultado superó nuestras expectativas. Recomendamos piso.lab al 100%.',
      rating: 5,
      service: serviceIds['instalacion-parquet'],
      featured: true,
      status: 'active' as const,
    },
    {
      clientName: 'Carlos Martínez',
      text: 'Reformaron nuestro baño completamente y quedó espectacular. Cumplieron los plazos y el presupuesto. Muy contentos con el resultado.',
      rating: 5,
      service: serviceIds['albanileria-reformas'],
      featured: true,
      status: 'active' as const,
    },
    {
      clientName: 'Ana López',
      text: 'El montaje de la cocina fue impecable. Cada detalle cuidado al milímetro. El equipo de piso.lab es muy atento y resolutivo.',
      rating: 5,
      service: serviceIds['montaje-cocinas'],
      featured: true,
      status: 'active' as const,
    },
    {
      clientName: 'Pedro Sánchez',
      text: 'Nos hicieron un mueble a medida para el salón que es una obra de arte. La calidad de los materiales y el acabado son excepcionales.',
      rating: 5,
      service: serviceIds['montaje-muebles'],
      featured: true,
      status: 'active' as const,
    },
  ]

  for (const test of testimonialsData) {
    try {
      await payload.create({ collection: 'testimonials', data: test })
      console.log(`✅ Testimonial: ${test.clientName}`)
    } catch (e: unknown) {
      console.error(`Error creating testimonial:`, (e as Error).message)
    }
  }

  // 6. Set global site config
  console.log('Setting site config...')
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
        whatsapp: {
          number: '34600000000',
          message: 'Hola, me interesa solicitar un presupuesto para...',
        },
        coordinates: {
          lat: 39.4699,
          lng: -0.3763,
        },
        instagram: 'https://instagram.com/pisolab',
        facebook: 'https://facebook.com/pisolab',
      },
    })
    console.log('✅ Site config updated')
  } catch (e: unknown) {
    console.error('Error updating site config:', (e as Error).message)
  }

  console.log('\n🎉 Seed completed!')
  process.exit(0)
}

seed().catch((e) => {
  console.error('Seed failed:', e)
  process.exit(1)
})
