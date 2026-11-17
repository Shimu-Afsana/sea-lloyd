'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle, Send, TriangleAlert } from 'lucide-react'
import { inquiryCategories } from './contact-data'

type FormValues = { firstName: string; lastName: string; email: string; phone: string; message: string }
type FormErrors = Partial<Record<keyof FormValues | 'category', string>>
const initialValues: FormValues = { firstName: '', lastName: '', email: '', phone: '', message: '' }
const inputClass = 'mt-2 min-h-11 w-full rounded-lg border border-[#dce2ec] bg-white px-3.5 py-2.5 text-sm text-[#26324b] outline-none transition placeholder:text-[#9aa4b4] hover:border-[#aeb9cb] focus:border-[#2b3386] focus:ring-4 focus:ring-[#2b3386]/[.08]'

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.firstName.trim()) errors.firstName = 'Please enter your first name.'
  if (!values.lastName.trim()) errors.lastName = 'Please enter your last name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.message.trim()) errors.message = 'Please tell us how we can help.'
  return errors
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [category, setCategory] = useState<(typeof inquiryCategories)[number]>('General')
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status !== 'idle') setStatus('idle')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      setStatus('idle')
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }

    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, category }),
      })
      const result: { error?: string } = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message.')
      }

      setStatus('success')
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus('error')
    }
  }

  return (
    <section className="relative z-10 rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-[0_20px_60px_-24px_rgba(26,38,73,.24)] sm:p-7 lg:-mt-20 lg:p-8" aria-labelledby="contact-form-title">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[.2em] text-[#ef7120]">LET&apos;S TALK</p>
          <h2 id="contact-form-title" className="mt-2 text-xl font-semibold tracking-[-.03em] text-[#2b3386] sm:text-2xl">Get in touch with us.</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#667389]">Tell us about your requirements. Our team will get back to you as soon as possible.</p>
        </div>
        <div className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-[#f5f6fb] text-[#2b3386] sm:flex"><Send aria-hidden="true" size={17} /></div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          {([['firstName', 'First name'], ['lastName', 'Last name']] as const).map(([field, label]) => (
            <div key={field}>
              <label htmlFor={field} className="text-xs font-medium text-[#34425d]">{label} <span className="text-[#ef7120]">*</span></label>
              <input id={field} name={field} autoComplete={field === 'firstName' ? 'given-name' : 'family-name'} className={inputClass} placeholder={`Enter your ${label.toLowerCase()}`} value={values[field]} onChange={(event) => update(field, event.target.value)} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined} />
              {errors[field] && <p id={`${field}-error`} className="mt-1 text-xs text-red-700">{errors[field]}</p>}
            </div>
          ))}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-xs font-medium text-[#34425d]">Your email <span className="text-[#ef7120]">*</span></label>
            <input id="email" name="email" type="email" autoComplete="email" className={inputClass} placeholder="name@company.com" value={values.email} onChange={(event) => update('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <p id="email-error" className="mt-1 text-xs text-red-700">{errors.email}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="text-xs font-medium text-[#34425d]">Your phone <span className="text-[#8792a4]">(optional)</span></label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="Include your country code" value={values.phone} onChange={(event) => update('phone', event.target.value)} />
          </div>
        </div>
        <fieldset className="mt-5">
          <legend className="text-xs font-medium text-[#34425d]">Inquiry purpose <span className="text-[#8792a4]">(optional)</span></legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {inquiryCategories.map((option) => (
              <button key={option} type="button" onClick={() => setCategory(option)} aria-pressed={category === option} className={`min-h-11 rounded-lg border px-2.5 py-2 text-xs leading-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2b3386]/15 ${category === option ? 'border-[#2b3386] bg-[#f5f6fb] font-semibold text-[#2b3386] shadow-[inset_0_-2px_0_#ef7120]' : 'border-[#dce2ec] text-[#56647b] hover:border-[#2b3386]/50 hover:bg-[#fafbfe]'}`}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="mt-5">
          <label htmlFor="message" className="text-xs font-medium text-[#34425d]">Message <span className="text-[#ef7120]">*</span></label>
          <textarea id="message" name="message" rows={4} maxLength={5000} className={`${inputClass} min-h-28 resize-y`} placeholder="Tell us about your inquiry..." value={values.message} onChange={(event) => update('message', event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
          {errors.message && <p id="message-error" className="mt-1 text-xs text-red-700">{errors.message}</p>}
        </div>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="botcheck">Leave this field empty</label><input id="botcheck" name="botcheck" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="mt-5 flex flex-col items-start gap-4 border-t border-[#edf0f5] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#2b3386] px-6 text-sm font-semibold text-white transition duration-200 hover:bg-[#22296d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2b3386]/20 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
            {status === 'sending' ? <><LoaderCircle aria-hidden="true" size={16} className="animate-spin" />Sending your message...</> : <>Send message <ArrowRight aria-hidden="true" size={16} /></>}
          </button>
          <p className="text-xs leading-5 text-[#8792a4]">Your information is shared only with our team.</p>
        </div>
        <div aria-live="polite" role="status" className="mt-4">
          {status === 'success' && <div className="flex items-start gap-2 rounded-lg border border-[#b8ddce] bg-[#f2faf6] p-3 text-sm leading-5 text-[#246847]"><CheckCircle2 aria-hidden="true" size={18} className="mt-0.5 shrink-0" /><span>Thank you! Your message has been sent successfully. Our team will get back to you soon.</span></div>}
          {status === 'error' && <div className="flex items-start gap-2 rounded-lg border border-[#f0c6bd] bg-[#fff7f5] p-3 text-sm leading-5 text-[#9b3d2f]"><TriangleAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0" /><span>We couldn&apos;t send your message. Please try again or contact us directly at <a className="font-semibold underline underline-offset-2" href="mailto:info@sealloyd.com">info@sealloyd.com</a>.</span></div>}
          {status === 'sending' && <p className="sr-only">Sending your message...</p>}
        </div>
      </form>
    </section>
  )
}
