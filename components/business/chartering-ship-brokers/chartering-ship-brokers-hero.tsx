
'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const HERO_IMAGES = {
  slideOne: '/Global Logistscs.hero.jpeg',
  slideTwo: '/sealloyd container 4.jpeg',
  slideThree: '/sealloyd ship 2.jpeg',
  slideFour: '/ocean-freight.jpeg',
} as const

const slides = [
  {
    eyebrow: 'Chartering & Ship Broking',
    heading: 'Chartering & Ship Broking Services',
    
    description:
      'Sea Lloyd provides coordinated chartering and ship broking support, connecting cargo requirements with suitable vessel options and practical voyage arrangements. We focus on dependable communication, careful planning, and shipping solutions aligned with your operational needs.',
    image: HERO_IMAGES.slideOne,
  },
  {
    eyebrow: 'Vessel Sourcing',
    heading: 'The Right Vessel for Every Cargo Requirement',
 
    description:
      'We support the coordination of vessel options according to cargo type, shipment requirements, route considerations, and operational priorities, helping businesses plan their maritime transportation needs.',
    image: HERO_IMAGES.slideTwo,
  },
  {
    eyebrow: 'Voyage Planning',
    heading: 'Carefully Coordinated Maritime Movements',
   
    description:
      'From understanding cargo requirements to coordinating voyage arrangements and port considerations, Sea Lloyd focuses on organized communication and practical shipping coordination throughout the chartering process.',
    image: HERO_IMAGES.slideThree,
  },
  {
    eyebrow: 'Global Connectivity',
    heading: 'Connecting Cargo Through Strategic Port Networks',
    
    description:
      'Sea Lloyd works to connect cargo requirements with relevant shipping arrangements and port coordination, supporting international trade through practical maritime logistics solutions.',
    image: HERO_IMAGES.slideFour,
  },
] as const

const statistics = [
  { value: '6', label: 'Ships' },
  { value: '300', label: 'Containers' },
  { value: '15', label: 'Ports Served' },
] as const

function ShipFallback() {
  return (
    <div
      className="absolute inset-0 flex items-end justify-center overflow-hidden bg-[radial-gradient(circle_at_55%_35%,#dbe8f4_0,#f8fbfd_65%,#eaf1fb_100%)]"
      role="img"
      aria-label="Maritime vessel photograph placeholder"
    >
      <div className="relative mb-10 h-24 w-[78%] rounded-[48%_48%_16%_16%] bg-[#2b3386] shadow-[0_22px_35px_-15px_rgba(43,51,134,0.55)] sm:h-32">
        <span className="absolute left-[15%] top-[-35%] h-14 w-[48%] rounded-t-lg bg-[#ef7120] sm:h-20" />
        <span className="absolute right-[13%] top-[-50%] h-20 w-3 rounded-t bg-[#2b3386] sm:h-28" />
        <span className="absolute inset-x-[8%] bottom-4 h-2 rounded bg-white/30" />
      </div>
    </div>
  )
}

export function CharteringShipBrokersHero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)
  const carouselRef = useRef<HTMLElement>(null)

  const slide = slides[activeSlide]

  const goToSlide = useCallback((index: number) => {
    setActiveSlide((index + slides.length) % slides.length)
    setImageFailed(false)
  }, [])

  const goNext = useCallback(() => {
    goToSlide(activeSlide + 1)
  }, [activeSlide, goToSlide])

  const goPrevious = useCallback(() => {
    goToSlide(activeSlide - 1)
  }, [activeSlide, goToSlide])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const timer = window.setInterval(() => {
      setImageFailed(false)
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrevious()
    }

    const node = carouselRef.current
    node?.addEventListener('keydown', onKeyDown)

    return () => node?.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrevious])

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#2b3386]">
      <section
        ref={carouselRef}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Sea Lloyd chartering services"
        className="mx-auto w-full max-w-[1600px] px-5 py-8 outline-none sm:px-8 sm:py-12 lg:px-14 lg:py-14 xl:px-20"
      >
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10 xl:gap-14">
          
          <div
            key={`text-${activeSlide}`}
            className="min-w-0 animate-[slide-in_500ms_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#ef7120] sm:mb-5 sm:text-sm">
              {slide.eyebrow}
            </p>

            <h1 className="max-w-[760px] text-[clamp(2.35rem,4.5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#2b3386]">
              {slide.heading}
              
            </h1>

            <p className="mt-6 max-w-[650px] text-base leading-7 text-slate-600 sm:mt-7 sm:text-lg sm:leading-8">
              {slide.description}
            </p>

            <div className="mt-7 grid max-w-[650px] grid-cols-3 gap-2 sm:mt-9 sm:gap-4">
              {statistics.map((stat) => (
                <div key={stat.label} className="group min-w-0">
                  <p className="mb-2 pl-2 text-3xl font-bold tracking-[-0.05em] text-[#ef7120] sm:pl-4 sm:text-5xl">
                    {stat.value}
                  </p>

                  <div className="relative flex min-h-14 items-center overflow-hidden rounded-r-full bg-[#f3f7fc] px-3 py-3 text-xs font-medium text-slate-600 transition-colors group-hover:bg-[#eaf1fb] sm:min-h-16 sm:px-5 sm:text-base">
                    <span className="relative z-10">{stat.label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute -right-5 top-0 h-full w-8 -skew-x-[28deg] border-l-4 border-white/80 bg-white/50"
                    />
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-7 inline-flex rounded-full border border-[#ef7120] bg-white px-5 py-3 text-sm font-semibold text-[#2b3386] transition-colors hover:bg-[#ef7120] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b3386] sm:mt-8 sm:px-7 sm:py-3.5"
            >
              Contact Our Chartering Team
            </a>
          </div>

      
          <div
            key={`image-${activeSlide}`}
            className="relative order-last min-w-0 animate-[fade-in_550ms_ease-out_both] lg:order-none lg:pt-14 xl:pt-16"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[680px] overflow-hidden rounded-2xl bg-[#f3f7fc] shadow-[0_18px_50px_-30px_rgba(43,51,134,0.35)]">
              {imageFailed ? (
                <ShipFallback />
              ) : (
                <Image
                  src={slide.image}
                  alt={`${slide.heading} maritime vessel`}
                  fill
                  sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 45vw, 620px"
                  className="object-cover object-center"
                  onError={() => setImageFailed(true)}
                  priority={activeSlide === 0}
                />
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Sea Lloyd
              </span>
              <span className="h-px flex-1 bg-[#2b3386]/15" />
              <span className="text-xs font-semibold text-[#ef7120]">
                0{activeSlide + 1} / 04
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-5 sm:mt-10 lg:mt-8">
          <div
            className="flex items-center gap-3"
            role="tablist"
            aria-label="Select a service slide"
          >
            {slides.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                role="tab"
                aria-selected={activeSlide === index}
                aria-label={`Go to slide ${index + 1}: ${item.eyebrow}`}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120] ${
                  activeSlide === index
                    ? 'w-10 bg-[#2b3386]'
                    : 'w-3 bg-[#2b3386]/35 hover:bg-[#ef7120]'
                }`}
              />
            ))}
          </div>

         
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2b3386] text-xl text-white transition-colors hover:bg-[#ef7120] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]"
            >
              ←
            </button>

            <span className="min-w-12 text-center text-xs font-semibold tracking-[0.18em] text-[#2b3386]">
              0{activeSlide + 1} / 04
            </span>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2b3386] text-xl text-white transition-colors hover:bg-[#ef7120] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <div id="contact" className="sr-only" aria-hidden="true" />

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div {
            animation-duration: 1ms !important;
            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </main>
  )
}


