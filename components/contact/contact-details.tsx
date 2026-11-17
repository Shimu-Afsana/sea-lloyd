import { Mail, MapPin, Phone, Printer } from 'lucide-react'
import { contactInfo } from './contact-data'

const detailLink = 'group flex min-w-0 items-start gap-3 text-sm leading-6 text-[#45556c] transition-colors hover:text-[#2b3386]'
const iconStyle = 'mt-0.5 shrink-0 text-[#2b3386] transition-colors group-hover:text-[#ef7120]'

export function ContactDetails() {
  return (
    <section className="py-9 sm:py-12 lg:py-16" aria-labelledby="contact-details-title">
      <p className="text-[10px] font-semibold tracking-[.2em] text-[#ef7120]">WE&apos;RE HERE TO HELP</p>
      <h2 id="contact-details-title" className="mt-2 text-2xl font-semibold tracking-[-.035em] text-[#2b3386] sm:text-3xl">Contact us</h2>
      <div className="mt-4 h-[2px] w-11 bg-[#ef7120]" />
      <p className="mt-1 text-sm font-medium text-[#45556c]">Sea Lloyd — Singapore Main Branch</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        <a className={detailLink} href={contactInfo.directionsUrl} target="_blank" rel="noreferrer">
          <MapPin aria-hidden="true" size={17} className={iconStyle} />
          <span>{contactInfo.address}<span className="mt-1 block text-xs font-medium text-[#2b3386]">Get directions ↗</span></span>
        </a>
        <div className={detailLink}>
          <Phone aria-hidden="true" size={17} className={iconStyle} />
          <span className="flex flex-col gap-1">{contactInfo.phones.map((phone) => <a key={phone} className="hover:text-[#ef7120]" href={`tel:${phone.replaceAll(' ', '')}`}>{phone}</a>)}</span>
        </div>
        <div className={detailLink}>
          <Printer aria-hidden="true" size={17} className={iconStyle} />
          <a href={`tel:${contactInfo.fax.replaceAll(' ', '')}`}>{contactInfo.fax}<span className="ml-2 text-xs text-[#8792a4]">Fax</span></a>
        </div>
        <a className={detailLink} href={`mailto:${contactInfo.email}`}>
          <Mail aria-hidden="true" size={17} className={iconStyle} />
          <span className="break-all">{contactInfo.email}</span>
        </a>
      </div>
    </section>
  )
}
