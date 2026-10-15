import Link from 'next/link'
import { ArrowUpRight, Ship } from 'lucide-react'

type ContainerLinerServicesHeroProps = {
  
  imageSrc?: string
}

export function ContainerLinerServicesHero({
  imageSrc,
}: ContainerLinerServicesHeroProps) {
  return (
    <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-[#f4f7fb] px-5 py-20 sm:px-8 lg:min-h-[760px] lg:px-12 lg:py-28">
      {imageSrc ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(244,247,251,0.98)_0%,rgba(244,247,251,0.9)_34%,rgba(244,247,251,0.68)_66%,rgba(244,247,251,0.98)_100%)]"
      />
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 -z-10 h-28 bg-[linear-gradient(180deg,transparent,#dfe8f2)] opacity-70" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2b3386] sm:mb-8 sm:text-xs">
          <span className="h-px w-8 bg-[#ef7120] sm:w-12" />
          <span>Container liner services</span>
          <span className="h-px w-8 bg-[#ef7120] sm:w-12" />
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#2b3386] sm:text-5xl md:text-6xl lg:text-7xl">
          Commences Regular Container Liner Services
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8">
          Your single-contract solution combining sea, rail, road, and waterway transport for efficient cargo movement.
        </p>

        <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="#container-services"
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-[3px] bg-[#2b3386] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(43,51,134,0.2)] transition-colors duration-300 hover:bg-[#202766] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-2 active:bg-[#202766]"
          >
            <Ship aria-hidden="true" className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" strokeWidth={1.8} />
            <span>Explore Container Services</span>
            <ArrowUpRight aria-hidden="true" className="size-4 text-[#ef7120] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[3px] border border-[#b7bfd8] bg-white/70 px-6 py-3 text-sm font-semibold text-[#2b3386] transition-colors duration-300 hover:border-[#2b3386] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-2 active:bg-[#eef0f8]"
          >
            Contact Our Team
            <ArrowUpRight aria-hidden="true" className="size-4 text-[#ef7120]" />
          </Link>
        </div>

        <div aria-hidden="true" className="mt-16 hidden h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#b7bfd8] to-transparent opacity-70 sm:block lg:mt-20" />
      </div>
    </section>
  )
}