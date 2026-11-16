'use client'

import Image from 'next/image'
import { ClipboardList, MapPinned, Network, Package, ShieldCheck, Ship } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const PROJECT_CARGO_IMAGE = '/project cargo2.jpg'

type Benefit = {
  id: string
  title: string
  description: string
  Icon: LucideIcon
}

const benefits: Benefit[] = [
  {
    id: 'planning',
    title: 'Project Cargo Planning',
    description: 'Every project cargo movement begins with understanding cargo dimensions, weight, transport requirements, route conditions, and delivery constraints to help coordinate an appropriate logistics plan.',
    Icon: ClipboardList,
  },
  {
    id: 'heavy-lift',
    title: 'Heavy-Lift Coordination',
    description: 'We consider lifting requirements, suitable equipment, vessel capabilities, and loading arrangements when coordinating the movement of heavy and oversized industrial cargo.',
    Icon: Ship,
  },
  {
    id: 'handling',
    title: 'Specialized Cargo Handling',
    description: 'From industrial machinery and generators to fabricated steel structures and project components, we focus on appropriate handling, stowage, and cargo securing considerations.',
    Icon: Package,
  },
  {
    id: 'routes',
    title: 'Route & Port Coordination',
    description: 'We consider transportation routes, port capabilities, loading and discharge requirements, and operational constraints to support carefully coordinated project cargo movements.',
    Icon: MapPinned,
  },
  {
    id: 'safety',
    title: 'Cargo Safety & Risk Management',
    description: 'Cargo weight, stability, handling arrangements, securing requirements, and operational risks receive careful attention throughout the planning and transportation process.',
    Icon: ShieldCheck,
  },
  {
    id: 'multimodal',
    title: 'Multimodal Project Logistics',
    description: 'We coordinate relevant sea, road, rail, and inland transportation arrangements to support connected project cargo movements from origin towards destination.',
    Icon: Network,
  },
]

export function ProjectCargoBenefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageSrc, setImageSrc] = useState(PROJECT_CARGO_IMAGE)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white px-5 py-20 text-[#45556C] sm:px-8 sm:py-24 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] md:items-center md:gap-10 lg:gap-16 xl:gap-24">
          <div className={`max-w-3xl transition-all duration-700 ease-out motion-reduce:transition-none ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'} motion-reduce:translate-y-0 motion-reduce:opacity-100`}>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#ef7120] sm:mb-6">
              Project Cargo Capabilities
            </p>
            <h2 className="text-[clamp(2.3rem,5vw,4.7rem)] font-medium leading-[1.05] tracking-[-0.045em] text-[#2b3386]">
              Driving Complex Project Cargo Movements with Confidence.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#45556C] sm:mt-8 sm:text-lg sm:leading-[1.75]">
              Sea Lloyd supports complex project cargo movements through coordinated maritime logistics, cargo-specific transportation planning, and careful attention to specialized handling requirements. We focus on practical solutions for oversized machinery, heavy industrial equipment, and complex non-containerized shipments.
            </p>
          </div>

          <div className={`group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 shadow-[0_18px_50px_rgba(43,51,134,0.12)] transition-all delay-100 duration-700 ease-out motion-reduce:transition-none ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'} motion-reduce:translate-y-0 motion-reduce:opacity-100`}>
            <Image
              src={imageSrc}
              alt="Project cargo prepared for coordinated maritime transportation"
              fill
              onError={() => setImageSrc('/placeholder.jpg')}
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 38vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
        </div>

        <div className="mt-24 grid gap-x-10 gap-y-20 sm:mt-28 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-24 lg:mt-36 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-28 xl:gap-x-24">
          {benefits.map(({ id, title, description, Icon }, index) => (
            <article
              key={id}
              className={`group text-center transition-all duration-[600ms] ease-out motion-reduce:transition-none ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'} motion-reduce:translate-y-0 motion-reduce:opacity-100`}
              style={{ transitionDelay: `${180 + index * 80}ms` }}
            >
              <Icon aria-hidden="true" strokeWidth={1.7} className="mx-auto size-11 text-[#2b3386] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:text-[#ef7120] sm:size-12 lg:size-14 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0" />
              <h3 className="mt-6 text-xl font-medium leading-tight text-[#2b3386] sm:text-2xl">{title}</h3>
              <p className="mx-auto mt-5 max-w-[24rem] text-base leading-8 text-[#45556C] sm:text-lg sm:leading-[1.75]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
