'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, X } from 'lucide-react'
import { useState } from 'react'

const ports = [
  { name: 'Port Klang', country: 'Malaysia', x: 68, y: 58 },
  { name: 'Singapore', country: 'Singapore', x: 70, y: 65 },
  { name: 'Chittagong', country: 'Bangladesh', x: 67, y: 46 },
  { name: 'Colombo', country: 'Sri Lanka', x: 61, y: 57 },
]

const routes = [
  { id: 'klang-singapore', d: 'M68 58 Q69 61 70 65' },
  { id: 'singapore-chittagong', d: 'M70 65 Q73 48 67 46' },
  { id: 'chittagong-colombo', d: 'M67 46 Q62 45 61 57' },
  { id: 'colombo-klang', d: 'M61 57 Q63 64 68 58' },
]

const stats = [
  ['4', 'Key Ports'],
  ['Asia', 'Regional Coverage'],
  ['24/7', 'Shipping Connectivity'],
  ['Global', 'Network'],
]

const services = [
  { number: '01', title: 'Ocean Freight', description: 'Reliable container shipping across global trade lanes.', image: '/ocean-freight.jpeg', href: '/services/ocean-freight' },
  { number: '02', title: 'Project Cargo', description: 'Specialized handling for oversized and heavy cargo.', image: '/sea lloyd container 6.jpeg', href: '/services/project-cargo' },
  { number: '03', title: 'Inland Connectivity', description: 'Seamless movement from port to final destination.', image: '/sealloyd container 1.jpeg', href: '/services/inland-connectivity' },
  { number: '04', title: 'Digital Tracking', description: 'Real-time visibility, greater control.', image: '/digital-tracking.png', href: '/services/digital-tracking' },
]

