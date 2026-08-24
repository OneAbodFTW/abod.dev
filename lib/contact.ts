import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().max(120).optional().default('Portfolio enquiry'),
  message: z.string().trim().min(20).max(4000)
})

export type ContactInput = z.infer<typeof contactSchema>
