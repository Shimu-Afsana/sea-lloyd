"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const shipImage = "/M.V. Shamayel.png"

export default function LinerServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewport = window.innerHeight

      // Animation starts when section enters viewport
      // and finishes near the bottom of the section.
      const distance = rect.height - viewport
      const raw = distance > 0 ? -rect.top / distance : 0

      setProgress(Math.min(1, Math.max(0, raw)))
      frame = 0
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /*
    IMPORTANT:
    X movement is intentionally very small.

    Ship:
    upper-right
        ↓
    right-center
        ↓
    lower-right / slightly-left

    It NEVER travels across the text.
  */
  const eased = progress * progress * (3 - 2 * progress)

  const translateX = 100 - eased * 120
  const translateY = -150 + eased * 310
  const scale = 0.76 + eased * 0.30
  const opacity = 0.12 + eased * 0.88
  const rotate = -3 + eased * 3

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[125vh] overflow-hidden bg-white"
    >
      <div className="mx-auto flex min-h-screen max-w-[1440px] items-center px-6 py-24 sm:px-8 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[45%_55%] lg:gap-0">

          {/* =========================
              LEFT — CONTENT ZONE
          ========================== */}
          <div className="relative z-20 max-w-[650px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#EF7120]" />

              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EF7120]">
                Every Shipment. Every Document. One Place.
              </span>
            </div>

            <h2 className="max-w-[620px] text-4xl font-semibold leading-[1.05] tracking-tight text-[#2B3386] sm:text-5xl lg:text-6xl">
              Every Shipment.
              <br />
              Every Document.
              <br />
              One Place.
            </h2>

            <p className="mt-7 max-w-[590px] text-lg leading-8 text-slate-600">
              Access your Bills of Lading, shipping documents and essential
              shipment information—all in one place, with clarity and
              convenience.
            </p>

            <div className="mt-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#EF7120]">
                Liner Services
              </p>

              <div className="space-y-5 text-[15px] leading-7 text-slate-600">
                <p>
                  Sea Lloyd connects Far East-North Asia, Southeast Asia,
                  South Asia, East Africa and the Middle East with global
                  markets by linking the Regional Container Liner and
                  Multimodal Transport Services with its worldwide logistic
                  network, providing integrated, reliable, and cost-competitive
                  logistics solutions.
                </p>

                <p>
                  Our liner services provide reliable, flexible and
                  cost-competitive transportation solutions, combining
                  scheduled sea services with inland transportation and trusted
                  logistics partnerships.
                </p>

                <p>
                  Sea Lloyd operates a diverse fleet serving key regional trade
                  routes, including container vessels, multipurpose
                  container/breakbulk vessels and bulk carriers, with regular
                  port calls and structured sailing schedules.
                </p>

                <p>
                  From point of origin to final destination, we manage the
                  movement of cargo through an integrated combination of ocean
                  transportation, port operations, inland delivery and
                  logistics services—providing our customers with a seamless
                  end-to-end shipping solution.
                </p>
              </div>
            </div>

            <p className="mt-10 max-w-[580px] text-xl font-medium leading-8 text-[#2B3386]">
              From Port to Port. From Origin to Destination.
              <span className="text-[#EF7120]"> We Simply Deliver.</span>
            </p>

            <Link
              href="/business/services-routes"
              className="mt-8 inline-flex items-center gap-3 bg-[#EF7120] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#2B3386]"
            >
              Explore Liner Services
              <span className="text-lg">→</span>
            </Link>
          </div>

          {/* =========================
              RIGHT — SHIP ZONE
          ========================== */}
          <div className="relative h-[560px] w-full overflow-hidden lg:h-[760px]">
            
            {/* Subtle decorative route */}
            <div
              className="pointer-events-none absolute right-[8%] top-[12%] h-[72%] w-[72%] rounded-full border border-dashed border-[#EF7120]/15"
              style={{
                transform: `rotate(${progress * 8 - 4}deg)`,
              }}
            />

            {/* Small route accent */}
            <div
              className="pointer-events-none absolute right-[19%] top-[27%] h-2 w-2 rounded-full bg-[#EF7120] shadow-[0_0_18px_rgba(239,113,32,0.5)]"
              style={{
                opacity: Math.min(1, progress * 2),
              }}
            />

            {/* SHIP
                This entire area is clipped.
                Therefore the ship cannot invade the text column.
            */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute right-[-2%] top-[8%] w-[105%] max-w-[850px] will-change-transform"
                style={{
                  transform: `
                    translate3d(${translateX}px, ${translateY}px, 0)
                    scale(${scale})
                    rotate(${rotate}deg)
                  `,
                  opacity,
                }}
              >
                <Image
                  src={shipImage}
                  alt="Sea Lloyd container ship"
                  width={1000}
                  height={650}
                  priority
                  className="h-auto w-full object-contain drop-shadow-[0_28px_35px_rgba(43,51,134,0.12)]"
                />
              </div>
            </div>

            {/* Soft bottom atmosphere */}
            <div className="pointer-events-none absolute bottom-8 right-[8%] h-32 w-[70%] rounded-full bg-[#2B3386]/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
