import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import { contactSchema } from '@/lib/contact'

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      })[character]!
  )

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { message: 'Please send a valid form submission.' },
      { status: 400 }
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          'Please check your name, email, and message, then try sending again.',
        fields: parsed.error.flatten().fieldErrors
      },
      { status: 422 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error('Contact form delivery is not configured.')
    return NextResponse.json(
      {
        message:
          'Email delivery is being configured. Please email hello@abod.dev directly.'
      },
      { status: 503 }
    )
  }

  const { name, email, subject, message } = parsed.data
  const resend = new Resend(apiKey)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[abod.dev] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${safeMessage}</p>`
    })

    if (error) throw new Error(error.message)

    return NextResponse.json({
      message: 'Message received. I’ll get back to you soon.'
    })
  } catch (error) {
    console.error('Contact email failed:', error)
    return NextResponse.json(
      {
        message:
          'The message could not be delivered. Please email hello@abod.dev directly.'
      },
      { status: 502 }
    )
  }
}
