import { existsSync } from "node:fs"
import { join } from "node:path"
import Image from "next/image"

const BILL_OF_LADING_HERO_IMAGE =
  "/Bill-Of-Lading.jpg"
const HERO_IMAGE_POSITION = "center 54%"
const HERO_IMAGE_EXISTS = existsSync(
  join(process.cwd(), "public", BILL_OF_LADING_HERO_IMAGE.replace(/^\/+/, "")),
)

export function BillOfLadingHero() {
  return (
    <section className="overflow-hidden bg-[#f8fafc]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-9 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-12 lg:py-[4.5rem]">
        <div className="max-w-[680px]">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ef7120] sm:text-xs">
            <span className="h-px w-8 bg-[#ef7120]" />
            <span>Sea Lloyd <span aria-hidden="true">·</span> E-Services</span>
          </div>
          <h1 className="max-w-[650px] text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[#2b3386] sm:text-5xl lg:text-[3.55rem]">
            Bill of Lading <span className="block">Terms &amp; Conditions</span>
          </h1>
          <p className="mt-6 max-w-[610px] text-base leading-7 text-[#45556c] sm:text-lg sm:leading-8">
            Review the terms and conditions governing the carriage of goods under Sea Lloyd&apos;s Bill of Lading. This document sets out the responsibilities, obligations, and applicable conditions relating to the transportation of goods.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#45556c]">
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#d9dfeb] text-[#2b3386]" aria-hidden="true">29</span>
            <span>Clauses <span className="mx-1 text-[#ef7120]">/</span> Official terms</span>
          </div>
        </div>

        <div className="relative min-h-[235px] overflow-hidden rounded-[1.25rem] border border-[#dfe5ef] bg-[#eaf0f7] shadow-[0_18px_50px_-34px_rgba(43,51,134,0.4)] sm:min-h-[340px] lg:min-h-[390px]">
          {HERO_IMAGE_EXISTS ? (
            <Image
              src={BILL_OF_LADING_HERO_IMAGE}
              alt="Sea Lloyd maritime shipping"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 48vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02] motion-reduce:transition-none"
              style={{ objectPosition: HERO_IMAGE_POSITION }}
            />
          ) : (
            <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(145deg,#eaf0f7_0%,#dbe5f1_48%,#c9d7e9_100%)]" aria-label="Sea Lloyd hero image placeholder" role="img">
              <div className="absolute -right-10 top-8 h-44 w-[70%] -rotate-[13deg] rounded-[45%] border border-white/70 bg-white/35 sm:h-60" />
              <div className="absolute -left-10 bottom-[-4.5rem] h-44 w-[110%] rotate-[-7deg] rounded-[50%] bg-[#2b3386]/10 sm:bottom-[-6rem] sm:h-64" />
              <div className="absolute inset-x-0 bottom-0 h-[35%] bg-[linear-gradient(180deg,transparent,rgba(43,51,134,0.12))]" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ef7120]">Sea Lloyd</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-[#2b3386] sm:text-2xl">Shipping, with clarity.</p>
                </div>
                <span className="mb-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-[#45556c] sm:block">Maritime transport</span>
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/30" />
        </div>
      </div>
    </section>
  )
}
