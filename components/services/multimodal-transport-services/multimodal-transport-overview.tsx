'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowUpRight,
  Boxes,
  Plane,
  Ship,
  ShipWheel,
  TrainFront,
  Truck,
  type LucideIcon,
} from 'lucide-react'

const PROJECT_CARGO_IMAGE = '/images/multimodal-transport-services/project-cargo-feature.jpg'
const PROJECT_CARGO_IMAGE_POSITION = 'center 50%'

type Capability = {
  id: string
  number: string
  category: string
  title: string
  description: string
  highlights: string[]
  icon: LucideIcon
  featured?: boolean
}

const capabilities: Capability[] = [
  {
    id: 'rail', number: '01', category: 'INLAND CONNECTIVITY', title: 'Rail Freight Coordination',
    description: 'Sea Lloyd supports coordinated rail transportation for suitable cargo movements, connecting inland logistics locations, commercial terminals, and relevant port operations as part of an integrated shipping arrangement.',
    highlights: ['Inland cargo connectivity', 'Rail-to-port coordination', 'Organized terminal handovers'], icon: TrainFront,
  },
  {
    id: 'ocean', number: '02', category: 'MARITIME CONNECTIVITY', title: 'Ocean Freight Solutions',
    description: 'Sea Lloyd coordinates maritime cargo transportation by considering vessel suitability, cargo requirements, relevant port operations, and shipment planning to support organized international shipping movements.',
    highlights: ['International sea transportation', 'Vessel and port coordination', 'Container and specialized cargo arrangements'], icon: Ship,
  },
  {
    id: 'air', number: '03', category: 'TIME-SENSITIVE LOGISTICS', title: 'Air Freight Coordination',
    description: 'Sea Lloyd considers suitable air freight options for cargo with time-sensitive transportation requirements, with attention to shipment characteristics, cargo eligibility, handling considerations, and destination coordination.',
    highlights: ['Time-sensitive cargo planning', 'Airport cargo coordination', 'Connected logistics arrangements'], icon: Plane,
  },
  {
    id: 'road', number: '04', category: 'INLAND DISTRIBUTION', title: 'Road Transportation',
    description: 'Sea Lloyd supports coordinated road transportation connecting cargo origins, commercial ports, inland terminals, warehouses, and delivery destinations as part of an integrated logistics plan.',
    highlights: ['First-mile connectivity', 'Last-mile cargo movement', 'Port and terminal transportation'], icon: Truck,
  },
  {
    id: 'project-cargo', number: '05', category: 'SPECIALIZED CARGO LOGISTICS', title: 'Project Cargo & Heavy Equipment',
    description: 'From oversized industrial machinery and heavy equipment to specialized non-containerized cargo, Sea Lloyd focuses on cargo-specific planning and coordinated transportation arrangements across suitable logistics modes.',
    highlights: ['Oversized industrial cargo', 'Heavy equipment coordination', 'Specialized transportation planning'], icon: Boxes, featured: true,
  },
  {
    id: 'integrated-planning', number: '06', category: 'CONNECTED SUPPLY CHAIN', title: 'One Coordinated Logistics Approach',
    description: 'Sea Lloyd considers the cargo, route, schedule, handling requirements, and transportation stages together to coordinate suitable combinations of rail, ocean, air, and road transportation.',
    highlights: ['Cargo-specific planning', 'Coordinated transportation stages', 'Connected shipment handovers'], icon: ShipWheel,
  },
]

const transportModes = [
  { label: 'Rail', icon: TrainFront },
  { label: 'Ocean', icon: Ship },
  { label: 'Air', icon: Plane },
  { label: 'Road', icon: Truck },
]

