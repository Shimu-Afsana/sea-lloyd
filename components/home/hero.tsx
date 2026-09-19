'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, Search, Ship, X } from 'lucide-react'

const CTA_LABEL = 'Explore Our Services'

const slides = [
  {
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sealloyd%20ship%202-54ZqkCwsS1NLTRO6UolrMavEPbHjFa.jpeg',
    eyebrow: 'OCEAN FREIGHT • GLOBAL REACH',
    title: 'SEALLOYD MADE SHIPPING',
    description: 'Connecting global markets with trusted shipping solutions.',
  },
  {
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-09%20at%2011.07.29%20PM-Ij3qGHeJlGVhiaYpmnBpYIS68tMZcO.jpeg',
    eyebrow: 'SEA LLOYD • TRUSTED CARRIAGE',
    title: 'SEALLOYD MADE SHIPPING',
    description: 'Connecting global markets with trusted shipping solutions.',
  },
  {
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sealloyd%20container%201-t9TRM5MLNP3x3VmuVKyiQcQsZgflD0.jpeg',
    eyebrow: 'CONTAINER LOGISTICS • BUILT TO SCALE',
    title: 'SEALLOYD MADE SHIPPING',
    description: 'Connecting global markets with trusted shipping solutions.',
  },
]

const toolTabs = ['Tracking', 'Schedule', 'Price'] as const
const scheduleModes = ['Point to Point', 'Vessel', 'Port', 'Long Range'] as const
const weekOptions = ['1 Week', '2 Weeks', '3 Weeks', '4 Weeks']
const continents = ['North America', 'Latin America', 'Europe', 'Asia', 'Africa', 'Oceania']

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#2B3386]">
      {label}
      {children}
    </label>
  )
}

function TextInput({ placeholder, value, onChange }: { placeholder: string; value?: string; onChange?: (value: string) => void }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      className="h-12 w-full border border-slate-200 bg-white px-4 text-[15px] font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#EF7120] focus:ring-2 focus:ring-[#EF7120]/15"
    />
  )
}

