import { Mail, MapPin, Phone, Printer } from 'lucide-react'
import type { NetworkOffice } from '@/app/data/network/network-offices'

function DetailRow({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3.5 border-b border-[#e2e8f0] py-4 last:border-0 last:pb-0 sm:py-[18px]">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2b3386]/[.07] text-[#2b3386] transition-colors group-hover:bg-[#ef7120]/10 group-hover:text-[#ef7120]"><Icon size={17} strokeWidth={1.8} /></span>
      <div className="min-w-0"><p className="text-[10px] font-bold tracking-[.16em] text-[#45556C]/70">{label}</p><div className="mt-1.5 space-y-1 text-sm leading-6 text-[#45556C] sm:text-[15px]">{children}</div></div>
    </div>
  )
}

export function OfficeDetails({ office }: { office: NetworkOffice }) {
  return (
    <section className="bg-[#f8fafc] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
      <div className="mx-auto max-w-[1344px]">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-12">
          <div><p className="text-[11px] font-bold tracking-[.23em] text-[#ef7120]">GLOBAL REPRESENTATION</p><h2 className="mt-3 text-[30px] font-semibold leading-tight tracking-[-.04em] text-[#2b3386] sm:text-4xl lg:text-[46px]">Our Main Office in {office.country}</h2></div>
          <p className="max-w-[440px] text-sm leading-6 text-[#45556C] sm:text-base sm:leading-7">Connect with Sea Lloyd&apos;s main Singapore office for regional coordination, business enquiries, and shipping-related communication.</p>
        </div>
        <article className="mt-8 overflow-hidden rounded-[22px] border border-[#e2e8f0] bg-white shadow-[0_16px_45px_rgba(43,51,134,.07)] sm:mt-10 lg:mt-12">
          <div className="grid lg:grid-cols-[.95fr_1.05fr]">
            <div className="relative overflow-hidden bg-[#2b3386] p-6 text-white sm:p-9 lg:p-11">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/[.09]"/><div className="absolute -right-7 -top-7 h-36 w-36 rounded-full border border-white/[.09]"/>
              <div className="relative flex h-full flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ef7120] text-white shadow-lg shadow-black/10"><MapPin size={20} /></span>
                <p className="mt-7 text-[10px] font-bold tracking-[.2em] text-white/60">OFFICE ADDRESS</p>
                <h3 className="mt-3 max-w-md text-xl font-semibold leading-snug sm:text-2xl">{office.name}</h3>
                <address className="mt-3 max-w-sm text-sm not-italic leading-7 text-white/75 sm:text-base">{office.address}</address>
                <div className="mt-auto pt-8"><span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-3 py-2 text-[9px] font-bold tracking-[.15em] text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-[#ef7120]"/>{office.country.toUpperCase()} · {office.role}</span></div>
              </div>
            </div>
            <div className="px-5 py-2 sm:px-9 sm:py-3 lg:px-11 lg:py-5">
              <DetailRow icon={Phone} label="TELEPHONE">{office.phones.map((phone) => <a className="block w-fit font-medium text-[#2b3386] underline-offset-4 hover:text-[#ef7120] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef7120]" href={`tel:${phone.replace(/[^+\d]/g, '')}`} key={phone}>{phone}</a>)}</DetailRow>
              {office.fax && <DetailRow icon={Printer} label="FAX"><span>{office.fax}</span></DetailRow>}
              <DetailRow icon={Mail} label="EMAIL"><a className="break-all font-medium text-[#2b3386] underline-offset-4 hover:text-[#ef7120] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef7120]" href={`mailto:${office.email}`}>{office.email}</a></DetailRow>
            </div>
          </div>
        </article>
        <p className="mt-5 text-center text-[10px] tracking-[.12em] text-[#45556C]/55">SEA LLOYD · SINGAPORE MAIN BRANCH</p>
      </div>
    </section>
  )
}
