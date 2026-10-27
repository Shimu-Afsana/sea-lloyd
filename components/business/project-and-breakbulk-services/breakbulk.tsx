'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type CargoImage = {
  id: string
  src: string
  alt: string
}


const cargoImages: CargoImage[] = [
  { id: 'project-cargo-01', src: '/project cargo1.webp', alt: 'Project cargo prepared for maritime transport' },
  { id: 'project-cargo-02', src: '/project cargo2.jpg', alt: 'Oversized cargo secured at a commercial port' },
  { id: 'breakbulk-01', src: '/project-cargo3.jpg', alt: 'Breakbulk cargo ready for loading' },
  { id: 'breakbulk-02', src: '/project cargo-4.jpg', alt: 'Heavy equipment prepared for ocean freight' },
  { id: 'project-cargo-03', src: '/project cargo-5.jpg', alt: 'Specialized cargo moving through a port terminal' },
  { id: 'breakbulk-03', src: '/project cargo-6.jpg', alt: 'Industrial freight secured for a vessel journey' },
]


const positions = [
  { x: 0, rotate: 0, scale: 1, opacity: 1, z: 50 },
  { x: 15, rotate: 5, scale: 0.86, opacity: 0.85, z: 40 },
  { x: 27, rotate: 9, scale: 0.72, opacity: 0.55, z: 30 },
  { x: 36, rotate: 12, scale: 0.60, opacity: 0.25, z: 20 },
]


function getPosition(offset: number) {
  const side = Math.sign(offset)
  const depth = Math.min(Math.abs(offset), positions.length - 1)
  const position = positions[depth]
  return { ...position, x: position.x * side, rotate: position.rotate * side }
}

export function Breakbulk() {
  const [activeIndex, setActiveIndex] = useState(0)
  const startX = useRef<number | null>(null)
  const count = cargoImages.length

  const selectImage = useCallback((index: number) => {
    setActiveIndex((index + count) % count)
  }, [count])

  const move = useCallback((direction: number) => {
    setActiveIndex((current) => (current + direction + count) % count)
  }, [count])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move])

  const visibleImages = useMemo(() => cargoImages.map((image, index) => {
    let offset = index - activeIndex
    if (offset > count / 2) offset -= count
    if (offset < -count / 2) offset += count
    return { image, index, offset }
  }), [activeIndex, count])

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] text-[#15205f]">
      <section className="mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-center px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#ef7120] sm:text-sm">Sea Lloyd logistics</p>
              <h1 className="text-3xl font-light tracking-[-0.04em] text-[#2b3386] sm:text-5xl lg:text-6xl">Project &amp; breakbulk cargo</h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">Specialized freight, carefully planned and confidently delivered across global trade routes.</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500" aria-live="polite">
              <span className="font-medium text-[#2b3386]">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="h-px w-10 bg-slate-300" />
              <span>{String(count).padStart(2, '0')}</span>
            </div>
          </div>

          <div

            className="relative mx-auto mt-8 h-[clamp(25rem,65vw,42rem)] w-full max-w-5xl touch-pan-y select-none [perspective:1200px] sm:mt-10 sm:h-[clamp(30rem,55vw,44rem)]"
            onPointerDown={(event) => { startX.current = event.clientX }}
            onPointerUp={(event) => {
              if (startX.current === null) return
              const distance = event.clientX - startX.current
              if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1)
              startX.current = null
            }}
            onPointerCancel={() => { startX.current = null }}
            aria-label="Project and breakbulk cargo image gallery"
          >
            {visibleImages.map(({ image, index, offset }) => {
              const position = getPosition(offset)
              const hidden = Math.abs(offset) > positions.length - 1
              return (
                <button
                  key={image.id}
                  type="button"
                  aria-label={`Show cargo image ${index + 1}: ${image.alt}`}
                  aria-current={offset === 0}
                  onClick={() => selectImage(index)}
                  className={`absolute left-1/2 top-[58%] aspect-[2/3] sm:top-[56%] w-[min(58vw,20rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm border border-white/80 bg-slate-200 shadow-[0_22px_55px_rgba(43,51,134,0.16)] outline-none transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-4 focus-visible:ring-[#ef7120]/60 motion-reduce:transition-none sm:w-[min(43vw,24rem)] ${hidden ? 'pointer-events-none' : ''}`}
                  style={{
                    transform: `translate(calc(-5% + ${position.x}vw), -20%) rotateY(${position.rotate}deg) scale(${position.scale})`,
                    opacity: hidden ? 0 : position.opacity,
                    zIndex: position.z,
                    filter: offset === 0 ? 'saturate(1)' : 'saturate(0.82)',
                  }}
                >
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 64vw, (max-width: 1024px) 43vw, 384px" className="object-cover" priority={offset === 0} />
                  {offset === 0 && <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101a56]/55 to-transparent px-4 pb-4 pt-12 text-left text-xs font-medium uppercase tracking-[0.18em] text-white sm:px-6 sm:pb-6">Featured cargo</span>}
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#2b3386]/10 pt-5 sm:mt-8">
            <p className="max-w-xs text-xs leading-5 text-slate-500 sm:text-sm">Tap, click, or swipe through the gallery to explore each shipment.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => move(-1)} aria-label="Previous cargo image" className="grid size-10 place-items-center rounded-full border border-[#2b3386]/20 text-lg text-[#2b3386] transition hover:border-[#ef7120] hover:text-[#ef7120] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120]">←</button>
              <button type="button" onClick={() => move(1)} aria-label="Next cargo image" className="grid size-10 place-items-center rounded-full bg-[#2b3386] text-lg text-white transition hover:bg-[#ef7120] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120]">→</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
