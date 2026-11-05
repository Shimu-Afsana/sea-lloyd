'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type CharteringService = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  objectPosition: string
  href: string
}

const charteringServices: CharteringService[] = [
  {
    id: 'container-chartering',
    title: 'Container Chartering',
    description: 'Sea Lloyd supports container vessel chartering arrangements, helping connect cargo requirements with suitable vessel options. We consider cargo volumes, trading routes, vessel availability, and schedule requirements to support practical and dependable shipping arrangements.',
    image: '/sealloyd container 3.jpeg',
    imageAlt: 'Container vessel sailing across the ocean',
    objectPosition: 'center',
    href: '#container-chartering',
  },
  {
    id: 'tanker-chartering',
    title: 'Tanker Chartering',
    description: 'We coordinate tanker chartering requirements for liquid cargo movements, considering cargo specifications, vessel suitability, trading routes, port requirements, and operational considerations. Every arrangement begins with understanding the specific needs of the shipment.',
    image: '/Tanker chartering.jpg',
    imageAlt: 'Tanker vessel sailing across deep blue ocean water',
    objectPosition: 'center',
    href: '#tanker-chartering',
  },
  {
    id: 'bulk-carrier-chartering',
    title: 'Bulk Carrier Chartering',
    description: 'Sea Lloyd supports chartering arrangements for dry bulk cargo, helping evaluate suitable vessel options according to cargo type, shipment volume, loading and discharge ports, and voyage requirements.',
    image: '/project-cargo3.jpg',
    imageAlt: 'Bulk carrier vessel transporting dry bulk cargo',
    objectPosition: 'center',
    href: '#bulk-carrier-chartering',
  },
  {
    id: 'project-heavy-lift-chartering',
    title: 'Project & Heavy-Lift Vessel Chartering',
    description: 'For oversized and heavy project cargo, we help coordinate suitable vessel options and chartering requirements based on cargo dimensions, weight, lifting arrangements, port capabilities, and route considerations.',
    image: '/heavy lift cargo.jpg',
    imageAlt: 'Heavy-lift cargo vessel carrying industrial project equipment',
    objectPosition: 'center',
    href: '#project-heavy-lift-chartering',
  },
  {
    id: 'breakbulk-chartering',
    title: 'Breakbulk Vessel Chartering',
    description: 'We support vessel chartering arrangements for non-containerized cargo, including machinery, steel products, industrial equipment, and other breakbulk shipments. Particular attention is given to cargo handling, stowage, securing, and port coordination requirements.',
    image: '/sealloyd ship 2.jpeg',
    imageAlt: 'Breakbulk vessel carrying industrial machinery at a commercial port',
    objectPosition: 'center',
    href: '#breakbulk-chartering',
  },
]

function ImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#eef2f8] text-center" role="img" aria-label={`${title} image placeholder`}>
      <div className="px-6 text-[#2b3386]/55">
        <div className="mx-auto mb-3 h-10 w-14 rounded-md border-2 border-current opacity-50" />
        <p className="text-xs font-semibold uppercase tracking-[0.14em]">Add service photograph</p>
      </div>
    </div>
  )
}

function ServiceRow({ service, index }: { service: CharteringService; index: number }) {
  const rowRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.16 })
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={rowRef}
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className={`group grid overflow-hidden border border-[#e5e9f2] bg-white shadow-[0_18px_45px_-34px_rgba(43,51,134,0.7)] transition-[opacity,transform,box-shadow] duration-700 ease-out hover:shadow-[0_24px_55px_-30px_rgba(43,51,134,0.28)] md:grid-cols-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
      style={{ transitionDelay: `${Math.min(index * 80, 320)}ms` }}
    >
      <div className="relative aspect-[1.55/1] min-h-[220px] overflow-hidden bg-[#eef2f8] sm:aspect-[1.65/1] md:aspect-auto md:min-h-[300px] lg:min-h-[360px]">
        {imageFailed ? <ImagePlaceholder title={service.title} /> : <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.035]" style={{ objectPosition: service.objectPosition }} onError={() => setImageFailed(true)} />}
      </div>
      <div className="flex min-h-[250px] flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-14 xl:px-16">
        <div className="max-w-[520px]">
          <div className="mb-4 h-1 w-10 bg-[#ef7120] transition-all duration-500 group-hover:w-16" aria-hidden="true" />
          <h2 id={`${service.id}-title`} className="text-[clamp(1.45rem,2.5vw,2.2rem)] font-semibold leading-tight tracking-[-0.035em] text-[#2b3386]">{service.title}</h2>
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-7">{service.description}</p>
          <a href={service.href} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[#2b3386] transition-colors hover:text-[#ef7120] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]">
            View more
            <span aria-hidden="true" className="text-base normal-case transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export function CharteringServices() {
  return (
    <section aria-labelledby="chartering-services-title" className="bg-[#f5f7fc] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28 xl:px-20">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#ef7120]">Our services</p>
          <h2 id="chartering-services-title" className="text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#2b3386]">Chartering solutions, carefully coordinated.</h2>
        </div>
        <div className="space-y-8 sm:space-y-10 lg:space-y-14">
          {charteringServices.map((service, index) => <ServiceRow key={service.id} service={service} index={index} />)}
        </div>
      </div>
    </section>
  )
}
