import Image from 'next/image'
import { Check, Link2, ShipWheel } from 'lucide-react'

const HERO_IMAGE =
  '/ocean-freight.jpeg'

const highlights = [
  { number: '01', label: 'Sea Freight', icon: ShipWheel },
  { number: '02', label: 'Multimodal Connectivity', icon: Link2 },
  { number: '03', label: 'Cargo Coordination', icon: Check },
]

export function ContainerLinerHero() {
  return (
    <section
      aria-labelledby="container-liner-heading"
      className="relative isolate flex min-h-[min(760px,90svh)] w-full overflow-hidden bg-[#2b3386] text-white sm:min-h-[680px] lg:min-h-[78svh]"
    >
      <Image
        src={HERO_IMAGE}
        alt="Container vessel carrying cargo at sea"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-[68%_center] motion-safe:animate-[liner-image-reveal_1000ms_ease-out_forwards,liner-image-drift_28s_ease-in-out_1s_infinite_alternate] sm:object-[65%_center] lg:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(43,51,134,0.96)_0%,rgba(43,51,134,0.83)_34%,rgba(43,51,134,0.45)_70%,rgba(43,51,134,0.3)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(21,27,83,0.2)_0%,rgba(43,51,134,0.08)_45%,rgba(18,24,71,0.72)_100%)]"
      />

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-between px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-16 lg:pb-14 lg:pt-36 xl:px-24">
        <div className="max-w-5xl motion-safe:animate-[liner-content-in_700ms_120ms_both]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#ef7120] sm:mb-5 sm:text-sm">
            Container Liner Services
          </p>
          <h1
            id="container-liner-heading"
            className="max-w-5xl text-[clamp(2.7rem,5.5vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.055em] text-balance"
          >
            Connecting Trade with Confidence
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl">
            Your single-contract solution combining sea, rail, road, and waterway transport for efficient India-Bangladesh cargo movement.
          </p>
        </div>

        <ul  className="mt-14 mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 border-t border-white/25 pt-6 sm:mt-16 sm:grid-cols-3 sm:gap-8 sm:pt-7 motion-safe:animate-[liner-content-in_700ms_500ms_both]">
          {highlights.map(({ number, label, icon: Icon }) => (
            <li key={number} className="flex items-center gap-3 text-sm font-semibold text-white/95 sm:text-base lg:text-lg">
              <span className="text-xs font-medium tracking-[0.12em] text-[#ef7120]">{number}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/45 text-white">
                <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes liner-image-reveal {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes liner-image-drift {
          from { transform: scale(1); }
          to { transform: scale(1.035); }
        }
        @keyframes liner-content-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </section>
  )
}
