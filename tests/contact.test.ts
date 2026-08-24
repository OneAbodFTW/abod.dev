import { describe, expect, test } from 'bun:test'

import { POST } from '@/app/api/contact/route'
import { contactSchema } from '@/lib/contact'

describe('contact form validation', () => {
  test('accepts a complete message', () => {
    const result = contactSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Project enquiry',
      message: 'This message is long enough to pass validation.'
    })

    expect(result.success).toBe(true)
  })

  test('rejects malformed contact details', () => {
    const result = contactSchema.safeParse({
      name: 'A',
      email: 'not-an-email',
      message: 'Too short'
    })

    expect(result.success).toBe(false)
  })

  test('returns 422 before delivery for an invalid request', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
    )

    expect(response.status).toBe(422)
    expect(await response.json()).toMatchObject({
      message: expect.any(String)
    })
  })

  test('returns 400 for malformed JSON', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{bad json'
      })
    )

    expect(response.status).toBe(400)
  })
})
