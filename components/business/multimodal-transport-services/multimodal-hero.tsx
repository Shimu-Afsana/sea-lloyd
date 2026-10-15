'use client'

import { useEffect, useRef, useState } from 'react'

const SHIP_IMAGE = '/ocean-freight.jpeg'

export function MultimodalHero() {
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
      { threshold: 0.16 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} aria-labelledby="multimodal-heading" className="w-full overflow-hidden bg-[#2b3386]">
      <div className="grid min-h-[25rem] grid-cols-1 md:min-h-[28rem] md:grid-cols-[40%_60%] lg:min-h-[32rem]">
        <div className="flex items-end bg-[#ef7120] px-8 pb-10 pt-20 sm:px-12 sm:pb-12 md:px-10 md:pb-12 lg:px-16 lg:pb-14">
          <p className="font-sans text-[clamp(2.35rem,4.7vw,4.75rem)] font-light uppercase leading-none tracking-[-0.055em] text-white">
            Multimodal
          </p>
        </div>

        <div className="group relative min-h-[16rem] overflow-hidden bg-[#d8e0e6] sm:min-h-[22rem] md:min-h-0">
          <img
            src={SHIP_IMAGE}
            alt="Container ship carrying cargo at sea"
            className={`absolute inset-0 size-full object-cover object-[56%_54%] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:scale-100 motion-reduce:opacity-100 md:object-[58%_52%] ${isVisible ? 'scale-100 opacity-100 md:group-hover:scale-[1.025]' : 'scale-[1.02] opacity-0'}`}
          />
        </div>
      </div>

      <div className="flex justify-center px-6 py-16 text-center text-white sm:px-10 sm:py-20 lg:py-[5.25rem]">
        <div className={`max-w-[43.5rem] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 id="multimodal-heading" className="text-balance font-sans text-[clamp(1.55rem,2.35vw,2.45rem)] font-medium uppercase leading-[1.28] tracking-[-0.04em]">
            Delivering comprehensive and flexible multimodal transportation solutions
          </h1>
          <p className="mx-auto mt-5 max-w-[39rem] text-pretty text-sm font-normal leading-7 text-white/90 sm:mt-6 sm:text-[0.96rem] sm:leading-7">
            Combining multiple modes of transport under a single contract, we streamline your logistics with seamless connections between sea, rail, road, and inland waterways for optimal efficiency.
          </p>
        </div>
      </div>
    </section>
  )
}

export default MultimodalHero