function ProjectCargoImage() {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <div className="group/image relative aspect-[1.9/1] overflow-hidden bg-[#f8fafc]">
      {!hasImageError ? (
        <Image
          src={PROJECT_CARGO_IMAGE}
          alt="Project cargo and heavy equipment transportation"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/image:scale-[1.035]"
          style={{ objectPosition: PROJECT_CARGO_IMAGE_POSITION }}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#2b3386]/55" aria-label="Project Cargo image placeholder">
          <Boxes className="size-10 stroke-[1.2] sm:size-12" aria-hidden="true" />
          <span className="text-[10px] font-semibold tracking-[0.18em]">PROJECT CARGO</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#2b3386]/10 to-transparent" />
    </div>
  )
}

export function MultimodalTransportOverview() {
  return (
    <section className="overflow-hidden bg-white px-5 py-16 text-[#2b3386] sm:px-8 sm:py-20 lg:px-12 lg:py-24" aria-labelledby="multimodal-overview-title">
      <div className="mx-auto max-w-[1440px]">
        <header className="grid gap-7 pb-10 sm:pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16 lg:pb-16">
          <div className="animate-[overview-rise_650ms_cubic-bezier(.22,1,.36,1)_both]">
            <span className="mt-5 block h-[3px] w-12 bg-[#ef7120]" aria-hidden="true" />
            <h1 id="multimodal-overview-title" className="mt-5 max-w-3xl text-[clamp(2.5rem,2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[#2b3386]">
              Beyond Transport.<br /><span className="text-[#ef7120]">Connected Logistics.</span>
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#45556C] sm:text-lg sm:leading-8 lg:pb-1">
            Every shipment has its own transportation requirements. Sea Lloyd brings together rail, ocean, air, and road transportation options through coordinated logistics planning, helping businesses move cargo between origins, ports, terminals, and destinations with greater clarity.
          </p>
        </header>

        <div className="mb-8 flex items-center gap-3 overflow-x-auto border-y border-[#e2e8f0] py-4 sm:mb-10 sm:gap-5 sm:py-5" aria-label="Transportation modes available according to shipment requirements">
          <span className="shrink-0 text-[10px] font-bold tracking-[0.16em] text-[#45556C] sm:text-xs">CONNECTED OPTIONS</span>
          <span className="h-px min-w-3 flex-1 bg-[#e2e8f0]" aria-hidden="true" />
          {transportModes.map(({ label, icon: Icon }, index) => (
            <div key={label} className="flex shrink-0 items-center gap-2 text-[#2b3386] sm:gap-3">
              <Icon className="size-4 text-[#ef7120] sm:size-[18px]" strokeWidth={1.7} aria-hidden="true" />
              <span className="text-xs font-medium sm:text-sm">{label}</span>
              {index < transportModes.length - 1 && <span className="ml-1 text-xs text-[#45556C]/50" aria-hidden="true">/</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {capabilities.map(({ id, number, category, title, description, highlights, icon: Icon, featured }, index) => (
            <article
              key={id}
              className={`group flex min-h-full flex-col border border-[#e2e8f0] bg-white shadow-[0_8px_28px_-24px_rgba(43,51,134,0.36)] transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:border-[#2b3386]/25 hover:shadow-[0_18px_42px_-26px_rgba(43,51,134,0.35)] motion-reduce:transform-none motion-reduce:transition-none ${featured ? 'overflow-hidden' : 'p-6 sm:p-7 lg:p-8'}`}
              style={{ animation: 'overview-rise 650ms cubic-bezier(.22,1,.36,1) both', animationDelay: `${120 + index * 85}ms` }}
            >
              {featured && <ProjectCargoImage />}
              <div className={`flex flex-1 flex-col ${featured ? 'p-6 sm:p-7 lg:p-8' : ''}`}>
                <div className="mb-7 flex items-center justify-between sm:mb-8">
                  <span className="text-xs font-bold tracking-[0.12em] text-[#ef7120]">{number}</span>
                  <span className="text-[9px] font-semibold tracking-[0.15em] text-[#45556C]/70 sm:text-[10px]">{category}</span>
                </div>
                {!featured && (
                  <div className="mb-6 flex size-12 items-center justify-center text-[#2b3386] transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:text-[#ef7120] sm:mb-7 sm:size-14" aria-hidden="true">
                    <Icon className="size-10 stroke-[1.35] transition-colors duration-500 sm:size-12" />
                  </div>
                )}
                <h2 className="max-w-sm text-xl font-semibold leading-tight tracking-[-0.025em] text-[#2b3386] sm:text-2xl">{title}</h2>
                <p className="mt-4 text-sm leading-6 text-[#45556C] sm:text-[15px] sm:leading-[1.7]">{description}</p>
                <ul className="mt-5 space-y-2.5 border-t border-[#e2e8f0] pt-4 sm:mt-6 sm:pt-5">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-xs leading-5 text-[#45556C] sm:text-[13px]">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#ef7120]" aria-hidden="true" />{highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex justify-end pt-5" aria-hidden="true">
                  <ArrowUpRight className="size-4 text-[#2b3386]/45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ef7120]" strokeWidth={1.7} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes overview-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { :global(*) { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; } }
      `}</style>
    </section>
  )
}