function SelectField({ value, onChange, children }: { value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full appearance-none border border-slate-200 bg-white px-4 pr-10 text-[15px] font-normal text-slate-800 outline-none focus:border-[#EF7120] focus:ring-2 focus:ring-[#EF7120]/15">
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
}

function SearchButton() {
  return <button type="button" className="inline-flex h-12 items-center justify-center gap-2 bg-[#EF7120] px-7 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#2B3386] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7120] focus-visible:ring-offset-2">Search <ArrowRight className="size-4" /></button>
}

function getToday() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function DateField({ value, min, onChange }: { value: string; min: string; onChange: (value: string) => void }) {
  return <input aria-label="Date" type="date" value={value} min={min} onChange={(event) => onChange(event.target.value)} className="h-12 w-full min-w-0 border border-slate-200 bg-white px-4 text-[15px] font-normal text-[#2B3386] outline-none transition [color-scheme:light] focus:border-[#EF7120] focus:ring-2 focus:ring-[#EF7120]/15" />
}

function ScheduleContent() {
  const [mode, setMode] = useState<(typeof scheduleModes)[number]>('Point to Point')
  const [today] = useState(getToday)
  const [date, setDate] = useState(today)
  const [next, setNext] = useState('2 Weeks')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [vessel, setVessel] = useState('')
  const [port, setPort] = useState('')
  const [from, setFrom] = useState('North America')
  const [to, setTo] = useState('Latin America')
  const [feeder, setFeeder] = useState('Include Feeder')

  return (
    <div className="grid gap-6">
      <div role="tablist" aria-label="Schedule search type" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {scheduleModes.map((item) => (
          <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => setMode(item)} className={`min-h-11 border px-2 text-[11px] font-bold uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7120] ${mode === item ? 'border-[#EF7120] bg-[#EF7120]/5 text-[#EF7120]' : 'border-slate-200 text-[#2B3386] hover:border-[#EF7120]'}`}>{item}</button>
        ))}
      </div>

      {mode === 'Point to Point' && <div className="grid gap-5">
        <Field label="Origin"><TextInput placeholder="Input origin" value={origin} onChange={setOrigin} /></Field>
        <Field label="Destination"><TextInput placeholder="Input destination" value={destination} onChange={setDestination} /></Field>
        <div className="grid gap-5 sm:grid-cols-2"><Field label="Date"><DateField value={date} min={today} onChange={setDate} /></Field><Field label="Next"><SelectField value={next} onChange={setNext}>{weekOptions.map((item) => <option key={item}>{item}</option>)}</SelectField></Field></div>
        <div className="flex justify-end"><SearchButton /></div>
      </div>}

      {mode === 'Vessel' && <div className="grid gap-5"><Field label="Vessel Name"><TextInput placeholder="Search vessel name" value={vessel} onChange={setVessel} /></Field><div className="flex justify-end"><SearchButton /></div></div>}

      {mode === 'Port' && <div className="grid gap-5"><Field label="Port Name"><TextInput placeholder="Search port name" value={port} onChange={setPort} /></Field><div className="grid gap-5 sm:grid-cols-2"><Field label="Date"><DateField value={date} min={today} onChange={setDate} /></Field><Field label="Next"><SelectField value={next} onChange={setNext}>{weekOptions.map((item) => <option key={item}>{item}</option>)}</SelectField></Field></div><fieldset className="grid gap-3"><legend className="text-sm font-semibold text-[#2B3386]">Mode</legend><div className="flex flex-wrap gap-5">{['Include Feeder', 'Ocean Vessel Only'].map((item) => <label key={item} className="flex items-center gap-2 text-sm text-slate-700"><input type="radio" name="mode" value={item} checked={feeder === item} onChange={(event) => setFeeder(event.target.value)} className="size-4 accent-[#EF7120]" />{item}</label>)}</div></fieldset><div className="flex justify-end"><SearchButton /></div></div>}

      {mode === 'Long Range' && <div className="grid gap-5"><Field label="From Continent"><SelectField value={from} onChange={setFrom}>{continents.map((item) => <option key={item}>{item}</option>)}</SelectField></Field><Field label="To Continent"><SelectField value={to} onChange={setTo}>{continents.map((item) => <option key={item}>{item}</option>)}</SelectField></Field><div className="flex justify-end"><SearchButton /></div></div>}
    </div>
  )
}

function ShippingTools() {
  const [tab, setTab] = useState<(typeof toolTabs)[number]>('Tracking')
  const [tracking, setTracking] = useState('')
  return <section className="relative z-10 w-full max-w-[570px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(20,35,90,0.2)] sm:p-7" aria-label="Shipping tools">
    <div role="tablist" aria-label="Shipping tools" className="grid grid-cols-3 border-b border-slate-200">
      {toolTabs.map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={`relative min-h-12 text-xs font-bold uppercase tracking-[0.12em] transition focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7120] ${tab === item ? 'text-[#EF7120] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[#EF7120]' : 'text-[#2B3386] hover:text-[#EF7120]'}`}>{item}</button>)}
    </div>
    <div className="pt-7">
      {tab === 'Tracking' && <div className="grid gap-5"><div><p className="mb-2 text-sm font-semibold text-[#2B3386]">Container, Bill of Lading or Booking Number</p><TextInput placeholder="Enter Container / B/L / Booking Number" value={tracking} onChange={setTracking} /></div><p className="text-xs leading-5 text-slate-500">Track your shipment status with a container, B/L or booking reference.</p><button type="button" className="h-12 bg-[#EF7120] text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#2B3386] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7120] focus-visible:ring-offset-2">Shipment Tracking</button></div>}
      {tab === 'Schedule' && <ScheduleContent />}
      {tab === 'Price' && <div className="grid gap-4 py-8 text-center"><div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#2B3386]/8 text-[#2B3386]"><Ship className="size-6" /></div><h2 className="text-xl font-semibold text-[#2B3386]">Need a price for your transportation?</h2><p className="text-sm text-slate-500">Access our instant quotation module.</p><button type="button" className="mx-auto mt-2 h-12 bg-[#EF7120] px-8 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#2B3386] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7120]">Get a Price</button><small className="text-xs text-slate-400">Prices module for registered customers</small></div>}
    </div>
  </section>
}

export default function Hero() {
  const [active, setActive] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500); return () => window.clearInterval(timer) }, [])
  const slide = slides[active]
  return <section className="relative isolate overflow-hidden bg-[#2B3386] font-sans" aria-label="Sea Lloyd shipping services">
    <div className="absolute inset-0 -z-10">
      {slides.map((item, index) => <div key={item.image} className={`absolute inset-0 bg-cover bg-center transition-all duration-[1400ms] ease-out ${index === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`} style={{ backgroundImage: `url(${item.image})`, backgroundPosition: index === 2 ? 'center 45%' : 'center' }} role="img" aria-label={`Sea Lloyd shipping image ${index + 1}`} />)}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,22,74,0.9)_0%,rgba(22,36,105,0.64)_37%,rgba(21,31,79,0.25)_72%,rgba(14,25,68,0.5)_100%)]" />
    </div>
    <div className="mx-auto grid min-h-[780px] max-w-[1536px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_570px] lg:gap-16 lg:px-14 lg:py-24">
      <div className="max-w-2xl text-white"><div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#EF7120]"><span className="h-px w-10 bg-[#EF7120]" />{slide.eyebrow}</div><h1 key={active} className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">{slide.title}</h1><p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-white/85 sm:text-base">Smarter, Faster &amp; More Reliable</p><p key={`description-${active}`} className="mt-3 max-w-lg text-base leading-7 text-white/80 sm:text-lg">{slide.description}</p><button type="button" className="mt-9 inline-flex min-h-13 items-center gap-3 bg-[#EF7120] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#2B3386] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3386]">{CTA_LABEL}<ArrowRight className="size-4" /></button></div>
      <ShippingTools />
    </div>
    <div className="absolute bottom-7 left-5 flex items-center gap-4 sm:left-8 lg:left-14"><span className="text-xs font-bold tracking-[0.18em] text-white/60">0{active + 1} / 03</span><div className="flex gap-2" role="tablist" aria-label="Hero slides">{slides.map((item, index) => <button key={item.image} type="button" aria-label={`Show slide ${index + 1}`} aria-selected={active === index} onClick={() => setActive(index)} className={`h-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${active === index ? 'w-10 bg-[#EF7120]' : 'w-2 rounded-full border border-white/70 bg-transparent'}`} />)}</div></div>
    <div className="absolute bottom-7 right-5 hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 lg:flex"><span className="size-2 rounded-full bg-[#EF7120]" />Connecting global markets</div>
  </section>
}

export { X }
