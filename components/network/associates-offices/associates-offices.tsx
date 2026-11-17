'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import worldMap from '@svg-maps/world'
import { ArrowLeft, ArrowRight, Building2, Mail, MapPin, Phone } from 'lucide-react'
import { associatedCountries, type AssociatedCountry, type AssociatedOffice } from '@/app/data/network/associates-offices'

type CountryCardProps = { country: AssociatedCountry; selected: boolean; onSelect: () => void }



function CountrySilhouette({ country }: { country: AssociatedCountry }) {
  const iso2 = {
    bangladesh: 'bd',
    china: 'cn',
    'hong-kong': 'hk',
    india: 'in',
    indonesia: 'id',
    iran: 'ir',
    iraq: 'iq',
    kenya: 'ke',
    kuwait: 'kw',
    malaysia: 'my',
    maldives: 'mv',
    myanmar: 'mm',
    nepal: 'np',
    pakistan: 'pk',
    qatar: 'qa',
    'saudi-arabia': 'sa',
    singapore: 'sg',
    'sri-lanka': 'lk',
    tanzania: 'tz',
    thailand: 'th',
    'united-arab-emirates': 'ae',
    vietnam: 'vn',
  }[country.id] ?? 'bd'

  const selectedLocation = worldMap.locations.find(
    (location: { id: string; path: string }) => location.id === iso2
  )

  const pathRef = useRef<SVGPathElement>(null)
  const [selectedBounds, setSelectedBounds] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const bounds = pathRef.current.getBBox()

    setSelectedBounds({
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
    })
  }, [country.id])

  return (
    <svg
      viewBox={worldMap.viewBox}
      aria-hidden="true"
      className="h-[130px] w-full sm:h-[155px]"
      preserveAspectRatio="xMidYMid meet"
    >
      {worldMap.locations.map((location: { id: string; path: string }) => {
        const isSelected = location.id === iso2

        return (
          <path
            key={location.id}
            ref={isSelected ? pathRef : null}
            d={location.path}
            fill={isSelected ? '#ffffff' : 'rgba(255,255,255,.12)'}
            stroke="rgba(255,255,255,.18)"
            strokeWidth={isSelected ? 1.1 : 0.7}
            strokeLinejoin="round"
            style={{
              transformOrigin: selectedBounds
                ? `${selectedBounds.x + selectedBounds.width / 2}px ${
                    selectedBounds.y + selectedBounds.height / 2
                  }px`
                : 'center',
              transform: isSelected ? 'scale(5.8)' : 'scale(1)',
              transition: 'transform 300ms ease',
            }}
          />
        )
      })}
    </svg>
  )
}



function CountryCard({ country, selected, onSelect }: CountryCardProps) {
  return <button type="button" onClick={onSelect} aria-pressed={selected} aria-label={`${country.name}, ${country.offices.length} offices`} className={`group flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border px-3 py-3 text-left text-white transition-all duration-300 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] sm:px-5 sm:py-4 ${selected ? 'border-[#ef7120] bg-white/[0.12] shadow-xl' : 'border-white/10 bg-white/[0.06]'}`}>
    <CountrySilhouette country={country} />
    <span className="mt-2 flex items-center gap-2.5 sm:mt-3"><span className="text-lg sm:text-xl">{country.flag}</span><span className="flex flex-col"><strong className="text-xs font-semibold sm:text-sm">{country.name}</strong><small className="mt-0.5 text-[10px] text-white/60">{country.offices.length} {country.offices.length === 1 ? 'office' : 'offices'}</small></span></span>
  </button>
}

function CountryMapCarousel({ selected, onSelect }: { selected: AssociatedCountry; onSelect: (country: AssociatedCountry) => void }) {
  const index = associatedCountries.findIndex((country) => country.id === selected.id)
  const selectAt = (position: number) => onSelect(associatedCountries[(position + associatedCountries.length) % associatedCountries.length])
  const visible = [0, 1].map((step) => associatedCountries[(index + step) % associatedCountries.length])
  return <section className="bg-[#2b3386] px-4 pb-7 pt-6 text-white sm:px-6 sm:pb-9 sm:pt-8 lg:px-8" aria-label="Select a country">
    <div className="mx-auto max-w-7xl">
      <header className="mb-6 flex items-start justify-between gap-4 sm:mb-8"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[.22em] text-white/60 sm:text-xs">Sea Lloyd Global Network</p><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">Associated Offices</h1></div><span className="mt-1 shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-medium text-white/85 sm:text-xs">{associatedCountries.reduce((sum, country) => sum + country.offices.length, 0)} locations</span></header>
      <div className="flex items-center gap-2 sm:gap-4"><button className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] sm:size-11" onClick={() => selectAt(index - 1)} aria-label="Previous country"><ArrowLeft size={18} /></button><div className="flex min-w-0 flex-1 gap-3 sm:gap-5 [&>button:nth-child(2)]:hidden sm:[&>button:nth-child(2)]:flex" aria-live="polite">{visible.map((country) => <CountryCard key={country.id} country={country} selected={country.id === selected.id} onSelect={() => onSelect(country)} />)}</div><button className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] sm:size-11" onClick={() => selectAt(index + 1)} aria-label="Next country"><ArrowRight size={18} /></button></div>
      <div className="mx-auto mt-4 flex max-w-28 items-center justify-center gap-2 text-[9px] text-white/55"><span>{String(index + 1).padStart(2, '0')}</span><span className="h-px flex-1 bg-white/20" /><span>{String(associatedCountries.length).padStart(2, '0')}</span></div>
    </div>
  </section>
}

