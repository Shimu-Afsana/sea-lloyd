'use client'

import Image from 'next/image'
import { ClipboardList, Container, Network, Ship } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ports = [
  { label: 'CTG', name: 'Chattogram', x: 46, y: 26, lx: 49, ly: 22 },
  { label: 'CMB', name: 'Colombo', x: 25, y: 66, lx: 16, ly: 76 },
  { label: 'PKL', name: 'Port Klang', x: 61, y: 76, lx: 63, ly: 88 },
  { label: 'SIN', name: 'Singapore', x: 78, y: 83, lx: 80, ly: 96 },
]

const capabilities: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Project Cargo Planning', description: 'We consider cargo dimensions, weight, transport requirements, route options, and delivery constraints to support carefully planned project cargo movements.', icon: ClipboardList },
  { title: 'Heavy-Lift Coordination', description: 'Specialized lifting requirements, suitable equipment, vessel capabilities, and cargo handling arrangements are considered when coordinating heavy and oversized shipments.', icon: Ship },
  { title: 'Breakbulk Handling', description: 'We support the coordination of machinery, steel structures, industrial equipment, and other non-containerized cargo requiring appropriate loading, securing, and discharge arrangements.', icon: Container },
  { title: 'Transportation Coordination', description: 'Coordinating relevant transport modes, port activities, shipment documentation, and operational communication to help maintain organized cargo movements.', icon: Network },
]

function PortMap() {
  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-[#2b3386]/10 bg-[#f5f7fc] p-2.5">
      <svg viewBox="0 0 100 100" className="h-28 w-full" role="img" aria-labelledby="cap-map-title cap-map-description">
        <title id="cap-map-title">Sea Lloyd regional port network</title>
        <desc id="cap-map-description">A simplified route connecting Chattogram, Colombo, Port Klang, and Singapore.</desc>
        <path d="M10 9C20 3 31 8 37 17L45 23L53 20L62 27L69 39L65 49L73 56L83 67L90 81L85 89L76 81L67 75L61 63L51 55L42 47L32 39L22 30L14 21Z" fill="#2b3386" fillOpacity=".06" stroke="#2b3386" strokeOpacity=".22" strokeWidth=".55" />
        <path d="M47 26Q35 42 25 66T61 76T78 83" fill="none" stroke="#ef7120" strokeOpacity=".5" strokeWidth=".7" strokeDasharray="2 1.4" />
        {ports.map((port) => (
          <g key={port.label}>
            <circle cx={port.x} cy={port.y} r="3.4" fill="#ef7120" fillOpacity=".14" />
            <circle cx={port.x} cy={port.y} r="1.5" fill="#ef7120" stroke="white" strokeWidth=".7" />
            <text x={port.lx} y={port.ly} fill="#2b3386" fontSize="3.8" fontWeight="700">{port.label}</text>
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 text-[9px] font-semibold uppercase tracking-[.1em] text-[#2b3386]/60">
        {ports.map((port) => <span key={port.label}><span className="mr-1 inline-block size-1.5 rounded-full bg-[#ef7120]" />{port.name}</span>)}
      </div>
    </div>
  )
}

export function BreakbulkCapabilities() {
  return (
    <section className="bg-white px-5 py-20 text-[#2b3386] sm:px-8 sm:py-24 lg:px-12 lg:py-32" aria-labelledby="capabilities-heading">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
                  <h2 id="capabilities-heading" className="max-w-2xl text-[clamp(2.65rem,5vw,4.75rem)] font-extrabold leading-[.96] tracking-[-.055em]">Complex Cargo.<br />Carefully Coordinated.</h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">Sea Lloyd supports project and breakbulk cargo movements through coordinated maritime logistics, thoughtful transportation planning, and careful attention to specialized handling requirements. From oversized industrial equipment to complex non-containerized shipments, we focus on practical solutions designed around each cargo movement.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.58fr_1fr] lg:items-stretch lg:gap-6 xl:mt-16">
          <div className="grid gap-5 sm:grid-cols-2">
            {capabilities.map(({ title, description, icon: Icon }) => (
              <article key={title} className="group flex min-h-[245px] flex-col rounded-xl border border-[#2b3386]/12 bg-[#fbfcff] p-6 shadow-[0_10px_30px_rgba(43,51,134,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ef7120]/50 hover:shadow-[0_18px_40px_rgba(43,51,134,0.11)] sm:p-7">
                <div className="mb-7 grid size-11 place-items-center rounded-full bg-[#e9edff] text-[#ef7120] transition-colors duration-300 group-hover:bg-[#ef7120] group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold leading-tight tracking-[-.02em] sm:text-xl">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-xl bg-[#1b225d] shadow-[0_14px_38px_rgba(43,51,134,0.14)] sm:min-h-[500px] lg:min-h-full">
            <Image src="/Sealloyd-container9.jpeg" alt="Breakbulk cargo vessel and project cargo at a port" fill sizes="(max-width: 1024px) 100vw, 38vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111942]/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#ff9b5e]">Built for complexity</p>
              <p className="mt-2 max-w-xs text-xl font-bold leading-tight">Practical coordination from cargo planning to port delivery.</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="rounded-xl border border-[#2b3386]/12 bg-[#f8faff] p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#ef7120]">01 / Our approach</p>
            <h3 className="mt-4 text-2xl font-bold tracking-[-.03em] sm:text-3xl">Organized around every cargo movement.</h3>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">We bring together cargo requirements, vessel suitability, port capabilities, documentation, and operational communication to help create a clear path for specialized shipments.</p>
          </article>
          <article className="rounded-xl border border-[#2b3386]/12 bg-[#f8faff] p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#ef7120]">02 / Our regional network</p>
            <h3 className="mt-4 text-2xl font-bold tracking-[-.03em] sm:text-3xl">Connected through key gateways.</h3>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">Our regional network highlights important maritime gateways connecting Bangladesh, Sri Lanka, Malaysia, and Singapore.</p>
            <PortMap />
          </article>
        </div>
      </div>
    </section>
  )
}
