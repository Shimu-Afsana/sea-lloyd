'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, FileText, FolderOpen, MapPin, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const serviceHref = '/services'
const serviceVisual = {
  ship: '/ocean-freight.jpeg',
  container: '/sealloyd container 5.jpeg',
}

const cards = [
  { title: 'Booking', text: 'Booking processes are simplified so you can amend, split, merge and do more.', icon: CalendarDays, position: 'lg:left-0 lg:top-7' },
  { title: 'Latest Schedules', text: 'Check schedules by ports, point to point or by vessel.', icon: FileText, position: 'lg:right-0 lg:top-14' },
  { title: 'Track & Trace', text: 'Track and trace your shipments in a variety of ways.', icon: MapPin, position: 'lg:left-10 lg:bottom-5' },
  { title: 'Handy Information', text: 'Easy access to essential, relevant information and resources.', icon: FolderOpen, position: 'lg:right-3 lg:bottom-6' },
]

export default function DirectService() {
  const visualRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!visualRef.current) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.16 })
    observer.observe(visualRef.current)
    return () => observer.disconnect()
  }, [])

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    setOffset({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 10, y: ((event.clientY - rect.top) / rect.height - 0.5) * 10 })
  }

  return (
    <section className="overflow-hidden bg-[#f8f9fc] py-20 text-[#2B3386] sm:py-24 lg:py-28" aria-labelledby="direct-service-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8 lg:px-12">
        <div className="max-w-xl motion-safe:animate-[fade-up_0.8s_ease-out_both]">
          <p className="text-xs font-bold tracking-[0.22em] text-[#EF7120]">DIGITAL SOLUTIONS FOR YOU</p>
          <h2 id="direct-service-heading" className="mt-5 text-4xl font-bold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[3.55rem]">Your Goods in Good Hands — Safe, Reliable Carriage</h2>
          <div className="mt-8 flex flex-col gap-4 border-l-2 border-[#EF7120] pl-5">
            <p className="text-sm font-bold tracking-[0.08em] text-[#EF7120]">ALL-WATER DIRECT CONTAINER LINER SERVICE</p>
            <p className="text-xs font-bold leading-5 tracking-[0.08em] text-[#2B3386]">CONNECTING BAY OF BENGAL • WEST COAST OF INDIA • GULF • RED SEA • EAST AFRICA</p>
          </div>
          <h3 className="mt-9 text-xl font-bold tracking-[-0.02em]">Direct &amp; Reliable Container Liner Services</h3>
          <p className="mt-4 text-base leading-7 text-[#596487]">Connecting Indian Subcontinental Inland Points &amp; ICDs via strategic gateway ports to key destinations across the Gulf, Red Sea and East Africa.</p>
          <p className="mt-5 text-sm font-bold leading-6 text-[#2B3386]">Faster Transit <span className="text-[#EF7120]">•</span> Direct Service <span className="text-[#EF7120]">•</span> Reliable Schedules <span className="text-[#EF7120]">•</span> Competitive Freight</p>
          <Link href={serviceHref} className="group mt-9 inline-flex items-center gap-3 bg-[#EF7120] px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#2B3386] hover:shadow-[0_12px_24px_rgba(43,51,134,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2B3386]">Explore Our Services <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></Link>
        </div>

        <div ref={visualRef} onPointerMove={handlePointerMove} onPointerLeave={() => setOffset({ x: 0, y: 0 })} className="relative mx-auto h-[760px] w-full max-w-[680px] sm:h-[680px] lg:h-[580px]">
          <svg className="pointer-events-none absolute inset-[3%] z-[1] h-[94%] w-[94%] overflow-visible" viewBox="0 0 600 520" fill="none" aria-hidden="true">
            <path d="M88 150 C120 42 470 28 525 150 C574 260 540 448 394 476 C228 508 48 426 74 286 C84 232 82 184 88 150Z" stroke="#2B3386" strokeOpacity=".18" strokeWidth="2" strokeDasharray="7 9" />
            <path d="M88 150 C120 42 470 28 525 150 C574 260 540 448 394 476 C228 508 48 426 74 286 C84 232 82 184 88 150Z" stroke="#EF7120" strokeOpacity=".9" strokeWidth="3" strokeDasharray="1 430" strokeLinecap="round" className="motion-safe:animate-[route-dash_9s_linear_infinite]" />
            <defs>
              <filter id="route-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <circle r="12" fill="#EF7120" opacity=".2" filter="url(#route-glow)">
              <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" path="M88 150 C120 42 470 28 525 150 C574 260 540 448 394 476 C228 508 48 426 74 286 C84 232 82 184 88 150Z" />
            </circle>
            <circle r="7" fill="#EF7120" filter="url(#route-glow)">
              <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" path="M88 150 C120 42 470 28 525 150 C574 260 540 448 394 476 C228 508 48 426 74 286 C84 232 82 184 88 150Z" />
            </circle>
          </svg>
          <div className="absolute inset-[12%] z-[2] rounded-full bg-[#08a8d8]/10 motion-safe:animate-[pulse-soft_5s_ease-in-out_infinite]" />
          <div className="absolute left-[20%] top-[25%] z-[3] w-[68%] transition-transform duration-500 ease-out motion-safe:animate-[float-soft_7s_ease-in-out_infinite]" style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}><Image src={serviceVisual.ship} alt="Sea Lloyd container ship" width={560} height={360} className="aspect-[16/9] h-auto w-full border-8 border-white object-cover shadow-[0_18px_32px_rgba(43,51,134,0.15)]" /></div>
          <div className="absolute left-[8%] top-[42%] z-[4] w-[31%] transition-transform duration-500 ease-out motion-safe:animate-[float-soft-reverse_8s_ease-in-out_infinite]" style={{ transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)` }}><Image src={serviceVisual.container} alt="Sea Lloyd container cargo" width={360} height={520} className="aspect-[3/4] h-auto w-full border-8 border-white object-cover shadow-[0_20px_36px_rgba(43,51,134,0.2)]" /></div>
          {cards.map(({ title, text, icon: Icon, position }, index) => <div key={title} className={`group absolute z-[6] w-[min(220px,44%)] rounded-xl border border-[#e1e5f0] bg-white p-3 shadow-[0_10px_22px_rgba(43,51,134,0.11)] transition duration-300 hover:-translate-y-1 hover:border-[#EF7120] hover:shadow-[0_16px_28px_rgba(43,51,134,0.17)] ${index < 2 ? 'top-0' : 'bottom-0'} ${index % 2 === 0 ? 'left-0' : 'right-0'} ${position} motion-safe:animate-[fade-up_0.7s_ease-out_both]`} style={{ animationDelay: `${index * 120}ms` }}><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#2B3386] text-white transition duration-300 group-hover:bg-[#EF7120]"><Icon aria-hidden="true" /></span><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-[11px] leading-4 text-[#667092]">{text}</p></div></div></div>)}
        </div>
      </div>
    </section>
  )
}


