'use client'

import { useState, type FormEvent } from 'react'

type FormStatus =
  | { state: 'idle'; message: '' }
  | { state: 'loading'; message: string }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string }

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({
    state: 'idle',
    message: ''
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ state: 'loading', message: 'Sending your message…' })

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(result.message || 'The message could not be sent.')
      }

      form.reset()
      setStatus({
        state: 'success',
        message:
          result.message || 'Message received. I’ll get back to you soon.'
      })
    } catch (error) {
      setStatus({
        state: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Email hello@abod.dev instead.'
      })
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@company.com"
            required
          />
        </label>
      </div>

      <label>
        <span>
          Subject <small>(optional)</small>
        </span>
        <input
          type="text"
          name="subject"
          maxLength={120}
          placeholder="What should we talk about?"
        />
      </label>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          minLength={20}
          maxLength={4000}
          rows={7}
          placeholder="A little context goes a long way."
          required
        />
      </label>

      <div className="form-submit-row">
        <button type="submit" disabled={status.state === 'loading'}>
          <span>
            {status.state === 'loading' ? 'Transmitting…' : 'Send transmission'}
          </span>
          <span aria-hidden="true">↗</span>
        </button>
        <p
          className={`form-status form-status-${status.state}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      </div>
    </form>
  )
}
