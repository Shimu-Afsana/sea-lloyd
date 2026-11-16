'use client'

import Image from 'next/image'
import { Plane, Ship, TrainFront, Truck, type LucideIcon } from 'lucide-react'
import { useState } from 'react'

const FALLBACK_IMAGE = '/images/multimodal-transport-services/multimodal-hero.png'

type TransportId = 'rail' | 'ocean' | 'air' | 'road'

type TransportOption = {
  id: TransportId
  label: string
  supportingLabel: string
  icon: LucideIcon
  image: string
  objectPosition: string
  heading: string
  description: string
  points: string[]
  highlightTitle: string
  highlightText: string
}

const transportOptions: TransportOption[] = [
  {
    id: 'rail',
    label: 'Rail Transport',
    supportingLabel: 'Efficient inland cargo connections.',
    icon: TrainFront,
    image: '/SeaLloyd Freight Train in Daylight.png',
    objectPosition: 'right center',
    heading: 'Rail Freight Coordination',
    description: 'Sea Lloyd supports coordinated rail transportation as part of integrated cargo movement solutions, connecting inland logistics locations with relevant ports, terminals, and distribution points. Rail transport can help organize long-distance inland cargo movement as part of a wider shipping plan.',
    points: ['Coordinate inland cargo movement between relevant terminals and logistics hubs.', 'Integrate rail transportation with ocean freight and other shipment stages.', 'Support planned cargo handovers and transportation scheduling.'],
    highlightTitle: 'RAIL + MULTIMODAL CONNECTIVITY',
    highlightText: 'Connecting inland cargo movements with wider shipping operations.',
  },
  {
    id: 'ocean',
    label: 'Ocean Freight',
    supportingLabel: 'International maritime transportation.',
    icon: Ship,
    image: '/SeaLloyd Container Ship at Sea.png',
    objectPosition: 'right center',
    heading: 'Ocean Freight Coordination',
    description: 'Sea Lloyd supports international cargo transportation by sea through coordinated shipping arrangements, port operations, and shipment planning. We focus on connecting cargo requirements with suitable maritime transportation options and relevant port facilities.',
    points: ['Coordinate maritime transportation around cargo requirements and applicable vessel schedules.', 'Support port-side cargo coordination and shipment milestones.', "Connect with Sea Lloyd's highlighted maritime gateways."],
    highlightTitle: 'CONNECTED MARITIME NETWORK',
    highlightText: 'Chattogram (CTG) · Colombo · Port Klang · Singapore.',
  },
  {
    id: 'air',
    label: 'Air Freight',
    supportingLabel: 'Time-sensitive cargo transportation.',
    icon: Plane,
    image: '/air freight.jpg',
    objectPosition: 'right center',
    heading: 'Air Freight Coordination',
    description: 'Sea Lloyd considers air transportation options for suitable cargo requiring time-sensitive movement. By coordinating shipment requirements, handling considerations, and relevant transportation arrangements, we support air freight as part of a broader logistics solution.',
    points: ['Assess cargo urgency, shipment characteristics, and destination requirements.', 'Coordinate appropriate handling and shipment documentation.', 'Integrate air transportation with other logistics stages where suitable.'],
    highlightTitle: 'TIME-SENSITIVE CARGO OPTIONS',
    highlightText: 'Supporting shipment planning where transportation speed is an important consideration.',
  },
  {
    id: 'road',
    label: 'Road Transport',
    supportingLabel: 'Flexible inland cargo movement.',
    icon: Truck,
    image: '/seallyod-truck.jpeg',
    objectPosition: 'right center',
    heading: 'Road Transportation Solutions',
    description: 'Sea Lloyd supports coordinated road transportation to connect cargo origins, ports, inland terminals, warehouses, and final destinations. Road transport provides important flexibility within integrated shipping and logistics arrangements.',
    points: ['Coordinate first-mile and last-mile cargo movements.', 'Support inland transportation between ports, terminals, and destinations.', 'Integrate road transport with sea, rail, and air logistics arrangements.'],
    highlightTitle: 'FLEXIBLE INLAND CONNECTIVITY',
    highlightText: 'Connecting cargo movements across the transportation chain.',
  },
]

