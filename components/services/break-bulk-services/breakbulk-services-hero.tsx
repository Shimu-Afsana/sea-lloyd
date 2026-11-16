'use client'

import Image from 'next/image'
import { ArrowDown, ChevronDown, Menu, Ship, X } from 'lucide-react'
import { useState } from 'react'

const HERO_IMAGE = '/SeaLloyd Container Ship at Sea.png'

const ports = ['Chattogram (CTG)', 'Colombo', 'Port Klang', 'Singapore']

export function BreakbulkServicesHero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[#101947] text-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_38%,#3150a8_0%,#17255f_40%,#0c1339_100%)]" />
      <Image
        src={HERO_IMAGE}
        alt="Breakbulk cargo vessel transporting project cargo at sea"
        fill
        priority
        sizes="100vw"
        className="hero-image object-cover object-[64%_50%] opacity-90"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
     

      <section id="top" className="relative mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1440px] items-center px-5 pb-20 pt-16 sm:px-8 lg:min-h-[calc(100svh-110px)] lg:px-12 lg:pb-28">
        <div className="max-w-3xl">
         
          <h3 className="animate-rise max-w-2xl text-[clamp(3rem,5vw,9rem)] font-black uppercase leading-[.80] tracking-[-.065em] text-white [animation-delay:300ms]">
            Breakbulk<br />Cargo
          </h3>
          <div className="animate-rise mt-8 max-w-2xl border-l-2 border-[#ef7120] pl-5 [animation-delay:450ms] sm:mt-10 sm:pl-7">
            <p className="text-base leading-relaxed text-white/90 sm:text-lg">Sea Lloyd supports the movement of oversized, heavy, and non-containerized cargo through carefully coordinated maritime transport, specialized cargo handling, and dependable port arrangements.</p>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">From industrial machinery and project equipment to complex breakbulk shipments, we focus on carefully planned logistics solutions for demanding cargo requirements.</p>
          </div>
        </div>
      </section>

      <footer className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1440px] items-end justify-between px-5 pb-6 sm:px-8 lg:px-12 lg:pb-9">
        <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/60 sm:flex">
          <span className="size-1.5 rounded-full bg-[#ef7120]" />
          Port network
          <span className="text-white/35">{ports.join('  /  ')}</span>
        </div>
        <div className="ml-auto flex items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/65">
          Discover more <ArrowDown className="size-4 text-[#ef7120]" />
        </div>
      </footer>

      <style jsx>{`
        .hero-image { animation: cinematic-zoom 32s ease-in-out infinite alternate; }
        .animate-rise { opacity: 0; animation: rise-in .9s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes cinematic-zoom { from { transform: scale(1); } to { transform: scale(1.045); } }
        @keyframes rise-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .hero-image, .animate-rise { animation: none; } .animate-rise { opacity: 1; } }
      `}</style>
    </main>
  )
}
