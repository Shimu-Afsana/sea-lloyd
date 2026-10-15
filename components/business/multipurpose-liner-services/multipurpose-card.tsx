'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Cog,
  ShipWheel,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

type Feature = {
  id: string
  title: string
  description: string
  details: string | string[]
  image: string
  imageAlt: string
  objectPosition?: string
  icon: LucideIcon
}

const features: Feature[] = [
  {
    id: 'fixed-schedules',
    title: 'Fixed Schedules & Routes',
    description:
      'Ships operate on published timetables and visit predetermined base ports at regular intervals, helping shippers plan with greater confidence and predictability.',
    details:
      'Regular schedules may follow intervals of approximately every 3–4 weeks, depending on the service and route.',
    image: '/fix schedule and routes-multipurpose.png',
    imageAlt:
      'Multipurpose cargo vessel alongside a commercial port terminal',
    icon: CalendarDays,
  },
  {
    id: 'cargo-handling',
    title: 'Versatile Cargo Handling',
    description:
      'Multipurpose vessels accommodate a diverse range of cargo, allowing different cargo types to be transported as part of a coordinated voyage.',
    details: [
      'Containers and standard TEU cargo.',
      'Breakbulk and project cargo, including heavy machinery, wind turbines, generators, and industrial components.',
      'Roll-on/roll-off cargo, including trucks, construction vehicles, and trailers using suitable vessel ramps.',
      'Sailboats and specialized or hazardous goods, subject to appropriate vessel suitability and handling requirements.',
    ],
    image: '/seallyod-truck.jpeg',
    imageAlt:
      'Multipurpose cargo vessel loading mixed cargo at a port',
    icon: ShipWheel,
  },
  {
    id: 'heavy-lift',
    title: 'Heavy-Lift Crane Capability',
    description:
      'Many multipurpose vessels feature onboard heavy-lift cranes to handle oversized, heavy, and project cargo at ports where suitable shore-based lifting equipment may be limited.',
    details:
      'Combined lifting capacities can range from around 100 metric tons to more than 300 metric tons on some vessels, depending on their configuration.',
    image: '/heavy lift cargo.jpg',
    imageAlt:
      'Shipboard crane lifting industrial machinery over a cargo vessel',
    icon: Cog,
  },
  {
    id: 'flexible-port-calls',
    title: 'Flexible Port Calls',
    description:
      'Alongside established base ports, multipurpose liner services can sometimes accommodate calls at secondary or regional ports when cargo volumes and operational conditions justify the additional stop.',
    details:
      'Inducement calls provide added flexibility for specialized cargo movements and changing customer requirements.',
    image: '/sealloyd container 3.jpeg',
    imageAlt:
      'Multipurpose cargo vessel approaching a regional commercial harbor',
    icon: ArrowUpRight,
  },
]

const cardTransitionDelays = [
  'delay-0',
  'delay-100',
  'delay-200',
  'delay-300',
] as const

function FeatureDetails({
  details,
}: {
  details: Feature['details']
}) {
  if (Array.isArray(details)) {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-[#ef7120]">
        {details.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  return (
    <p className="mt-4 text-sm leading-6 text-slate-600">
      {details}
    </p>
  )
}

export default function MultipurposeCard() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="liner-services-title"
      className="relative isolate overflow-hidden bg-white text-slate-900"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-10 px-5 py-14 sm:px-8 sm:py-16 md:gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.6fr)] lg:gap-14 lg:px-10 lg:py-20 xl:gap-20 xl:px-14 xl:py-24">
       
        <div
          className={`w-full transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'
          }`}
        >
          <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#2b3386]">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-[#ef7120]"
            />
            Sea Lloyd Services
          </div>

          <h1
            id="liner-services-title"
            className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#2b3386] sm:text-4xl lg:text-[2.65rem] xl:text-5xl"
          >
            Multipurpose Liner Services
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Flexible shipping solutions for diverse cargo, combining
            dependable schedules, versatile cargo handling, and adaptable
            port operations to support complex transportation requirements.
          </p>

          <div
            aria-hidden="true"
            className="mt-8 h-px w-20 bg-[#ef7120]"
          />

          <p className="mt-5 text-sm font-medium tracking-wide text-slate-500">
            Moving complexity with clarity.
          </p>
        </div>

      
        <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-10">
          {features.map(
            (
              {
                id,
                title,
                description,
                details,
                image,
                imageAlt,
                objectPosition,
                icon: Icon,
              },
              index,
            ) => (
              <article
                key={id}
                className={`group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-[opacity,transform,box-shadow,border-color] duration-700 ease-out hover:border-[#2b3386]/25 hover:shadow-lg motion-reduce:translate-y-0 motion-reduce:transition-none ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-5 opacity-0'
                } ${cardTransitionDelays[index]}`}
              >
               
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 31vw"
                    priority={index < 2}
                    style={{
                      objectPosition: objectPosition ?? 'center',
                    }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
                  />

                 
                  <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-white/95 text-[#2b3386] shadow-sm backdrop-blur-sm transition-colors duration-300 group-hover:text-[#ef7120] motion-reduce:transition-none">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.7}
                    />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-5 lg:p-6">
                  <h2 className="text-xl font-semibold leading-snug tracking-tight text-[#2b3386] transition-colors duration-300 group-hover:text-[#ef7120] sm:text-lg xl:text-xl">
                    {title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {description}
                  </p>

                  <FeatureDetails details={details} />

                  <a
                    href="#contact"
                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#2b3386] transition-colors duration-300 hover:text-[#ef7120] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b3386]"
                  >
                    Explore service
                    <ChevronRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </a>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export { features }
