import Image from 'next/image'

// Replace this URL with a local asset such as /images/global-logistics/global-logistics-hero.jpg when available.
const HERO_IMAGE =
  '/global-logistics-hero.jpg'

export function GlobalLogisticsHero() {
  return (
    <section className="relative isolate flex min-h-[min(760px,90svh)] items-center overflow-hidden bg-[#101a32] text-white sm:min-h-[680px] lg:min-h-[780px]" aria-labelledby="global-logistics-heading">
      <Image
        src={HERO_IMAGE}
        alt="Container ship at a busy international port"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] motion-safe:animate-[hero-image-in_900ms_ease-out_both] max-sm:object-[63%_center]"
      />
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(90deg,rgba(14,24,48,0.96)_0%,rgba(27,39,86,0.82)_34%,rgba(43,51,134,0.48)_68%,rgba(10,18,35,0.38)_100%)]" />
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(180deg,rgba(9,18,35,0.28)_0%,transparent_48%,rgba(7,14,28,0.52)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-28 sm:px-10 sm:py-32 md:px-14 lg:px-20 lg:py-40 xl:px-24">
        <div className="max-w-3xl motion-safe:animate-[hero-content-in_700ms_120ms_cubic-bezier(.22,1,.36,1)_both]">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#ef7120] sm:mb-6 sm:text-base">
            Global Logistics
          </p>
          <h1 id="global-logistics-heading" className="max-w-2xl text-[clamp(2.65rem,5.2vw,4.9rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.055em] text-white">
            Connecting Global Trade Through Dependable Logistics
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/90 sm:mt-9 sm:text-lg sm:leading-8 lg:text-xl">
            Sea Lloyd brings together international shipping and coordinated logistics solutions to help businesses move cargo across borders. From origin planning to destination handover, we focus on clear communication, dependable coordination, and solutions shaped around each shipment.
          </p>
        </div>
      </div>

      <style>{`\n        @keyframes hero-image-in {\n          from { opacity: 0; transform: scale(1.035); }\n      
          to { opacity: 1; transform: scale(1); }\n        }\n  
                @keyframes hero-content-in {\n          from { opacity: 0; transform: translateY(14px); }\n       
                   to { opacity: 1; transform: translateY(0); }\n        }\n     
                      @media (prefers-reduced-motion: reduce) {\n          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }\n        }\n      `}</style>
    </section>
  )
}
