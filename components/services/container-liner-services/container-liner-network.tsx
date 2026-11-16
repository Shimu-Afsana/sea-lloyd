'use client'

import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

type Port = {
  id: 'ctg' | 'colombo' | 'port-klang' | 'singapore'
  label: string
  name: string
  latitude: number
  longitude: number
  x: number
  y: number
  labelX: number
  labelY: number
  anchor: 'start' | 'end' | 'middle'
}

const ports: Port[] = [
  { id: 'ctg', label: 'CTG', name: 'Chattogram', latitude: 22.36, longitude: 91.78, x: 407, y: 38, labelX: 419, labelY: 32, anchor: 'start' },
  { id: 'colombo', label: 'COLOMBO', name: 'Colombo', latitude: 6.93, longitude: 79.86, x: 226, y: 259, labelX: 213, labelY: 283, anchor: 'end' },
  { id: 'port-klang', label: 'PORT KLANG', name: 'Port Klang', latitude: 3, longitude: 101.4, x: 553, y: 315, labelX: 542, labelY: 351, anchor: 'end' },
  { id: 'singapore', label: 'SINGAPORE', name: 'Singapore', latitude: 1.35, longitude: 103.82, x: 590, y: 339, labelX: 607, labelY: 379, anchor: 'start' },
]

const portColumns = [ports.slice(0, 2), ports.slice(2)]

export function ContainerLinerNetwork() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )
    const section = document.getElementById('container-liner-network')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="container-liner-network"
      aria-labelledby="network-heading"
      className="relative overflow-hidden bg-[linear-gradient(110deg,#252d78_0%,#2b3386_48%,#242d78_100%)] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,rgba(91,108,190,0.18),transparent_42%)]" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[minmax(250px,0.29fr)_minmax(460px,0.49fr)_minmax(180px,0.22fr)] lg:gap-6 xl:gap-12">
        <div className={`max-w-md transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ef7120] sm:text-xs">
            <span aria-hidden="true" className="h-0.5 w-5 bg-[#ef7120]" />
            Our shipping network
          </p>
          <h2 id="network-heading" className="mt-4 max-w-[420px] text-3xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-4xl xl:text-[2.85rem]">
            Stronger Connections. Smarter Cargo Movement.
          </h2>
          <p className="mt-5 max-w-[390px] text-sm leading-6 text-indigo-100/80">
            Sea Lloyd connects key regional shipping gateways through coordinated container liner operations, supporting dependable cargo movements across important maritime trade routes.
          </p>
          <div className="mt-7 grid max-w-[330px] grid-cols-2 gap-x-5 gap-y-3 border-t border-white/15 pt-5">
            {portColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-3">
                {column.map((port) => (
                  <div key={port.id} className="flex items-center gap-2 text-xs font-medium text-white/90 sm:text-sm">
                    <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#ef7120]" strokeWidth={3} />
                    <span>{port.name} ({port.label === 'CTG' ? 'CTG' : port.label})</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={`relative min-w-0 transition-all duration-800 ${isVisible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'}`} style={{ transitionDelay: '120ms' }}>
          <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6276c9]/10 blur-3xl" />
          <svg viewBox="0 0 760 430" role="img" aria-labelledby="map-title map-description" className="relative h-auto w-full overflow-visible">
            <title id="map-title">Sea Lloyd regional shipping network</title>
            <desc id="map-description">A map of the Indian Ocean and Southeast Asia with routes between Chattogram, Colombo, Port Klang, and Singapore.</desc>
            <defs>
              <filter id="port-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="blur" /></filter>
              <linearGradient id="land-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7f9ff" stopOpacity="0.9" /><stop offset="1" stopColor="#cbd5f1" stopOpacity="0.62" /></linearGradient>
            </defs>
            <g fill="url(#land-fill)" stroke="#eef2ff" strokeOpacity="0.34" strokeWidth="1.2">
              <path d="M125 20 171 11 222 14 257 29 286 43 303 60 316 77 307 95 293 105 287 126 269 144 257 165 242 186 225 204 208 216 193 202 184 183 170 168 154 155 143 136 133 115 125 92 118 66Z" />
              <path d="M307 75 325 63 344 68 358 83 369 99 383 113 390 129 385 143 374 151 362 146 352 132 342 119 331 105 319 95Z" />
              <path d="M386 28 404 20 426 22 444 31 455 43 464 59 456 74 443 81 427 78 415 66 402 55 391 43Z" />
              <path d="M432 127 453 119 479 119 503 128 522 143 536 160 545 182 553 201 565 216 566 236 555 247 543 241 532 224 520 209 507 197 494 185 480 171 463 159 447 146Z" />
              <path d="M475 214 492 218 507 232 515 248 518 267 510 283 499 287 491 274 485 256 477 241Z" />
              <path d="M523 269 548 270 572 278 587 290 589 304 578 312 559 307 541 299 524 289Z" />
              <path d="M574 319 596 322 608 334 602 347 584 348 572 337Z" />
              <path d="M618 325 647 327 669 339 676 353 664 365 641 362 624 350Z" />
              <path d="M644 365 669 371 685 387 681 402 665 405 648 392 638 378Z" />
              <path d="M558 343 567 350 564 362 555 357Z" />
              <path d="M410 242 420 248 423 261 416 271 406 264 404 251Z" />
            </g>
            <g fill="none" stroke="#ef7120" strokeLinecap="round" strokeWidth="2" strokeDasharray="7 7" className={isVisible ? 'motion-safe:animate-[route-draw_1.1s_ease-out_forwards]' : ''}>
              <path d="M407 38 Q286 102 226 259" />
              <path d="M226 259 Q345 236 553 315" />
              <path d="M553 315 Q574 323 590 339" />
              <path d="M590 339 Q530 186 407 38" />
            </g>
            <g>
              {ports.map((port, index) => (
                <g key={port.id} className={isVisible ? 'motion-safe:animate-[marker-in_500ms_ease-out_both]' : 'opacity-0'} style={{ animationDelay: `${360 + index * 120}ms` }}>
                  <circle cx={port.x} cy={port.y} r="11" fill="#ef7120" opacity="0.35" filter="url(#port-glow)" className="motion-safe:animate-[marker-pulse_2.6s_ease-in-out_infinite]" />
                  <circle cx={port.x} cy={port.y} r="5.5" fill="#ef7120" stroke="#fff" strokeWidth="2" />
                  <line x1={port.x} y1={port.y} x2={port.labelX} y2={port.labelY - (port.labelY > port.y ? 5 : -5)} stroke="#ef7120" strokeOpacity="0.75" strokeWidth="1" />
                  <text x={port.labelX} y={port.labelY} textAnchor={port.anchor} fill="#fff" fontSize="11" fontWeight="700" letterSpacing="0.08em">{port.label}</text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div className={`border-t border-white/20 pt-8 transition-all duration-700 lg:border-l lg:border-t-0 lg:py-8 lg:pl-7 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '220ms' }}>
          <p className="max-w-[190px] text-2xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-3xl">
            Connected Ports.<br /><span className="text-[#ef7120]">Greater Possibilities.</span>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes route-draw { from { stroke-dashoffset: 180; opacity: 0; } to { stroke-dashoffset: 0; opacity: .85; } }
        @keyframes marker-in { from { opacity: 0; transform: scale(.6); transform-origin: center; } to { opacity: 1; transform: scale(1); transform-origin: center; } }
        @keyframes marker-pulse { 0%,100% { opacity: .3; transform: scale(.82); transform-origin: center; } 50% { opacity: .7; transform: scale(1.1); transform-origin: center; } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
      `}</style>
    </section>
  )
}
