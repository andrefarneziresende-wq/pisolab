import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

// Helper to create a Lexical richtext document from paragraphs
function makeLexical(blocks: Array<{ type: 'heading' | 'paragraph'; text: string; tag?: string }>) {
  return {
    root: {
      type: 'root',
      children: blocks.map((block) => {
        if (block.type === 'heading') {
          return {
            type: 'heading',
            tag: block.tag || 'h2',
            children: [{ type: 'text', text: block.text, format: 0, mode: 'normal', detail: 0, style: '', version: 1 }],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          }
        }
        return {
          type: 'paragraph',
          children: [{ type: 'text', text: block.text, format: 0, mode: 'normal', detail: 0, style: '', version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          textFormat: 0,
          textStyle: '',
        }
      }),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Disabled in production' }, { status: 403 })
  }

  const payload = await getPayloadClient()

  const privacyPolicy = makeLexical([
    { type: 'heading', text: 'Responsable del tratamiento' },
    { type: 'paragraph', text: 'piso.lab Valencia — Dirección: Valencia, España — Email: info@pisolab.es — Teléfono: +34 600 000 000' },
    { type: 'heading', text: 'Finalidad del tratamiento' },
    { type: 'paragraph', text: 'Los datos personales recogidos a través del formulario de contacto serán tratados con la finalidad de atender su solicitud de presupuesto y mantener comunicación comercial relacionada con nuestros servicios.' },
    { type: 'heading', text: 'Base jurídica' },
    { type: 'paragraph', text: 'El tratamiento de sus datos se basa en el consentimiento otorgado al enviar el formulario de contacto, así como en el interés legítimo de la empresa para responder a sus consultas.' },
    { type: 'heading', text: 'Destinatarios' },
    { type: 'paragraph', text: 'Sus datos no serán cedidos a terceros salvo obligación legal. Utilizamos proveedores de servicios (hosting, email) que actúan como encargados del tratamiento con las garantías adecuadas.' },
    { type: 'heading', text: 'Conservación de datos' },
    { type: 'paragraph', text: 'Los datos se conservarán mientras sea necesario para la finalidad para la que fueron recogidos y durante los plazos legalmente establecidos.' },
    { type: 'heading', text: 'Derechos' },
    { type: 'paragraph', text: 'Puede ejercer sus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición enviando un email a info@pisolab.es. También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).' },
    { type: 'paragraph', text: 'Última actualización: Abril 2024' },
  ])

  const legalNotice = makeLexical([
    { type: 'heading', text: 'Datos identificativos' },
    { type: 'paragraph', text: 'En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informan los siguientes datos del titular del sitio web:' },
    { type: 'paragraph', text: 'Denominación social: piso.lab Valencia — Domicilio: Valencia, España — Email: info@pisolab.es — Teléfono: +34 600 000 000' },
    { type: 'heading', text: 'Objeto' },
    { type: 'paragraph', text: 'El presente sitio web tiene por objeto facilitar información sobre los servicios ofrecidos por piso.lab Valencia, así como permitir la solicitud de presupuestos y contacto directo con la empresa.' },
    { type: 'heading', text: 'Propiedad intelectual' },
    { type: 'paragraph', text: 'Todos los contenidos del sitio web (textos, imágenes, diseño, logotipos, marcas, código fuente) son propiedad de piso.lab Valencia o se utilizan con la debida autorización. Queda prohibida su reproducción sin autorización expresa.' },
    { type: 'heading', text: 'Limitación de responsabilidad' },
    { type: 'paragraph', text: 'piso.lab Valencia no se responsabiliza de los posibles daños o perjuicios derivados de interferencias, omisiones, interrupciones o fallos técnicos en el funcionamiento del sitio web.' },
    { type: 'heading', text: 'Legislación aplicable' },
    { type: 'paragraph', text: 'Las presentes condiciones se rigen por la legislación española. Para cualquier controversia se someterán a los Juzgados y Tribunales de Valencia.' },
    { type: 'paragraph', text: 'Última actualización: Abril 2024' },
  ])

  const cookiePolicy = makeLexical([
    { type: 'heading', text: '¿Qué son las cookies?' },
    { type: 'paragraph', text: 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se utilizan para recordar sus preferencias, mejorar la experiencia de navegación y obtener datos analíticos sobre el uso del sitio.' },
    { type: 'heading', text: 'Cookies necesarias' },
    { type: 'paragraph', text: 'Esenciales para el funcionamiento del sitio web. No requieren consentimiento e incluyen cookies de sesión y de seguridad.' },
    { type: 'heading', text: 'Cookies analíticas' },
    { type: 'paragraph', text: 'Utilizamos Google Analytics para comprender cómo los usuarios interactúan con nuestro sitio web. Estas cookies recopilan información de forma anónima sobre páginas visitadas, tiempo de navegación y fuentes de tráfico.' },
    { type: 'heading', text: 'Cookies de marketing' },
    { type: 'paragraph', text: 'Pueden utilizarse para mostrar publicidad relevante y medir la efectividad de las campañas publicitarias.' },
    { type: 'heading', text: 'Gestión de cookies' },
    { type: 'paragraph', text: 'Puede configurar sus preferencias de cookies a través del banner de consentimiento que aparece al visitar nuestro sitio. También puede configurar su navegador para bloquear o eliminar cookies, aunque esto podría afectar al funcionamiento del sitio.' },
    { type: 'heading', text: 'Más información' },
    { type: 'paragraph', text: 'Para más información sobre nuestra política de privacidad, puede consultar la página de Política de Privacidad. Para cualquier consulta, contacte con nosotros en info@pisolab.es.' },
    { type: 'paragraph', text: 'Última actualización: Abril 2024' },
  ])

  try {
    await payload.updateGlobal({
      slug: 'legal-texts',
      data: {
        privacyPolicy,
        legalNotice,
        cookiePolicy,
      },
    })
    return NextResponse.json({ success: true, message: 'Legal texts populated' })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
