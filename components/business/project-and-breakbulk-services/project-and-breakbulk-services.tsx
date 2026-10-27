'use client'

import { ArrowRight } from 'lucide-react'


const HERO_IMAGE =
  '/Sealloyd-container9.jpeg'
const QUOTE_HREF = '/contact'

export function ProjectAndBreakbulkServices() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#2b3386] text-white sm:min-h-[90svh]">
      <style>{`
        @keyframes sea-lloyd-cinematic-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sea-lloyd-hero-image { animation: none !important; transform: none !important; }
        }
      `}</style>

      <img
        src={HERO_IMAGE}
        alt="Project cargo secured on a vessel for ocean transport"
        className="sea-lloyd-hero-image absolute inset-0 h-full w-full object-cover object-[62%_center] motion-reduce:transform-none sm:object-[68%_center]"
        style={{ animation: 'sea-lloyd-cinematic-zoom 24s ease-in-out infinite' }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#2b3386]/45 sm:bg-[linear-gradient(90deg,rgba(8,39,91,0.75)_0%,rgba(20,50,116,0.60)_43%,rgba(43,51,134,0.25)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,39,91,0.18)_0%,rgba(8,39,91,0.12)_50%,rgba(8,39,91,0.5)_100%)]"
      />

      <div className="relative z-10 w-full px-6 py-24 sm:px-10 sm:py-28 md:px-[6%] md:py-32 lg:py-36">
        <div className="max-w-4xl">
          <h1 className="max-w-[850px] text-[clamp(3.4rem,7.6vw,7.3rem)] font-light leading-[0.98] tracking-[-0.055em] text-white">
            Project &amp;
            <br />
            Breakbulk Cargo
          </h1>

          <p className="mt-8 max-w-[900px] text-[clamp(1.05rem,1.7vw,1.55rem)] font-normal leading-[1.5] tracking-[-0.02em] text-white/95 sm:mt-10">
            Sea Lloyd provides tailored logistics solutions for project and breakbulk cargo. From oversized loads and heavy equipment to complex, unconventional freight, we coordinate carefully planned transportation solutions to support efficient and dependable cargo movement.
          </p>

          <a
            href={QUOTE_HREF}
            className="group mt-9 inline-flex min-h-16 items-center gap-7 rounded-full border border-white/45 py-1.5 pl-8 pr-1.5 text-base font-medium text-white transition-colors duration-300 hover:border-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-4 focus-visible:ring-offset-[#2b3386] sm:mt-12 sm:text-lg"
          >
            <span>Request a quote</span>
            <span className="grid size-12 place-items-center rounded-full bg-[#ef7120] text-[#2b3386] transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1">
              <ArrowRight aria-hidden="true" className="size-6" strokeWidth={2.4} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
