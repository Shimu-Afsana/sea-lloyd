import type { LucideIcon } from 'lucide-react'
import {
  Box,
  Container,
  FileText,
  Globe2,
  Network,
  Route,
  Ship,
  Truck,
  Warehouse,
} from 'lucide-react'

type LogisticsService = {
  id: string
  title: string
  category: string
  description: string
  icon: LucideIcon
}

const firstRow: LogisticsService[] = [
  {
    id: 'ocean-freight',
    title: 'Ocean Freight Coordination',
    category: 'OCEAN FREIGHT',
    description: 'Coordinate international ocean cargo movements through planned shipping arrangements, carrier coordination, and organized shipment milestones.',
    icon: Ship,
  },
  {
    id: 'multimodal-transport',
    title: 'Multimodal Transport Solutions',
    category: 'INTEGRATED TRANSPORT',
    description: 'Connect sea, road, rail, and inland waterway transport options to support coordinated cargo movement across different stages of the supply chain.',
    icon: Network,
  },
  {
    id: 'port-terminal',
    title: 'Port & Terminal Coordination',
    category: 'PORT OPERATIONS',
    description: 'Coordinate cargo handling, terminal activities, port operations, and shipment handovers to support organized logistics movements.',
    icon: Container,
  },
  {
    id: 'customs-documentation',
    title: 'Customs & Documentation Support',
    category: 'CROSS-BORDER LOGISTICS',
    description: 'Coordinate relevant shipment information and documentation requirements to help support smoother international cargo movements.',
    icon: FileText,
  },
]

const secondRow: LogisticsService[] = [
  {
    id: 'warehousing-distribution',
    title: 'Warehousing & Distribution',
    category: 'CARGO MANAGEMENT',
    description: 'Support cargo storage, consolidation, inventory coordination, and onward distribution through organized logistics arrangements.',
    icon: Warehouse,
  },
  {
    id: 'project-breakbulk',
    title: 'Project & Breakbulk Cargo',
    category: 'SPECIALIZED CARGO',
    description: 'Coordinate logistics requirements for oversized, heavy, non-containerized, and specialized cargo requiring careful transportation planning.',
    icon: Truck,
  },
  {
    id: 'shipment-planning',
    title: 'Shipment Planning & Coordination',
    category: 'END-TO-END PLANNING',
    description: 'Coordinate shipment milestones, transport arrangements, and communication to help customers maintain clarity throughout the logistics journey.',
    icon: Route,
  },
  {
    id: 'agency-network',
    title: 'Global Agency Network',
    category: 'GLOBAL CONNECTIVITY',
    description: 'Connect with international office locations and agency partners to coordinate regional cargo movements and support cross-border logistics operations.',
    icon: Globe2,
  },
]

function ServiceCard({ service }: { service: LogisticsService }) {
  const Icon = service.icon

  return (
    <article className="flex min-h-[270px] w-[min(82vw,520px)] shrink-0 flex-col rounded-[22px] border border-[#ef7120]/25 bg-white p-6 shadow-[0_16px_35px_rgba(43,51,134,0.09)] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[290px] sm:p-8 md:w-[min(64vw,500px)] lg:w-[500px]">
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-[#2b3386]/10 bg-[#f2f4ff] text-[#2b3386] shadow-inner sm:size-16">
          <Icon aria-hidden="true" className="size-7 stroke-[1.7] sm:size-8" />
        </div>
        <div className="min-w-0 pt-1">
          <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-[#2b3386] sm:text-2xl">
            {service.title}
          </h3>
          <p className="mt-2 text-[11px] font-bold tracking-[0.16em] text-[#ef7120] sm:text-xs">
            {service.category}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-1 items-end">
        <p className="max-w-[430px] text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-7">
          {service.description}
        </p>
      </div>
      <div className="mt-5 h-px w-12 bg-[#ef7120]" aria-hidden="true" />
    </article>
  )
}

function MarqueeRow({ services, direction }: { services: LogisticsService[]; direction: 'left' | 'right' }) {
  const animationClass = direction === 'left' ? 'logistics-marquee-left' : 'logistics-marquee-right'

  return (
    <div className="overflow-hidden" aria-label={`${direction === 'left' ? 'Left-moving' : 'Right-moving'} logistics services`}>
      <div className={`flex w-max gap-5 px-3 sm:gap-8 sm:px-6 lg:gap-9 ${animationClass}`}>
        <div className="flex shrink-0 gap-5 sm:gap-8 lg:gap-9">
          {services.map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
        <div className="flex shrink-0 gap-5 sm:gap-8 lg:gap-9" aria-hidden="true">
          {services.map((service) => <ServiceCard key={`${service.id}-duplicate`} service={service} />)}
        </div>
      </div>
    </div>
  )
}

export function GlobalLogisticsMarquee() {
  return (
    <section className="overflow-hidden bg-[#fbfcff] py-20 text-[#2b3386] sm:py-24 lg:py-28" aria-labelledby="global-logistics-services-heading">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#ef7120]">Sea Lloyd Services</p>
        <h2 id="global-logistics-services-heading" className="text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#2b3386]">
          Global Logistics, Connected Around the World
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
          Discover how Sea Lloyd coordinates international cargo movements through flexible transport solutions, dependable logistics planning, and connected global operations.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-7 sm:mt-20 sm:gap-9 lg:mt-24">
        <MarqueeRow services={firstRow} direction="left" />
        <MarqueeRow services={secondRow} direction="right" />
      </div>

      <style>{`\n        @keyframes logistics-marquee-left {\n          from { transform: translateX(0); }\n          to { transform: translateX(calc(-50% - 1.125rem)); }\n        }\n        @keyframes logistics-marquee-right {\n          from { transform: translateX(calc(-50% - 1.125rem)); }\n          to { transform: translateX(0); }\n        }\n        .logistics-marquee-left { animation: logistics-marquee-left 48s linear infinite; }\n        .logistics-marquee-right { animation: logistics-marquee-right 52s linear infinite; }\n        @media (max-width: 640px) {\n          .logistics-marquee-left { animation-duration: 44s; }\n          .logistics-marquee-right { animation-duration: 48s; }\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .logistics-marquee-left, .logistics-marquee-right { animation-play-state: paused; transform: none; }\n        }\n      `}</style>
    </section>
  )
}
