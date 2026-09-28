'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const statistics = [
  { value: 15.5, suffix: 'K', title: 'Port Calls', image: '/ports-calls.png', imagePosition: 'center' },
  { value: 2.5, suffix: 'M', title: 'TEUs Per Year', image: '/teus-per-year.png', imagePosition: 'center' },
  { value: 850, suffix: '+', title: 'Employees Worldwide', image: '/employees-world.png', imagePosition: 'center' },
  { value: 35, suffix: '+', title: 'Vessels in Operation', image: '/M.V. Shamayel.png', imagePosition: 'center' },
  { value: 120, suffix: '+', title: 'Containers', image: '/sealloyd container 2.jpeg', imagePosition: 'center' },
  { value: 300, suffix: '+', title: 'Ports Served Worldwide', image: '/ports-worldwide.png', imagePosition: 'center' },
  { value: 40, suffix: '+', title: 'Countries / Office Locations', image: '/office-locations.png', imagePosition: 'center' },
] as const

const transitionMs = 500
const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function CompanyStats() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [displayValue, setDisplayValue] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countFrameRef = useRef<number | null>(null)
  const finishRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const moveTo = useCallback((step: 1 | -1) => {
    if (isAnimating) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection(step)
    setIsAnimating(true)
    finishRef.current = setTimeout(() => {
      setActiveSlide((current) => (current + step + statistics.length) % statistics.length)
      setIsAnimating(false)
    }, isReducedMotion ? 0 : transitionMs)
  }, [isAnimating, isReducedMotion])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setIsReducedMotion(mediaQuery.matches)
    updateMotion()
    mediaQuery.addEventListener('change', updateMotion)
    return () => {
      mediaQuery.removeEventListener('change', updateMotion)
      if (timerRef.current) clearTimeout(timerRef.current)
      if (finishRef.current) clearTimeout(finishRef.current)
    }
  }, [])

  useEffect(() => {
    const target = statistics[activeSlide].value
    if (countFrameRef.current) cancelAnimationFrame(countFrameRef.current)
    if (isReducedMotion) {
      setDisplayValue(target)
      return
    }

    const startedAt = performance.now()
    const countDuration = 900
    const animateCount = (now: number) => {
      const progress = Math.min((now - startedAt) / countDuration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setDisplayValue(target * easedProgress)
      if (progress < 1) countFrameRef.current = requestAnimationFrame(animateCount)
    }

    countFrameRef.current = requestAnimationFrame(animateCount)
    return () => {
      if (countFrameRef.current) cancelAnimationFrame(countFrameRef.current)
    }
  }, [activeSlide, isReducedMotion])

  useEffect(() => {
    if (isPaused || isReducedMotion || isAnimating) return
    timerRef.current = setTimeout(() => moveTo(1), 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeSlide, isAnimating, isPaused, isReducedMotion, moveTo])

  const getIndex = (offset: number) => (activeSlide + offset + statistics.length) % statistics.length
  const current = statistics[activeSlide]
  const previous = statistics[getIndex(-1)]
  const next = statistics[getIndex(1)]
  const transition = isReducedMotion ? 'none' : `transform ${transitionMs}ms ${ease}, opacity ${transitionMs}ms ${ease}`

  const slideStyle = (offset: -1 | 0 | 1) => {
    const isCurrent = offset === 0
    const isNext = offset === 1
    const isPrevious = offset === -1
    const x = isAnimating
      ? direction === 1
        ? (isCurrent ? '-112%' : isNext ? '0%' : '-224%')
        : (isCurrent ? '112%' : isPrevious ? '0%' : '224%')
      : isCurrent ? '0%' : isNext ? '82%' : '-82%'
    return {
      transform: `translate3d(${x}, 0, 0) scale(${isCurrent ? 1 : 0.84})`,
      opacity: isCurrent ? (isAnimating ? 0 : 1) : (isAnimating && ((direction === 1 && isNext) || (direction === -1 && isPrevious)) ? 1 : (isNext && !isAnimating ? 0.28 : 0)),
      transition,
      zIndex: isCurrent ? 2 : 1,
    }
  }

  return (
    <section aria-labelledby="company-stats-heading" className="relative isolate overflow-hidden bg-[#f7f7f5] text-[#2b3386]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsPaused(false) }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_40%_50%,rgba(43,51,134,0.06),transparent_55%)]" />
      <div className="mx-auto grid min-h-[620px] max-w-[1440px] grid-cols-1 items-center gap-8 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-16 lg:py-20 xl:px-24">
        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden sm:min-h-[380px] lg:min-h-[520px]">
          <div aria-hidden="true" className="absolute left-[10%] top-1/2 h-px w-3/4 bg-[#ef7120]/20" />
          <div className="relative h-[300px] w-full max-w-[560px] overflow-hidden sm:h-[390px] lg:h-[500px]">
            <div className="absolute inset-0 will-change-transform">
              {[{ slide: previous, offset: -1 }, { slide: current, offset: 0 }, { slide: next, offset: 1 }].map(({ slide, offset }) => (
                <div key={`${slide.image}-${offset}`} className="absolute inset-0 h-full w-full will-change-transform" style={slideStyle(offset as -1 | 0 | 1)} aria-hidden={offset !== 0}>
                  <Image src={slide.image} alt={`${slide.title} illustration`} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-contain drop-shadow-[0_20px_30px_rgba(43,51,134,0.08)]" style={{ objectPosition: slide.imagePosition }} priority={activeSlide === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[300px] translate-y-0 flex-col justify-center overflow-hidden lg:min-h-[520px] lg:translate-y-6">
          <div className="relative min-h-[245px] w-full overflow-hidden sm:min-h-[300px] lg:min-h-[340px]">
            {[{ slide: previous, offset: -1 }, { slide: current, offset: 0 }, { slide: next, offset: 1 }].map(({ slide, offset }) => (
              <div key={`${slide.value}-${offset}`} className="absolute left-0 top-0 w-[92%] max-w-[580px] will-change-transform" style={slideStyle(offset as -1 | 0 | 1)} aria-hidden={offset !== 0}>
                <div className="mb-7 h-1 w-16 bg-[#ef7120]" />
                <p className="font-sans text-[clamp(4.5rem,10vw,9.5rem)] font-light leading-[0.86] tracking-[-0.07em] text-[#ef7120]">{offset === 0 ? (slide.value < 10 ? displayValue.toFixed(1) : Math.round(displayValue)) : slide.value}{slide.suffix}</p>
                <h4 id={offset === 0 ? 'company-stats-heading' : undefined} className="mt-7 max-w-[500px] font-sans text-[clamp(2rem,4vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#2b3386]">{slide.title}</h4>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between gap-6 sm:mt-16">
            <p className="font-mono text-xs font-medium tracking-[0.16em] text-[#2b3386]/55" aria-live="polite"><span className="text-[#ef7120]">{String(activeSlide + 1).padStart(2, '0')}</span> / {String(statistics.length).padStart(2, '0')}</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => moveTo(-1)} aria-label="Previous statistic" className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#2b3386]/10 text-xl text-[#2b3386] transition-colors hover:bg-[#ef7120] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-2 sm:h-14 sm:w-14">←</button>
              <button type="button" onClick={() => moveTo(1)} aria-label="Next statistic" className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#2b3386] text-xl text-white transition-colors hover:bg-[#ef7120] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-2 sm:h-14 sm:w-14">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { statistics }