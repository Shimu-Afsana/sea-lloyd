import { ArrowDownRight, ArrowUpRight, Check, Ship, TrainFront, Truck } from 'lucide-react'

const highlights = [
  { icon: Ship, label: 'Ocean freight' },
  { icon: TrainFront, label: 'Rail connectivity' },
  { icon: Truck, label: 'Road distribution' },
]

export function IntermodalTransportHero() {
  return (
    <main className="min-h-svh bg-[#071a32] text-white">
      <section className="relative isolate flex min-h-svh overflow-hidden" aria-labelledby="hero-title">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-[center_56%]"
          style={{ backgroundImage: "url('/Sea Lloyd Global Logistics at Sunset.png')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,19,47,.94)_0%,rgba(11,31,70,.78)_42%,rgba(17,35,72,.20)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(5,19,47,.84)_0%,transparent_45%)]" />

        <div className="mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 lg:px-14 lg:pb-12 lg:pt-10 xl:px-20">
          

          <div id="top" className="flex flex-1 items-center py-14 sm:py-20 lg:py-24">
            <div className="max-w-[1040px]">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[.24em] text-[#ff8a42] sm:text-xs">
                <span className="h-px w-8 bg-[#ef7120]" /> INTERMODAL TRANSPORT SOLUTIONS
              </p>
              <h1 id="hero-title" className="max-w-[1040px] text-[clamp(3rem,8vw,6rem)] leading-[.94] font-semibold tracking-[-.065em] text-white">
                Intermodal <span className="text-white/80">transport.</span>
              </h1>
              <h2 className="mt-6 max-w-2xl text-xl leading-snug font-medium tracking-[-.025em] text-white sm:mt-7 sm:text-2xl lg:text-[28px]">
                Connecting ports, terminals and destinations.
              </h2>
              <p className="mt-4 max-w-[740px] text-[15px] leading-7 text-white/80 sm:mt-5 sm:text-base sm:leading-8 lg:text-[17px]">
                Sea Lloyd coordinates container-based cargo movements across interconnected transportation networks, bringing together ocean freight, rail transportation, and road distribution. By coordinating transport transfers and shipment arrangements, we help businesses connect international ports with inland logistics destinations through practical intermodal solutions.
              </p>
              <p className="mt-5 max-w-xl border-l-2 border-[#ef7120] pl-4 text-sm leading-6 text-white/90 sm:text-[15px]">
                One cargo unit. Connected transportation stages. A coordinated journey from origin to destination.
              </p>
            </div>
          </div>

          <footer className="border-t border-white/25 pt-5 sm:pt-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 lg:gap-10">
                {highlights.map(({ icon: Icon, label }, index) => (
                  <li key={label} className="flex items-center gap-3 text-sm font-medium text-white sm:text-[15px]">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10">
                      <Icon aria-hidden="true" className="size-4 text-[#ff8a42]" />
                    </span>
                    <span className="flex items-center gap-2"><Check aria-hidden="true" className="size-3.5 text-[#ff8a42]" />{label}</span>
                    <span className="sr-only">Service option {index + 1}</span>
                  </li>
                ))}
              </ul>
              <a href="#hero-title" aria-label="Back to top" className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-white/30 transition hover:bg-white/10 md:flex">
                <ArrowDownRight aria-hidden="true" className="size-5 rotate-[-90deg]" />
              </a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
