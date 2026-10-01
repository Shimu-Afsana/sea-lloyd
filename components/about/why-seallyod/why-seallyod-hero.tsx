"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  Award,
  Globe2,
  Handshake,
  Share2,
  ShieldCheck,
  X,
} from "lucide-react"

const heroImage = "/why seallyod.avif"

const supportingText =
  "To keep goods moving and business growing."

const actions = [
  { label: "Our reliability", icon: ShieldCheck },
  { label: "Our network", icon: Globe2 },
  { label: "Our commitment", icon: Handshake },
]

const shareOptions = [
  { label: "LinkedIn", icon: Globe2 },
  { label: "Facebook", icon: Award },
  { label: "Instagram", icon: Handshake },
]

export default function WhySeaLloydHero() {
  const [isShareOpen, setIsShareOpen] = useState(false)
  const shareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setIsShareOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsShareOpen(false)
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [])

  return (
    <section
      className="group relative isolate min-h-[560px] overflow-hidden bg-[#111a45] text-white sm:min-h-[610px] lg:min-h-[680px]"
      aria-labelledby="why-sealloyd-hero-title"
    >
      {/* Hero Image */}
      <div
        className="absolute inset-[-3%] -z-20"
        aria-hidden="true"
      >
        <Image
          src={heroImage}
          alt="Sea Lloyd shipping operations"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
          style={{
            animation:
              "heroImageMove 10s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(12,22,61,.84),rgba(25,39,91,.5)_48%,rgba(7,16,45,.6))]"
        aria-hidden="true"
      />

      {/* Water Effect */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-[560px] w-full max-w-[1440px] flex-col px-5 pb-10 pt-5 sm:min-h-[610px] sm:px-8 sm:pb-12 sm:pt-7 lg:min-h-[680px] lg:px-14 lg:pb-16 lg:pt-8">

        {/* Share Button */}
        <div
          className="relative flex justify-end"
          ref={shareRef}
        >
          <button
            type="button"
            aria-label="Share Why Sea Lloyd"
            aria-expanded={isShareOpen}
            aria-haspopup="menu"
            onClick={() => setIsShareOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.12em] text-white backdrop-blur-md transition-colors hover:border-[#ef7120] hover:bg-[#ef7120] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#182559]"
          >
            <Share2 size={14} strokeWidth={1.8} />
            Share
          </button>

          {/* Share Menu */}
          <div
            className={`absolute right-0 top-12 z-20 w-44 origin-top-right rounded-2xl bg-white p-2 text-[#2b3386] shadow-2xl shadow-[#07102d]/30 transition-all duration-250 ${
              isShareOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-[.98] opacity-0"
            }`}
            role="menu"
            aria-hidden={!isShareOpen}
          >
            <div className="flex items-center justify-between px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2b3386]/55">
              <span>Share</span>

              <button
                type="button"
                aria-label="Close share menu"
                onClick={() => setIsShareOpen(false)}
              >
                <X size={13} />
              </button>
            </div>

            {shareOptions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#ef7120]/10 hover:text-[#ef7120] focus-visible:bg-[#ef7120]/10 focus-visible:outline-none"
              >
                <Icon size={16} strokeWidth={1.8} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="m-auto w-full max-w-4xl text-center">

          {/* Small Heading */}
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff9a54] sm:text-sm">
            Why Sea Lloyd
          </p>

          {/* Main Heading */}
          <h1
            id="why-sealloyd-hero-title"
            className="mx-auto mt-5 max-w-4xl text-[clamp(2.5rem,7vw,6.8rem)] font-light leading-[.94] tracking-[-.065em] text-white sm:mt-7"
          >
            Why Choose
            <br />
            <span className="text-white/90">
              SEALLYOD.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/78 sm:mt-8 sm:text-base sm:leading-7">
            {supportingText}
          </p>

          {/* Action Items */}
          <div className="mt-10 grid grid-cols-3 gap-2 sm:mt-14 sm:gap-8">
            {actions.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#why-details"
                className="group/action mx-auto flex max-w-32 flex-col items-center gap-3 text-xs text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-4 focus-visible:ring-offset-[#19275d]"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover/action:-translate-y-1 group-hover/action:border-[#ef7120] group-hover/action:bg-[#ef7120]/20 sm:size-14">
                  <Icon size={21} strokeWidth={1.4} />
                </span>

                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes heroImageMove {
          0% {
            transform: scale(1.03) translate3d(0, 0, 0);
          }

          50% {
            transform: scale(1.08) translate3d(-0.8%, -0.4%, 0);
          }

          100% {
            transform: scale(1.05) translate3d(0.8%, 0.4%, 0);
          }
        }
      `}</style>
    </section>
  )
}