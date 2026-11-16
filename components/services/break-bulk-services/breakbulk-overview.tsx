'use client'

import { Anchor, Compass, Globe2, Ship } from 'lucide-react'
import { useEffect, useState } from 'react'

type Port = {
  id: string
  label: string
  x: number
  y: number
  labelX: number
  labelY: number
}

type Service = {
  id: string
  title: string
  description: string
  icon: typeof Compass
  map?: boolean
}

const ports: Port[] = [
  { id: 'ctg', label: 'CTG', x: 47, y: 28, labelX: 50, labelY: 25 },
  { id: 'cmb', label: 'CMB', x: 24, y: 67, labelX: 16, labelY: 78 },
  { id: 'pkl', label: 'PKL', x: 62, y: 76, labelX: 65, labelY: 89 },
  { id: 'sin', label: 'SIN', x: 78, y: 83, labelX: 82, labelY: 96 },
]

const services: Service[] = [
  {
    id: 'planning',
    title: 'Project Cargo Planning',
    description: 'We consider cargo dimensions, weight, shipment requirements, transport routes, and delivery constraints to help coordinate practical solutions for complex project cargo movements.',
    icon: Compass,
  },
  {
    id: 'handling',
    title: 'Breakbulk & Heavy Cargo Handling',
    description: 'From industrial machinery and steel structures to oversized equipment and non-containerized shipments, we emphasize suitable vessel arrangements, careful cargo handling, and operational coordination.',
    icon: Ship,
  },
  {
    id: 'connectivity',
    title: 'Regional Port Connectivity',
    description: "Sea Lloyd's regional shipping network highlights important maritime gateways connecting Bangladesh, Sri Lanka, Malaysia, and Singapore.",
    icon: Globe2,
    map: true,
  },
]

function RegionalPortMap() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 350)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="relative mt-5 overflow-hidden rounded-lg border border-[#2b3386]/10 bg-[#f5f7fc] p-2" aria-label="Regional port network map">
      <svg viewBox="0 0 100 100" className="h-32 w-full" role="img" aria-labelledby="map-title map-description">
        <title id="map-title">Sea Lloyd regional port network</title>
        <desc id="map-description">A simplified map showing Chattogram, Colombo, Port Klang, and Singapore.</desc>
        <path d="M11 10C20 3 31 8 36 17L45 23L53 20L62 27L69 39L65 49L73 56L83 67L90 81L85 89L76 81L67 75L61 63L51 55L42 47L32 39L22 30L14 21Z" fill="#2b3386" fillOpacity=".07" stroke="#2b3386" strokeOpacity=".24" strokeWidth=".55" />
        <path d="M31 45C36 52 39 62 37 76L32 89M57 49C60 59 65 68 68 78L72 93M69 37C76 45 78 54 79 66" fill="none" stroke="#2b3386" strokeOpacity=".13" strokeWidth=".45" strokeDasharray="1.5 1.5" />
        <path d="M47 28Q35 43 24 67T62 76T78 83" fill="none" stroke="#ef7120" strokeOpacity={visible ? '.42' : '0'} strokeWidth=".8" strokeDasharray="30 90" className="route-line" />
        {ports.map((port, index) => (
          <g key={port.id} className={visible ? 'map-marker' : 'map-marker-hidden'} style={{ animationDelay: `${index * 100}ms` }}>
            <circle cx={port.x} cy={port.y} r="3.3" fill="#ef7120" fillOpacity=".15" />
            <circle cx={port.x} cy={port.y} r="1.5" fill="#ef7120" stroke="white" strokeWidth=".7" />
            <text x={port.labelX} y={port.labelY} fill="#2b3386" fontSize="3.8" fontWeight="700" letterSpacing=".2">{port.label}</text>
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 text-[9px] font-semibold uppercase tracking-[.1em] text-[#2b3386]/60">
        {ports.map((port) => <span key={port.id}><span className="mr-1 inline-block size-1.5 rounded-full bg-[#ef7120]" />{port.label}</span>)}
      </div>
      <style jsx>{`
        .map-marker-hidden { opacity: 0; }
        .map-marker { opacity: 0; animation: marker-in .45s cubic-bezier(.22,1,.36,1) forwards; }
        .route-line { animation: route-in 1.2s ease-out forwards; }
        @keyframes marker-in { from { opacity: 0; transform: scale(.65); transform-origin: center; } to { opacity: 1; transform: scale(1); transform-origin: center; } }
        @keyframes route-in { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) { .map-marker, .route-line { animation: none; opacity: 1; } }
      `}</style>
    </div>
  )
}

export function BreakbulkOverview() {
  return (
    <section className="bg-[#f8fafc] px-5 py-20 text-[#2b3386] sm:px-8 sm:py-24 lg:px-12 lg:py-32" aria-labelledby="breakbulk-overview-heading">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <div className="overview-reveal">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.28em] text-[#ef7120] sm:text-xs">Project &amp; breakbulk logistics</p>
            <h2 id="breakbulk-overview-heading" className="max-w-xl text-[clamp(2.75rem,5vw,5.5rem)] font-extrabold leading-[.94] tracking-[-.055em]">Project Cargo,<br />Planned Around<br />Complexity.</h2>
          </div>
          <div className="overview-reveal flex max-w-2xl flex-col gap-6 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
            <p>Sea Lloyd supports the transportation of oversized, heavy, and non-containerized cargo through carefully coordinated project and breakbulk logistics solutions. From industrial machinery and engineering equipment to complex project components, each shipment requires thoughtful planning, appropriate handling arrangements, and careful attention to its transportation requirements.</p>
            <p>Our approach focuses on understanding cargo dimensions, weight, loading and discharge requirements, vessel suitability, and port capabilities. By coordinating relevant logistics activities and communicating with the parties involved, we work to support organized cargo movements from origin to destination.</p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map(({ id, title, description, icon: Icon, map }, index) => (
            <article key={id} className="service-card overview-reveal flex min-h-[330px] flex-col rounded-xl border border-[#2b3386]/12 bg-white p-6 shadow-[0_12px_35px_rgba(43,51,134,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ef7120]/60 hover:shadow-[0_18px_45px_rgba(43,51,134,0.12)] sm:p-7 lg:min-h-[370px] lg:p-8" style={{ animationDelay: `${index * 100 + 150}ms` }}>
              <div className="mb-7 grid size-11 place-items-center rounded-full bg-[#2b3386]/[.08] text-[#2b3386] transition-colors duration-300 group-hover:bg-[#ef7120]/10">
                <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
              </div>
              <h3 className="max-w-xs text-xl font-bold leading-tight tracking-[-.025em] text-[#2b3386]">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
              {map && <RegionalPortMap />}
              {map && <span className="mt-auto flex items-center gap-2 pt-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#ef7120]"><Anchor className="size-3.5" /> Four gateway locations</span>}
            </article>
          ))}
        </div>
      </div>
      <style jsx>{`
        .overview-reveal { opacity: 0; transform: translateY(18px); animation: overview-in .65s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes overview-in { to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .overview-reveal { opacity: 1; transform: none; animation: none; } }
      `}</style>
    </section>
  )
}