export default function Content() {
  const [activePort, setActivePort] = useState<string | null>(null)
  const [selectedPort, setSelectedPort] = useState<(typeof ports)[number] | null>(null)

  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 text-[#2B3386] sm:py-24 lg:py-32" aria-labelledby="network-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_45%,rgba(239,113,32,0.06),transparent_28%),linear-gradient(110deg,rgba(43,51,134,0.025),transparent_35%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-8 lg:px-12">
        <div className="max-w-lg motion-safe:animate-[fade-up_0.8s_ease-out_both]">
          <p className="mb-5 text-xs font-bold tracking-[0.25em] text-[#EF7120]">OUR GLOBAL NETWORK</p>
          <h2 id="network-heading" className="max-w-md text-4xl font-bold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]">
            Connected Across Key Trade Routes
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-[#58628b] sm:text-lg">
            Connecting Port Klang, Singapore, Chittagong and Colombo with reliable regional shipping services designed to keep your cargo moving.
          </p>
          <a href="#ports" className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#EF7120] px-6 text-sm font-bold text-white shadow-[0_10px_25px_rgba(239,113,32,0.2)] transition hover:bg-[#2B3386] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EF7120]">
            Explore Our Network
            <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </a>
          <div className="mt-12 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e4e7f1] bg-[#e4e7f1] sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="bg-white px-4 py-5 sm:px-3">
                <p className="text-xl font-bold tracking-tight">{value}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase leading-4 tracking-[0.08em] text-[#7b84a5]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="ports" className="relative min-w-0 motion-safe:animate-[fade-in_1s_ease-out_0.15s_both]">
          <div className="relative aspect-[1.55] w-full min-w-0 overflow-hidden rounded-[2rem] border border-[#e7eaf3] bg-[#f8fafe] shadow-[0_24px_70px_rgba(43,51,134,0.08)]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" role="img" aria-label="Animated service routes connecting four Asian ports">
              <defs>
                <filter id="route-glow"><feGaussianBlur stdDeviation="0.9" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <linearGradient id="map-fill" x1="0" x2="1"><stop stopColor="#e8edf7" /><stop offset="1" stopColor="#f4f6fb" /></linearGradient>
              </defs>
              <path d="M4 30 Q15 19 26 24 T45 24 Q52 16 62 22 T76 23 Q84 14 96 25 L91 36 Q81 39 76 48 Q67 47 60 41 Q52 45 45 42 Q38 51 28 43 Q20 38 12 43 Z" fill="url(#map-fill)" />
              <path d="M18 52 Q25 45 34 49 Q39 57 45 59 Q43 70 36 78 Q29 76 28 67 Q20 63 18 52Z" fill="#eef1f8" />
              <path d="M48 37 Q57 30 64 35 Q69 39 76 38 Q83 42 82 52 Q76 57 74 66 Q67 74 60 68 Q56 61 52 58 Q47 50 48 37Z" fill="#e9edf6" />
              <path d="M77 62 Q85 56 93 61 Q96 70 91 77 Q84 82 77 76 Q73 70 77 62Z" fill="#eef1f8" />
              <g fill="none" stroke="#2B3386" strokeOpacity="0.16" strokeWidth="0.25"><path d="M6 50H95" /><path d="M10 35H90" /><path d="M20 16V83" /><path d="M50 10V88" /><path d="M80 14V85" /></g>
              {routes.map((route) => <path key={route.id} d={route.d} pathLength="1" className={`route-line ${activePort ? 'opacity-35' : ''}`} data-active-route={route.id} />)}
              <path d="M68 58 Q69 61 70 65 Q73 48 67 46 Q62 45 61 57 Q63 64 68 58" fill="none" stroke="#EF7120" strokeOpacity="0.22" strokeWidth="0.7" strokeDasharray="1 2" />
              {ports.map((port) => (
                <g key={port.name} transform={`translate(${port.x} ${port.y})`} className="cursor-pointer" onMouseEnter={() => setActivePort(port.name)} onMouseLeave={() => setActivePort(null)} onClick={() => setSelectedPort(port)} role="button" aria-label={`View details for ${port.name}`} tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && setSelectedPort(port)}>
                  <circle r="3.2" fill="#EF7120" opacity="0.16" className="port-pulse" />
                  <circle r="1.5" fill="#EF7120" stroke="white" strokeWidth="0.8" />
                  <text x="3" y="-2.5" fill="#2B3386" fontSize="2.5" fontWeight="700" className="select-none">{port.name}</text>
                </g>
              ))}
              <circle r="1.1" fill="#EF7120" filter="url(#route-glow)"><animateMotion dur="8s" repeatCount="indefinite" path="M68 58 Q69 61 70 65 Q73 48 67 46 Q62 45 61 57 Q63 64 68 58" /></circle>
              <circle r="0.75" fill="#2B3386" opacity="0.8"><animateMotion dur="8s" begin="-4s" repeatCount="indefinite" path="M68 58 Q69 61 70 65 Q73 48 67 46 Q62 45 61 57 Q63 64 68 58" /></circle>
            </svg>
            <div className="absolute bottom-5 left-5 flex items-center gap-4 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-[10px] font-semibold text-[#7b84a5] shadow-sm backdrop-blur-sm">
              <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-[#EF7120]" /> Active port</span>
              <span className="flex items-center gap-2"><i className="h-px w-5 bg-[#2B3386]" /> Service route</span>
            </div>
            {selectedPort && <div className="absolute right-5 top-5 w-44 rounded-2xl border border-[#e4e7f1] bg-white p-4 shadow-xl"><button onClick={() => setSelectedPort(null)} className="absolute right-3 top-3 text-[#9aa1bb]" aria-label="Close port details"><X size={14} /></button><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#EF7120]">Service port</p><p className="mt-1 font-bold">{selectedPort.name}</p><p className="mt-1 text-xs text-[#7b84a5]">{selectedPort.country} · Connected 24/7</p></div>}
          </div>
          <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a1a8bf]">Regional service routes · Indian Ocean &amp; Southeast Asia</p>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-[#fbfcff] py-20 text-[#2B3386] sm:py-24 lg:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-7 motion-safe:animate-[fade-up_0.8s_ease-out_both] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold tracking-[0.25em] text-[#EF7120]">OUR SERVICES</p>
            <h2 id="services-heading" className="max-w-xl text-4xl font-bold leading-[1.06] tracking-[-0.045em] sm:text-5xl">Tailored Solutions for Every Shipment</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#58628b] sm:text-lg">Whether it&apos;s a single container or a complex project, we provide end-to-end shipping solutions designed to keep your business moving.</p>
          </div>
          <Link href="/services" className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-bold text-[#2B3386] transition-colors hover:text-[#EF7120] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EF7120] lg:mb-1 lg:self-auto">View All Services <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href} className="service-card group flex flex-col overflow-hidden rounded-2xl border border-[#e5e8f2] bg-white shadow-[0_12px_35px_rgba(43,51,134,0.06)] transition duration-350 hover:-translate-y-1 hover:scale-[1.015] hover:border-[#EF7120] hover:shadow-[0_20px_45px_rgba(43,51,134,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EF7120] motion-safe:animate-[fade-up_0.7s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative aspect-[1.7] overflow-hidden bg-[#eef2fa]">
                <Image src={service.image} alt={`${service.title} service`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 left-4 text-xs font-bold tracking-[0.16em] text-white drop-shadow-md">{service.number}</span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-bold tracking-[-0.02em]">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#697292]">{service.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#EF7120]">Learn More <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

/* Small, composable motion utilities for the map; reduced motion is handled globally. */
const styles = `
  svg path { pointer-events: none; }
  .route-line { stroke: #2B3386; stroke-width: .55; fill: none; stroke-dasharray: .8 1.4; animation: route-flow 7s linear infinite; transition: opacity .3s; }
  .port-pulse { animation: port-pulse 3s ease-out infinite; }
  @keyframes route-flow { to { stroke-dashoffset: -22; } }
  @keyframes port-pulse { 0%, 100% { transform: scale(.8); opacity: .1; } 50% { transform: scale(1.5); opacity: .28; } }
  @keyframes fade-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .route-line, .port-pulse { animation: none; } }
`

if (typeof document !== 'undefined' && !document.getElementById('network-section-motion')) {
  const style = document.createElement('style')
  style.id = 'network-section-motion'
  style.textContent = styles
  document.head.appendChild(style)
}
