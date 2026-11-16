'use client'

import Image from 'next/image'
import { Anchor, ArrowRight, Route, Ship } from 'lucide-react'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'

type ServiceCard = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  icon: LucideIcon
}

const serviceCards: ServiceCard[] = [
  {
    id: 'mainline',
    title: 'Mainline Shipping',
    description:
      'International container shipping across major trade routes, supporting dependable cargo movements and coordinated sailing arrangements.',
    image: '/sealloyd ship 2.jpeg',
    imageAlt: 'Container vessel sailing across the ocean',
    icon: Ship,
  },
  {
    id: 'feeder',
    title: 'Feeder Services',
    description:
      'Connecting regional ports with major shipping hubs through coordinated feeder vessel operations and regional cargo connections.',
    image: '/ocean-freight.jpeg',
    imageAlt: 'Feeder vessel operating at a commercial port',
    icon: Anchor,
  },
  {
    id: 'multimodal',
    title: 'Multimodal Transport',
    description:
      'Coordinated sea, road, rail, and inland transport solutions connecting cargo across regional supply chains.',
    image: '/SeaLloyd Freight Train in Daylight.png',
    imageAlt: 'Multimodal cargo transportation operations',
    icon: Route,
  },
]

function ServiceImage({ image, imageAlt }: Pick<ServiceCard, 'image' | 'imageAlt'>) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative aspect-[16/8.5] overflow-hidden bg-[#e9edf7]">
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#e9edf7,#d9e1f4)]">
          <Ship aria-hidden="true" className="h-10 w-10 text-[#2b3386]/25" strokeWidth={1.2} />
          <span className="sr-only">Image coming soon</span>
        </div>
      ) : (
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 30vw, 340px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

export function ContainerLinerServicesOverview() {
  const scrollToServices = () => {
    document.getElementById('container-liner-service-cards')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <section
      aria-labelledby="services-overview-heading"
      className="bg-[#fbfcff] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-20"
    >
      <div className="mx-auto grid max-w-[1380px] items-center gap-10 lg:grid-cols-[minmax(240px,0.32fr)_minmax(0,0.68fr)] lg:gap-12 xl:gap-16">
        <div className="motion-safe:animate-[services-intro-in_650ms_ease-out_both]">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ef7120] sm:text-xs">
            <span aria-hidden="true" className="h-px w-4 bg-[#ef7120]" />
            Our shipping services
          </p>
          <h2
            id="services-overview-heading"
            className="max-w-sm text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#2b3386] sm:text-4xl"
          >
            Reliable. Flexible. Global.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 sm:text-[15px]">
            From major trade routes to regional connections, Sea Lloyd delivers comprehensive container liner services tailored to your business needs.
          </p>
          <button
            type="button"
            onClick={scrollToServices}
            className="group mt-6 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#ef7120] px-4 py-2 text-xs font-bold text-white shadow-[0_6px_16px_rgba(239,113,32,0.2)] transition-all duration-300 hover:bg-[#d85f12] hover:shadow-[0_8px_22px_rgba(239,113,32,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Explore Our Services
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div id="container-liner-service-cards" className="grid scroll-mt-8 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map(({ id, title, description, image, imageAlt, icon: Icon }, index) => (
            <article
              key={id}
              className="group overflow-hidden rounded-lg border border-[#dfe5f2] bg-white shadow-[0_4px_18px_rgba(43,51,134,0.07)] opacity-0 transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(43,51,134,0.14)] motion-safe:animate-[service-card-in_650ms_ease-out_both]"
              style={{ animationDelay: `${160 + index * 100}ms` }}
            >
              <ServiceImage image={image} imageAlt={imageAlt} />
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-2.5">
                  <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#2b3386] transition-colors duration-300 group-hover:text-[#ef7120]" strokeWidth={1.8} />
                  <div>
                    <h3 className="text-sm font-bold leading-5 text-[#2b3386]">{title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-slate-600">{description}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes services-intro-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes service-card-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
        }
      `}</style>
    </section>
  )
}