function OfficeCard({ office, country, index }: { office: AssociatedOffice; country: AssociatedCountry; index: number }) {
  const mapUrl = office.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}` : null
  const imageGradient = ['from-[#dfe8f4] via-[#889bb1] to-[#263e5d]', 'from-[#e9e4e4] via-[#9da9b9] to-[#334761]', 'from-[#e4e7ec] via-[#8393a7] to-[#263c57]'][index % 3]
  return <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(21,40,75,.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ef7120]/60 hover:shadow-[0_14px_34px_rgba(27,44,90,.10)]">
    <div className={`relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br ${imageGradient} sm:h-36`} aria-hidden="true"><span className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:34px_34px]" /><span className="relative grid size-12 place-items-center rounded-full border border-white/50 bg-white/20 text-white shadow-lg backdrop-blur-sm"><Building2 size={23} strokeWidth={1.25} /></span><span className="absolute bottom-0 h-8 w-full bg-gradient-to-t from-[#182f51]/45 to-transparent" /></div>
    <div className="flex flex-col gap-3 p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="mb-1 text-[9px] font-bold uppercase tracking-[.16em] text-[#66748a]">{office.officeLocation}</p><h3 className="text-base font-semibold leading-snug text-[#2b3386]">{office.officeLocation.split(' / ')[0]} Office</h3></div><span className="shrink-0 text-lg" aria-label={country.name}>{country.flag}</span></div>
      {office.companyName && <p className="text-xs font-medium leading-5 text-[#45556c]">{office.companyName}</p>}
      {office.address && <div className="flex items-start gap-2 text-xs leading-5 text-[#45556c]"><MapPin size={15} className="mt-0.5 shrink-0 text-[#ef7120]" /><p>{office.address}</p></div>}
      {mapUrl && <a className="flex items-center justify-between gap-2 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-[11px] font-medium text-[#45556c] transition hover:border-[#ef7120]/50" href={mapUrl} target="_blank" rel="noreferrer"><span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-[#ef7120]" />Office location</span><span className="inline-flex items-center gap-1 rounded-md bg-[#2b3386] px-2.5 py-1.5 text-[10px] font-semibold text-white">View map <ArrowRight size={12} /></span></a>}
      {(office.telephoneNumbers.length > 0 || office.email) && <div className="flex flex-col gap-2 border-t border-slate-100 pt-3">{office.telephoneNumbers.map((phone) => <a className="flex items-start gap-2 break-all text-xs leading-5 text-[#45556c] transition-colors hover:text-[#2b3386]" key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}><Phone size={14} className="mt-0.5 shrink-0 text-[#ef7120]" /><span>{phone}</span></a>)}<a className="flex items-start gap-2 break-all text-xs leading-5 text-[#45556c] transition-colors hover:text-[#2b3386]" href={`mailto:${office.email}`}><Mail size={14} className="mt-0.5 shrink-0 text-[#ef7120]" /><span>{office.email}</span></a></div>}
    </div>
  </article>
}

function OfficeDirectory({ country }: { country: AssociatedCountry }) {
  return <section className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14" aria-live="polite"><div className="mx-auto max-w-7xl">
    <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-9 md:flex-row md:items-end md:gap-10"><div><p className="mb-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#ef7120] sm:text-xs">Global representation</p><h2 className="text-2xl font-semibold tracking-tight text-[#2b3386] sm:text-3xl">Our Offices in {country.name}</h2><p className="mt-3 inline-flex rounded-full bg-[#2b3386]/[.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#2b3386]">{country.offices.length} {country.offices.length === 1 ? 'office' : 'offices'} in {country.name}</p></div><p className="max-w-md text-sm leading-6 text-[#45556c] md:pb-1">Explore Sea Lloyd&apos;s associated office locations and regional representatives. Select a country above to access its available office addresses and contact information.</p></div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">{country.offices.map((office, index) => <OfficeCard key={office.id} office={office} country={country} index={index} />)}</div>
    <footer className="mt-10 flex items-center justify-between border-t border-slate-200 pt-5 text-[10px] font-medium uppercase tracking-wider text-[#66748a] sm:mt-14"><span>Sea Lloyd Global Network</span><span>{country.flag} &nbsp;{country.name}</span></footer>
  </div></section>
}

export default function AssociatedOffices() {
  const [selectedCountry, setSelectedCountry] = useState(() => associatedCountries.find((country) => country.id === 'bangladesh') ?? associatedCountries[0])
  return <main><CountryMapCarousel selected={selectedCountry} onSelect={setSelectedCountry} /><OfficeDirectory country={selectedCountry} /></main>
}
