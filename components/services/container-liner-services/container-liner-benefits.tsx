'use client'

import { useEffect, useState } from 'react'
import { CalendarCheck, ClipboardList, Gauge, Globe2, Handshake, Plane, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Port = { label: string; x: number; y: number; lx: number; ly: number; anchor: 'start' | 'end' }

type Benefit = {
  title: string
  description: string
  icon: LucideIcon
  map?: boolean
}

const ports: Port[] = [
  { label: 'CTG', x: 126, y: 27, lx: 136, ly: 21, anchor: 'start' },
  { label: 'COLOMBO', x: 57, y: 141, lx: 52, ly: 157, anchor: 'end' },
  { label: 'PORT KLANG', x: 209, y: 171, lx: 202, ly: 185, anchor: 'end' },
  { label: 'SINGAPORE', x: 223, y: 185, lx: 232, ly: 199, anchor: 'start' },
]

const benefits: Benefit[] = [
  {
    title: 'Operational Flexibility',
    description: 'Adapt to changing market demands with flexible sailing schedules, coordinated transport options, and strong operational partnerships, supporting seamless cargo movement across different shipping requirements.',
    icon: Plane,
  },
  {
    title: 'Agile Supply Chain Management',
    description: 'Coordinate shipping timelines, transport arrangements, and cargo milestones to support efficient supply chain planning and changing business priorities.',
    icon: Gauge,
  },
  {
    title: 'Cargo Safety & Security',
    description: 'Your cargo receives careful attention through responsible handling procedures, coordinated monitoring, and appropriate security measures throughout its shipping journey.',
    icon: ShieldCheck,
  },
  {
    title: 'Reliable Scheduling',
    description: 'Clear planning, transparent lead times, and dependable port coordination help businesses manage cargo movements with greater confidence across relevant trade routes.',
    icon: Handshake,
  },
  {
    title: 'Extensive Service Network',
    description: "Connect regional and international cargo movements through Sea Lloyd's network, linking important maritime gateways including Chattogram (CTG), Colombo, Port Klang, and Singapore.",
    icon: Globe2,
    map: true,
  },
  {
    title: 'Integrated Logistics Solutions',
    description: 'Bring together sea, road, rail, inland waterway, and coordinated cargo-handling arrangements to support connected logistics solutions from origin to destination.',
    icon: ClipboardList,
  },
]

function RegionalPortMap() {
  return (
    <svg viewBox="0 0 280 215" role="img" aria-label="Regional map showing Sea Lloyd ports in Chattogram, Colombo, Port Klang, and Singapore" className="mx-auto mb-5 h-[150px] w-full max-w-[250px] text-[#2b3386] sm:h-[170px]">
      <g fill="#2b3386" fillOpacity=".12" stroke="#2b3386" strokeOpacity=".27" strokeWidth=".8">
        <path d="M72 10 96 7 116 16 130 31 137 52 130 70 119 85 105 101 94 113 79 100 70 83 62 64 55 42Z" />
        <path d="M143 53 158 45 174 51 185 64 193 82 201 96 207 116 220 130 221 148 211 154 201 139 190 127 178 116 164 100 152 83Z" />
        <path d="M197 139 215 139 230 148 237 161 228 168 211 162 197 153Z" />
        <path d="M228 169 242 175 239 188 228 185Z" />
        <path d="M160 151 168 157 167 166 159 161Z" />
      </g>
      <g fill="none" stroke="#ef7120" strokeWidth="1.4" strokeDasharray="4 4" opacity=".9">
        <path d="M126 27 Q92 66 57 141" />
        <path d="M57 141 Q130 141 209 171" />
        <path d="M209 171 Q216 177 223 185" />
        <path d="M223 185 Q185 83 126 27" />
      </g>
      {ports.map((port) => (
        <g key={port.label}>
          <circle cx={port.x} cy={port.y} r="5" fill="#ef7120" fillOpacity=".22" />
          <circle cx={port.x} cy={port.y} r="2.7" fill="#ef7120" stroke="white" strokeWidth="1" />
          <line x1={port.x} y1={port.y} x2={port.lx} y2={port.ly + (port.ly < port.y ? 3 : -3)} stroke="#ef7120" strokeWidth=".7" />
          <text x={port.lx} y={port.ly} textAnchor={port.anchor} fill="#2b3386" fontSize="7" fontWeight="700" letterSpacing=".06em">{port.label}</text>
        </g>
      ))}
    </svg>
  )
}

export function ContainerLinerBenefits() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('container-liner-benefits')
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="container-liner-benefits" aria-labelledby="benefits-heading" className="bg-[#f8fafc] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-20">
      <div className="mx-auto max-w-[1420px]">
        <h2 id="benefits-heading" className={`mx-auto max-w-4xl text-center text-3xl font-medium leading-tight tracking-[-0.045em] text-[#2b3386] transition-all duration-700 sm:text-4xl lg:text-5xl ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Driving Performance Across Global Trade Routes
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:mt-16 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-20 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24 xl:gap-x-20">
          {benefits.map(({ title, description, icon: Icon, map }, index) => (
            <article key={title} className={`group flex min-w-0 flex-col items-center text-center transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${180 + index * 95}ms` }}>
              <div className="flex min-h-16 items-center justify-center text-[#2b3386] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#ef7120] sm:min-h-[68px]">
                {map ? <RegionalPortMap /> : <Icon aria-hidden="true" className="h-12 w-12 stroke-[1.45] sm:h-14 sm:w-14" />}
              </div>
              <h3 className="mt-5 max-w-sm text-xl font-medium leading-tight tracking-[-0.025em] text-[#2b3386] sm:text-[1.35rem]">{title}</h3>
              <p className="mt-4 max-w-[370px] text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-7">{description}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; } }
      `}</style>
    </section>
  )
}
