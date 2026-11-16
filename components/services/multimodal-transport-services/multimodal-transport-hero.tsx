import Image from 'next/image'
import { Check, Globe2, Network, Package } from 'lucide-react'

const HERO_IMAGE = '/Sea Lloyd Multimodal Harbor at Sunrise.png'

const highlights = [
  { title: 'Integrated Transport', label: 'Sea, Road & Rail Connectivity', icon: Network },
  { title: 'Specialized Cargo Planning', label: 'Project & Oversized Cargo', icon: Package },
  { title: 'Coordinated Logistics', label: 'Connected Cargo Movement', icon: Globe2 },
]

export function MultimodalTransportHero() {
  return (
    <section className="relative isolate min-h-[min(900px,100svh)] overflow-hidden bg-[#18205e] text-white sm:min-h-[760px]" aria-labelledby="multimodal-hero-title">
      <style>{`
        @keyframes multimodal-image-in {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes multimodal-image-drift {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes multimodal-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .multimodal-image-in { animation: multimodal-image-in 1100ms cubic-bezier(.22,1,.36,1) both, multimodal-image-drift 32s ease-in-out 1100ms infinite; }
        .multimodal-rise { animation: multimodal-rise 800ms cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .multimodal-image-in, .multimodal-rise { animation: none; }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt="Container vessel moving across open water"
          fill
          priority
          sizes="100vw"
          className="multimodal-image-in object-cover object-[68%_center] sm:object-[72%_center] lg:object-[75%_center]"
        />
        <div className="absolute inset-0 bg-[#2b3386]/1" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151d59] via-[#2b3386]/5 to-[#2b3386]/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111846]/85 via-transparent to-[#17205c]/1" />
      </div>

      <div className="relative mx-auto flex min-h-[min(900px,100svh)] w-full max-w-[1600px] flex-col justify-between px-6 py-12 sm:min-h-[760px] sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-20">
        <div className="max-w-[820px] pt-8 sm:pt-12 lg:pt-16">
          <p className="multimodal-rise mb-5 text-[11px] font-semibold tracking-[0.28em] text-[#ff9a5c] opacity-0 [animation-delay:150ms] sm:text-xs" style={{ animationFillMode: 'forwards' }}>
            MULTIMODAL TRANSPORT SOLUTIONS
          </p>
          <h1 id="multimodal-hero-title" className="multimodal-rise max-w-[780px] text-[clamp(2rem,5vw,6.25rem)] font-bold uppercase leading-[0.94] tracking-[-0.045em] opacity-0 [animation-delay:280ms]" style={{ animationFillMode: 'forwards' }}>
            Integrated transport <span className="text-white/90">for complex cargo</span>
          </h1>
          <p className="multimodal-rise mt-7 max-w-[760px] text-base leading-7 text-white/80 opacity-0 [animation-delay:440ms] sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl" style={{ animationFillMode: 'forwards' }}>
            Sea Lloyd connects sea, road, rail, and inland waterways through coordinated multimodal transportation solutions. From project cargo and oversized equipment to diverse commercial shipments, we focus on practical transport planning, efficient cargo coordination, and dependable movement across every stage of the logistics journey.
          </p>
          <p className="multimodal-rise mt-5 max-w-[620px] text-sm font-medium tracking-wide text-white/95 opacity-0 [animation-delay:560ms] sm:text-base" style={{ animationFillMode: 'forwards' }}>
            One coordinated approach. Multiple transport possibilities. Connected cargo movements.
          </p>
        </div>

        <div className="multimodal-rise grid gap-5 border-t border-white/25 pt-6 opacity-0 [animation-delay:720ms] sm:grid-cols-3 sm:gap-6 sm:pt-8 lg:max-w-[1040px] lg:gap-10" style={{ animationFillMode: 'forwards' }}>
          {highlights.map(({ title, label, icon: Icon }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-[#ff9a5c]/70 bg-[#2b3386]/55 text-[#ffb07a]">
                <Icon className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wide text-white sm:text-base">{title}</p>
                <p className="mt-1 text-xs leading-5 text-white/65 sm:text-sm">{label}</p>
              </div>
              <Check className="ml-auto mt-1 hidden size-4 text-white/50 sm:block" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
