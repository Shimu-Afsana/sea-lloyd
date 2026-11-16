'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const PROJECT_CARGO_IMAGE = '/project cargo-4.jpg'

export function ProjectCargoLogistics() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageSrc, setImageSrc] = useState(PROJECT_CARGO_IMAGE)

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
      { threshold: 0.16 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-20">
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 md:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] md:items-start md:gap-10 lg:gap-16 xl:gap-20">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2.25rem,5vw,4.2rem)] font-medium leading-[1.06] tracking-[-0.045em] text-[#2b3386]">
            Whatever Your Project, Sea Lloyd Has the Logistics.
          </h2>

          <div className="mt-9 max-w-2xl space-y-7 text-base leading-8 text-[#45556C]/80 sm:mt-10 sm:space-y-8 sm:text-lg sm:leading-[1.75]">
            <p>
              No two project cargo shipments are exactly alike. Oversized dimensions, heavy weights, specialized handling requirements, and complex transportation routes can introduce unique logistical challenges. Sea Lloyd focuses on understanding these requirements and coordinating suitable transportation arrangements, with careful attention to planning, cargo handling, and delivery considerations.
            </p>
            <p>
              From industrial machinery and infrastructure equipment to generators, fabricated structures, and other out-of-gauge cargo, Sea Lloyd supports project-specific logistics coordination. We consider cargo specifications, vessel suitability, route conditions, loading and discharge requirements, and communication between the relevant parties to help keep each movement organized from origin to destination.
            </p>
          </div>
        </div>

        <div className={`group relative aspect-[4/3] min-h-[280px] overflow-hidden rounded-xl bg-slate-100 shadow-[0_18px_50px_rgba(43,51,134,0.12)] transition-all duration-[900ms] ease-out motion-reduce:transition-none md:aspect-[1.08/1] md:min-h-[430px] lg:min-h-[520px] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'} motion-reduce:translate-x-0 motion-reduce:opacity-100`}>
          <Image
            src={imageSrc}
            alt="Project cargo convoy transporting heavy industrial equipment"
            onError={() => setImageSrc('/placeholder.jpg')}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 48vw, 50vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      </div>
    </section>
  )
}

  
