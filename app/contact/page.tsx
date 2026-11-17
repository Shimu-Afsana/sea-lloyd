import type { Metadata } from 'next'
import { ContactSection } from '@/components/contact/contact-section'

export const metadata: Metadata = {
  title: 'Contact Sea Lloyd | Singapore Maritime & Logistics',
  description: 'Get in touch with Sea Lloyd in Singapore for maritime, logistics, marine and technical service inquiries.',
}

export default function ContactPage() {
  return <ContactSection />
}