export function MultimodalTransportTabs() {
  const [activeId, setActiveId] = useState<TransportId>('rail')
  const [imageSrc, setImageSrc] = useState(transportOptions[0].image)
  const activeOption = transportOptions.find((option) => option.id === activeId) ?? transportOptions[0]

  function selectTransport(id: TransportId) {
    const nextOption = transportOptions.find((option) => option.id === id) ?? transportOptions[0]
    setActiveId(id)
    setImageSrc(nextOption.image)
  }

  return (
    <section className="bg-white px-5 py-14 text-[#2b3386] sm:px-8 sm:py-20 lg:px-12 lg:py-24" aria-labelledby="transport-services-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 border-b border-[#e2e8f0] sm:mb-14">
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-2" role="tablist" aria-label="Transport options">
            {transportOptions.map((option) => {
              const Icon = option.icon
              const isActive = activeId === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`transport-panel-${option.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTransport(option.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                      event.preventDefault()
                      const next = transportOptions[(transportOptions.findIndex((item) => item.id === option.id) + 1) % transportOptions.length]
                      selectTransport(next.id)
                    }
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                      event.preventDefault()
                      const index = transportOptions.findIndex((item) => item.id === option.id)
                      selectTransport(transportOptions[(index - 1 + transportOptions.length) % transportOptions.length].id)
                    }
                  }}
                  className="group relative flex min-h-32 flex-col items-center justify-center gap-3 px-2 pb-5 pt-2 text-center transition-colors duration-300 sm:min-h-40 sm:gap-4 sm:pb-7"
                >
                  <Icon className={`size-9 stroke-[1.35] transition-all duration-300 sm:size-12 ${isActive ? 'text-[#ef7120]' : 'text-[#2b3386]/80 group-hover:text-[#ef7120]'}`} aria-hidden="true" />
                  <span className={`text-sm leading-tight transition-all duration-300 sm:text-base ${isActive ? 'font-bold text-[#2b3386]' : 'font-medium text-[#45556C] group-hover:text-[#2b3386]'}`}>{option.label}</span>
                  <span className="hidden text-xs text-[#45556C]/75 lg:block">{option.supportingLabel}</span>
                  <span className={`absolute inset-x-0 bottom-[-1px] h-1 origin-center bg-[#ef7120] transition-transform duration-500 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                </button>
              )
            })}
          </div>
        </div>

        <div id={`transport-panel-${activeOption.id}`} role="tabpanel" aria-labelledby={activeOption.id} className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <div className="relative aspect-[1.38/1] min-h-[260px] overflow-hidden bg-[#f8fafc] sm:aspect-[1.55/1] lg:aspect-[1.18/1] xl:aspect-[1.3/1]">
            <Image
              key={activeOption.id}
              src={imageSrc}
              alt={`${activeOption.label} logistics operation`}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              onError={() => setImageSrc(FALLBACK_IMAGE)}
              className="transport-image-in object-cover"
              style={{ objectPosition: activeOption.objectPosition }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#2b3386]/10 to-transparent" />
          </div>

          <div key={activeOption.id} className="transport-content-in" id="transport-content">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#ef7120]">SEA LLOYD / {activeOption.label.toUpperCase()}</p>
            <h2 id="transport-services-heading" className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#2b3386] sm:text-4xl lg:text-[clamp(2.4rem,4vw,4.4rem)]">{activeOption.heading}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#45556C] sm:text-lg sm:leading-8">{activeOption.description}</p>
            <ul className="mt-7 space-y-4 text-sm leading-6 text-[#45556C] sm:text-base">
              {activeOption.points.map((point) => <li key={point} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ef7120]" aria-hidden="true" />{point}</li>)}
            </ul>
            <div className="mt-9 border-l-2 border-[#ef7120] pl-5 sm:mt-11 sm:pl-6">
              <p className="text-lg font-bold tracking-wide text-[#2b3386] sm:text-xl">{activeOption.highlightTitle}</p>
              <p className="mt-2 max-w-lg text-sm leading-6 text-[#45556C] sm:text-base">{activeOption.highlightText}</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes transport-image-in { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }
        @keyframes transport-content-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .transport-image-in, .transport-content-in { animation: none; } }
      `}</style>
    </section>
  )
}
