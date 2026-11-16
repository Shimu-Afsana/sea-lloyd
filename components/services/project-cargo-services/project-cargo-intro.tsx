'use client'

import { useEffect, useState } from 'react'

const WORDS = [
  'Trusted',
  'Reliable',
  'Dedicated',
  'Committed',
  'Dependable',
  'Responsive',
  'Experienced',
  'Connected',
] as const

export function ProjectCargoIntro() {
  const [wordIndex, setWordIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    const interval = window.setInterval(() => {
      setIsChanging(true)
      window.setTimeout(() => {
        setWordIndex((current) => (current + 1) % WORDS.length)
        setIsChanging(false)
      }, 450)
    }, 2300)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="flex min-h-[620px] items-center bg-white px-5 py-24 text-[#2b3386] sm:min-h-[680px] sm:px-8 sm:py-28 lg:min-h-[720px] lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-[1500px] text-center">
        <p className="intro-fade mb-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ef7120] sm:mb-9 sm:text-xs">
          Sea Lloyd Project Cargo Services
        </p>

        <h1 className="intro-rise mx-auto max-w-[1450px] text-[clamp(2.35rem,4.8vw,4.25rem)] font-medium leading-[1.08] tracking-[-0.045em] text-[#2b3386]">
          Your{' '}
          <span className="word-window mx-1.5 inline-flex w-[10.6ch] min-w-[10.6ch] translate-y-1 items-center justify-center overflow-hidden rounded-[2px] bg-[#2b3386] px-2.5 py-2 align-middle text-[0.78em] font-semibold leading-none text-white sm:mx-2 sm:px-4 sm:py-3">
            <span className={`word-text ${isChanging ? 'word-text-out' : 'word-text-in'}`} aria-live="polite">
              {WORDS[wordIndex]}
            </span>
          </span>{' '}
          Partner for Project Cargo
        </h1>

        <p className="intro-fade-delayed mx-auto mt-10 max-w-[1450px] text-base leading-8 text-slate-500 sm:mt-12 sm:text-lg sm:leading-9 lg:text-[1.3rem] lg:leading-[1.8]">
          Sea Lloyd supports complex project cargo movements through carefully coordinated maritime logistics solutions. From oversized industrial machinery and heavy equipment to infrastructure components and specialized non-containerized shipments, we focus on cargo-specific planning, suitable vessel arrangements, careful handling considerations, and dependable coordination throughout the transportation journey.
        </p>
      </div>

      <style jsx>{`
        .intro-fade,
        .intro-fade-delayed,
        .intro-rise {
          animation: intro-in 700ms cubic-bezier(.22, 1, .36, 1) both;
        }

        .intro-fade-delayed { animation-delay: 140ms; }
        .intro-rise { animation-delay: 70ms; }

        .word-text {
          display: inline-block;
          transition: opacity 450ms ease-in-out, transform 450ms cubic-bezier(.22, 1, .36, 1);
        }

        .word-text-in { opacity: 1; transform: translateY(0); }
        .word-text-out { opacity: 0; transform: translateY(-10px); }

        @keyframes intro-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-fade, .intro-fade-delayed, .intro-rise { animation: none; }
          .word-text { transition: none; }
        }
      `}</style>
    </section>
  )
}
