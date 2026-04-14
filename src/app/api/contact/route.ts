import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactFormSchema.parse(body)

    // Honeypot check
    if (data.honeypot) {
      return NextResponse.json({ success: true }) // Silent fail for bots
    }

    // Save to Payload CMS
    try {
      const { getPayloadClient } = await import('@/lib/payload')
      const payload = await getPayloadClient()

      await payload.create({
        collection: 'contact-messages',
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message || '',
          source: data.source || undefined,
        },
      })
    } catch (cmsError) {
      console.error('CMS save error:', cmsError)
      // Continue even if CMS save fails - we don't want to lose the lead
    }

    // TODO: Send email notifications via Resend when API key is configured
    // - Confirmation email to the user
    // - Notification email to the piso.lab team

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar el formulario' },
      { status: 400 }
    )
  }
}
