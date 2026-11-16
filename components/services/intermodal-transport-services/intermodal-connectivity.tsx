"use client"

import { TrainFront, Truck } from "lucide-react"
import { Fragment, useEffect, useRef, useState } from "react"

type TransportMode = {
  number: string
  name: string
  description: string
  kind: "road" | "rail" | "barge"
}

const modes: TransportMode[] = [
  {
    number: "01",
    name: "Road Transport",
    description:
      "Connecting cargo origins, ports, terminals, and delivery destinations through coordinated inland transportation.",
    kind: "road",
  },
  {
    number: "02",
    name: "Rail Transport",
    description:
      "Supporting planned inland cargo movement between suitable logistics terminals and port connections.",
    kind: "rail",
  },
  {
    number: "03",
    name: "Barge & Inland Waterway",
    description:
      "Providing additional waterway transportation options for suitable inland cargo movements.",
    kind: "barge",
  },
]

const DOTS_PER_CONNECTOR = 7

function BargeIcon() {
  return (
    <svg viewBox="0 0 80 72" fill="none" aria-hidden="true" className="h-[58px] w-[68px] sm:h-[66px] sm:w-[76px]">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65">
        <path d="M13 42h54l-7 13H22l-9-13Z" />
        <path d="M22 42V23h13v19M35 42V18h13v24M48 42V26h12v16M24 27h8M37 22h9M50 30h8" />
        <path d="M8 60c4 0 4-4 8-4s4 4 8 4 4-4 8-4 4 4 8 4 4-4 8-4 4 4 8 4 4-4 8-4 4 4 8 4" />
        <path d="M12 65c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3 4-3 8-3 4 3 8 3" />
      </g>
    </svg>
  )
}

function ModeIcon({ kind }: { kind: TransportMode["kind"] }) {
  if (kind === "road") return <Truck aria-hidden="true" strokeWidth={1.5} className="h-[58px] w-[68px] sm:h-[66px] sm:w-[76px]" />
  if (kind === "rail") return <TrainFront aria-hidden="true" strokeWidth={1.5} className="h-[58px] w-[68px] sm:h-[66px] sm:w-[76px]" />
  return <BargeIcon />
}

function ConnectorDots({ activeDot, offset }: { activeDot: number; offset: number }) {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-1.5 md:gap-1 lg:gap-1.5">
      {Array.from({ length: DOTS_PER_CONNECTOR }, (_, index) => {
        const dotIndex = offset + index
        return (
          <span
            key={dotIndex}
            className={`size-1.5 shrink-0 rounded-full bg-[#ef7120] transition-opacity duration-300 md:size-1 lg:size-1.5 ${activeDot >= dotIndex ? "opacity-100" : "opacity-30"}`}
          />
        )
      })}
    </div>
  )
}

export function IntermodalConnectivity() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeDot, setActiveDot] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
        if (reducedMotion) {
          setActiveDot(DOTS_PER_CONNECTOR * 2 - 1)
          return
        }
        let dot = 0
        const timer = window.setInterval(() => {
          setActiveDot(dot)
          dot += 1
          if (dot >= DOTS_PER_CONNECTOR * 2) window.clearInterval(timer)
        }, 125)
      },
      { threshold: 0.18 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="connectivity-title"
      className="bg-white px-5 py-16 text-[#2b3386] sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className={`mx-auto max-w-5xl text-center transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <h2 id="connectivity-title" className="text-balance text-[clamp(2rem,4vw,3.625rem)] leading-[1.08] font-bold tracking-[-0.045em] text-[#2b3386]">
            Connected Transportation. Seamless Cargo Movement.
          </h2>
          <span aria-hidden="true" className={`mx-auto mt-6 block h-1.5 w-20 rounded-full bg-[#ef7120] transition-transform duration-700 ease-out motion-reduce:transition-none ${isVisible ? "scale-x-100" : "scale-x-0"}`} />
        </div>

        <div className="mx-auto mt-8 max-w-5xl space-y-5 text-left text-[15px] leading-7 text-[#45556C] sm:mt-10 sm:space-y-6 sm:text-center sm:text-lg sm:leading-[1.75]">
          <p className={`transition-[opacity,transform] delay-100 duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
            Sea Lloyd coordinates cargo movements across road transportation, rail networks, inland waterways, and maritime shipping connections. By considering the requirements of each shipment, its origin, destination, and available transport arrangements, we support practical intermodal solutions that connect ports with inland logistics locations.
          </p>
          <p className={`transition-[opacity,transform] delay-200 duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
            From container transfers and terminal coordination to inland cargo distribution, our approach focuses on organized transportation handovers and clear communication between the different stages of a shipment. Sea Lloyd works to bring the relevant logistics arrangements together under a coordinated door-to-door transportation plan.
          </p>
        </div>

        <div role="group" aria-label="Road, rail, and barge transportation modes" className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-center justify-items-center gap-y-3 sm:mt-14 sm:gap-y-4 md:mt-16 md:grid-cols-[minmax(0,1fr)_minmax(70px,.42fr)_minmax(0,1fr)_minmax(70px,.42fr)_minmax(0,1fr)] md:gap-y-0">
          {modes.map((mode, index) => (
            <Fragment key={mode.kind}>
              <div
                className={`flex w-full max-w-sm items-center gap-4 rounded-xl px-3 py-2 transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:gap-5 md:max-w-none md:flex-col md:gap-3 md:px-1 md:py-0 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: isVisible ? `${250 + index * 120}ms` : "0ms" }}
              >
                <div className="grid size-[76px] shrink-0 place-items-center rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-[#2b3386] sm:size-[88px] md:size-[104px]">
                  <ModeIcon kind={mode.kind} />
                </div>
                <div className="min-w-0 md:text-center">
                  <p className="text-[10px] font-semibold tracking-[.18em] text-[#ef7120]">{mode.number}</p>
                  <h3 className="mt-1 text-base leading-snug font-semibold tracking-[-.02em] text-[#2b3386] sm:text-lg md:mt-2 md:text-xl">{mode.name}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#45556C] md:mt-2 md:max-w-[260px]">{mode.description}</p>
                </div>
              </div>
              {index < modes.length - 1 && (
                <div className="flex h-10 w-1/2 items-center justify-center md:h-auto md:w-full">
                  <div className="hidden w-full md:block"><ConnectorDots activeDot={activeDot} offset={index * DOTS_PER_CONNECTOR} /></div>
                  <div className="h-full border-l border-[#ef7120]/40 md:hidden">
                    <div className="flex h-full flex-col justify-between py-1">
                      {Array.from({ length: 3 }, (_, dot) => <span key={dot} className={`size-1.5 -translate-x-[3.5px] rounded-full bg-[#ef7120] transition-opacity duration-300 ${activeDot >= index * DOTS_PER_CONNECTOR + dot ? "opacity-100" : "opacity-35"}`} />)}
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
