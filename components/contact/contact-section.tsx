import { ContactDetails } from './contact-details'
import { ContactForm } from './contact-form'
import { ContactMap } from './contact-map'

export function ContactSection() {
  return (
    <main className="min-h-screen bg-white text-[#45556c]">
      <div className="mx-auto max-w-[1440px] px-0 sm:px-5 lg:px-8">
        <ContactMap />
        <div className="grid gap-2 px-5 sm:px-3 lg:grid-cols-[minmax(0,1fr)_minmax(440px,.92fr)] lg:gap-12 lg:px-7">
          <ContactDetails />
          <ContactForm />
        </div>
      </div>
      <footer className="mx-auto mt-10 flex max-w-[1440px] flex-col gap-2 border-t border-[#edf0f5] px-5 py-5 text-xs text-[#8792a4] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} Sea Lloyd. All rights reserved.</span>
        <span>Singapore · Connecting global maritime trade</span>
      </footer>
    </main>
  )
}
