'use client'

import { useEffect, useRef, useState } from 'react'
import { FileCog, Gauge, Network, Route } from 'lucide-react'

const benefits = [
  {
    title: 'Simplified Coordination',
    description: 'Simplified coordination with single contract',
    icon: Route,
  },
  {
    title: 'Unified Accountability',
    description: 'Unified accountability for all transport modes',
    icon: Network,
  },
  {
    title: 'Cost Optimization',
    description: 'Cost optimization through integrated routing',
    icon: FileCog,
  },
  {
    title: 'Reduced Transit Times',
    description: 'Reduced transit times and handling',
    icon: Gauge,
  },
] as const

export default function MultimodalBenefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="key-benefits-heading"
      className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2
          id="key-benefits-heading"
          className="mb-8 text-[1.65rem] font-medium uppercase tracking-[-0.04em] text-[#2b3386] sm:mb-10 sm:text-[2rem]"
        >
          Key Benefits
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {benefits.map(({ title, description, icon: Icon }, index) => (
            <article
              key={title}
              className={`group flex min-h-[190px] flex-col items-center justify-center border border-[#eef0f5] bg-[#f8f9fc] px-6 py-8 text-center shadow-[0_5px_16px_rgba(43,51,134,0.04)] transition-[opacity,transform,box-shadow,border-color] duration-700 ease-out hover:-translate-y-1 hover:border-[#2b3386]/20 hover:shadow-[0_12px_28px_rgba(43,51,134,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-[205px] sm:px-7 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: isVisible ? `${index * 90}ms` : '0ms' }}
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.7}
                className="mb-5 size-9 text-[#2b3386] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
              <h3 className="sr-only">{title}</h3>
              <p className="max-w-[220px] text-[0.98rem] leading-6 text-[#2b3386]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
