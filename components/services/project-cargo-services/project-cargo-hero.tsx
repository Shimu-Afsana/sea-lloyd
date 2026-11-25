'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'


const HERO_IMAGE = '/project cargo2.jpg'

const highlights = [
  'Cargo-Specific Planning',
  'Coordinated Heavy Cargo Handling',
  'Maritime Transport Coordination',
]

export function ProjectCargoHero() {
  return (
    <section className="relative isolate min-h-[860px] overflow-x-hidden bg-[#18205d] text-white sm:min-h-[760px] lg:min-h-[86svh] lg:min-h-[700px]">
      <div className="absolute inset-0 -z-20">
        <Image
          src={HERO_IMAGE}
          alt="Project cargo vessel at sea"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover object-[65%_center] sm:object-[68%_center] lg:object-[72%_center]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#2b3386]/55" />
      <div className="absolute inset-0 -z-10 " />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 " />

      <div className="mx-auto flex min-h-[860px] w-full max-w-[1600px] flex-col justify-between px-5 pb-10 pt-28 sm:min-h-[760px] sm:px-8 sm:pb-12 sm:pt-32 md:px-12 lg:min-h-[700px] lg:px-16 lg:pb-14 lg:pt-36 xl:px-24">
        <div className="hero-enter max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#ef7120] sm:mb-6 sm:text-sm">
            Project Cargo Solutions
          </p>
          <h1 className="max-w-3xl text-[clamp(3.4rem,5vw,8rem)] font-bold uppercase leading-[0.86] tracking-[-0.055em] text-white">
            Project Cargo
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-small leading-snug text-white sm:mt-8 sm:text-2xl lg:text-[2rem]">
            Moving Complex Cargo with Precision.
          </p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8 lg:text-lg">
            Sea Lloyd supports the transportation of oversized, heavy, and complex cargo through carefully coordinated maritime logistics solutions. From industrial machinery and infrastructure equipment to specialized project components, we focus on practical shipping arrangements, thoughtful planning, and dependable cargo coordination.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 border-t border-white/25 pt-6 sm:grid-cols-3 sm:gap-6 sm:pt-7 lg:max-w-5xl lg:gap-10">
          {highlights.map((highlight, index) => (
            <li
              key={highlight}
              className="hero-highlight flex items-start gap-3 text-sm font-medium leading-6 text-white/95 sm:items-center sm:text-base lg:text-lg"
              style={{ animationDelay: `${350 + index * 120}ms` }}
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-[#ef7120]/70 bg-[#ef7120]/15 text-[#ef7120] sm:mt-0">
                <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .hero-image {
          animation: hero-zoom 32s ease-in-out infinite alternate;
          transform: scale(1.02);
        }

        @keyframes hero-zoom {
          from { transform: scale(1.02); }
          to { transform: scale(1.06); }
        }

        @keyframes hero-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-enter {
          animation: hero-in 900ms cubic-bezier(.22, 1, .36, 1) both;
        }

        .hero-highlight {
          opacity: 0;
          animation: hero-in 800ms cubic-bezier(.22, 1, .36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-image, .hero-enter, .hero-highlight {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}
