'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ports = [
  { name: 'Port Klang', country: 'Malaysia', x: 68, y: 58 },
  { name: 'Singapore', country: 'Singapore', x: 72, y: 65 },
  { name: 'Chittagong', country: 'Bangladesh', x: 70, y: 42 },
  { name: 'Colombo', country: 'Sri Lanka', x: 61, y: 51 },
] as const

const newsItems = [
  {
    date: '28 October 2026',
    title: 'Sea Lloyd Expands Regional Shipping Connectivity',
    excerpt: 'Sea Lloyd continues to strengthen reliable shipping connections across key regional trade routes.',
    image: '/sealloyd ship 2.jpeg',
    href: '/news/sea-lloyd-expands-regional-connectivity',
  },
  {
    date: '16 October 2026',
    title: 'Sea Lloyd Strengthens Fleet and Service Network',
    excerpt: 'New developments across our shipping network support more reliable cargo movement for customers.',
    image: '/ocean-freight.jpeg',
    href: '/news/sea-lloyd-strengthens-fleet',
  },
  {
    date: '07 October 2026',
    title: 'Reliable Liner Services Across Key Trade Routes',
    excerpt: 'Our growing network continues to connect important ports across Asia and international markets.',
    image: '/sealloyd container 2.jpeg',
    href: '/news/reliable-liner-services',
  },
]

function Globe({ activePort }: { activePort: (typeof ports)[number] }) {
  return (
    <div className="relative mx-auto h-[190px] w-[250px] sm:h-[230px] sm:w-[300px]" aria-label={`Currently highlighting ${activePort.name}, ${activePort.country}`} role="img">
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0,#eef1f4_38%,#c9d0d8_100%)] shadow-[inset_-18px_-16px_28px_rgba(43,51,134,0.2),0_14px_35px_rgba(43,51,134,0.1)]" />
      <svg viewBox="0 0 300 230" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <clipPath id="globe-clip"><circle cx="150" cy="115" r="82" /></clipPath>
          <path id="orbit-path" d="M 55 105 C 120 12 230 12 268 112 C 230 214 120 214 55 105" />
        </defs>
        <g clipPath="url(#globe-clip)" fill="none" stroke="#2b3386" strokeOpacity=".16" strokeWidth="1">
          <ellipse cx="150" cy="115" rx="82" ry="30" />
          <ellipse cx="150" cy="115" rx="82" ry="58" />
          <ellipse cx="150" cy="115" rx="42" ry="82" />
          <ellipse cx="150" cy="115" rx="70" ry="82" />
          <path d="M68 115h164M75 83h150M75 147h150" />
        </g>
        <use href="#orbit-path" fill="none" stroke="#2b3386" strokeOpacity=".22" strokeWidth="1.2" strokeDasharray="4 6" className="origin-center animate-[spin_18s_linear_infinite]" />
        <path d="M105 177 C143 137 178 92 215 52" fill="none" stroke="#ef7120" strokeOpacity=".62" strokeWidth="1.5" strokeDasharray="3 5" className="animate-[dash_3s_ease-in-out_infinite]" />
        {ports.map((port) => (
          <g key={port.name} transform={`translate(${port.x * 3}, ${port.y * 2.3})`}>
            <circle r={port.name === activePort.name ? 5 : 2.5} fill={port.name === activePort.name ? '#ef7120' : '#2b3386'} opacity={port.name === activePort.name ? 1 : 0.35} />
            {port.name === activePort.name && <circle r="10" fill="none" stroke="#ef7120" strokeOpacity=".55" strokeWidth="1.5" className="animate-ping" />}
          </g>
        ))}
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2b3386] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-700">
        {activePort.name}
      </div>
    </div>
  )
}

export default function News() {
 const [activePort, setActivePort] = useState<(typeof ports)[number]>(ports[0])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePort((current) => ports[(ports.indexOf(current) + 1) % ports.length])
    }, 2600)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section aria-labelledby="news-heading" className="overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid items-center gap-7 lg:mb-16 lg:grid-cols-[300px_1fr_auto] lg:gap-12">
          <Globe activePort={activePort} />
          <div className="text-center lg:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#ef7120]">Global intelligence</p>
            <h2 id="news-heading" className="font-sans text-5xl font-light tracking-[-0.06em] text-[#2b3386] sm:text-6xl lg:text-7xl">News</h2>
            <span className="mt-4 block h-1 w-12 bg-[#ef7120] lg:mt-5" />
          </div>
          <Link href="/news" className="mx-auto inline-flex items-center gap-3 rounded-full bg-[#ef7120] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#2b3386] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b3386] lg:mx-0">
            View All <span aria-hidden="true" className="text-lg leading-none">→</span>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-7">
          {newsItems.map((item, index) => (
            <article key={item.title} className="group flex flex-col opacity-0 animate-[news-in_700ms_ease-out_forwards]" style={{ animationDelay: `${index * 100}ms` }}>
              <Link href={item.href} className="block overflow-hidden rounded-[1.25rem] bg-[#eef0f4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]">
                <div className="relative aspect-[1.42] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <time dateTime={item.date} className="absolute right-3 top-3 rounded-full bg-[#2b3386]/90 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white">{item.date}</time>
                </div>
              </Link>
              <div className="flex flex-1 flex-col pt-5">
                <h3 className="font-sans text-xl font-medium leading-[1.12] tracking-[-0.035em] text-[#2b3386] transition-colors duration-300 group-hover:text-[#ef7120]">{item.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                <Link href={item.href} className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-semibold text-[#ef7120] transition-all duration-300 group-hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b3386]">Read More <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style jsx global>{`@keyframes news-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } @keyframes dash { to { stroke-dashoffset: -32; } } @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; } }`}</style>
    </section>
  )
}

export { ports, newsItems }