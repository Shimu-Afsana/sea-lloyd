"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Anchor,
  ArrowUpRight,
  Compass,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Ship,
  Target,
  Users,
} from "lucide-react"

const sections = [
  { id: "history", number: "01", label: "History & Glory" },
  { id: "vision", number: "02", label: "Vision" },
  { id: "mission", number: "03", label: "Our Mission" },
  { id: "identity", number: "04", label: "Identity" },
  { id: "ideology", number: "05", label: "Ideology" },
  { id: "philosophy", number: "06", label: "Philosophy" },
  { id: "approach", number: "07", label: "Approach" },
  {
    id: "commonalities",
    number: "08",
    label: "Commonalities & Differences",
  },
]

export default function AboutContent() {
  const [activeSection, setActiveSection] = useState("history")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = document.getElementById(section.id)

      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id)
          }
        },
        {
          rootMargin: "-18% 0px -62% 0px",
          threshold: 0,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)

    if (!element) return

    const navbarOffset = 110
    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset

    window.scrollTo({
      top,
      behavior: "smooth",
    })
  }

  return (
    <section
      className="bg-white text-[#2B3386]"
      style={{ fontFamily: "Biome, sans-serif" }}
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* =========================================================
              LEFT CONTENT
          ========================================================= */}

          <main className="min-w-0">
            {/* HISTORY */}
            <article
              id="history"
              className="scroll-mt-28 border-b border-[#2B3386]/10 pb-20 lg:pb-28"
            >
              <SectionEyebrow number="01" text="OUR STORY" />

              <h2 className="mt-5 max-w-4xl text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                History & Glory
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#2B3386]/70 sm:text-xl">
                A legacy built on the water, carried forward by people who
                believe the future is always worth navigating toward.
              </p>

              <div className="mt-10 overflow-hidden rounded-[28px] border border-[#2B3386]/10 bg-[#f7f8fc] shadow-[0_20px_60px_rgba(43,51,134,0.08)]">
                <div className="relative aspect-[16/8]">
                  <Image
                    src="/History&Glory.jpg"
                    alt="Sea Lloyd maritime history"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B3386]/30 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-5 py-2 text-sm text-[#2B3386] shadow-lg">
                    Est. 1958
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-[180px_1fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EF7120]">
                    Our Beginning
                  </p>
                  <p className="mt-3 text-lg text-[#2B3386]">
                    Port of Rotterdam
                  </p>
                </div>

                <div className="space-y-5 text-base leading-8 text-[#2B3386]/70">
                  <p>
                    Our beginning was modest: one vessel, one crew, and an
                    instinct for the changing tides of global trade. More than
                    six decades later, that same instinct guides a fleet that
                    connects people, industries, and ideas across the world.
                  </p>

                  <p>
                    We do not measure our history by the years behind us, but
                    by the trust we have earned along the way.
                  </p>
                </div>
              </div>
            </article>

            {/* VISION */}
            <article
              id="vision"
              className="scroll-mt-28 border-b border-[#2B3386]/10 py-20 lg:py-28"
            >
              <SectionEyebrow number="02" text="LOOKING AHEAD" />

              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <h2 className="mt-5 text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                    Vision
                  </h2>

                  <p className="mt-7 text-lg leading-8 text-[#2B3386]/70">
                    Our vision is to be the leading service provider of safe,
                    reliable, and sustainable shipping and logistic solutions,
                    connecting businesses and communities of countries across
                    the globe.
                  </p>

                  <button
                    onClick={() => scrollToSection("mission")}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#EF7120] transition-colors hover:text-[#2B3386]"
                  >
                    Read our mission
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full border border-[#EF7120]/30" />

                  <div className="relative overflow-hidden rounded-[28px] border border-[#2B3386]/10 bg-[#f5f6fb] p-2 shadow-[0_24px_70px_rgba(43,51,134,0.12)]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                      <Image
                        src="/Vision.jpg"
                        alt="Sea Lloyd vision"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  <div className="absolute -bottom-5 -left-5 hidden h-16 w-16 items-center justify-center rounded-full bg-[#EF7120] text-white shadow-xl sm:flex">
                    <Compass size={25} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </article>

            {/* MISSION */}
            <article
              id="mission"
              className="scroll-mt-28 border-b border-[#2B3386]/10 py-20 lg:py-28"
            >
              <SectionEyebrow number="03" text="WHAT DRIVES US" />

              <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <h2 className="mt-5 text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                    Our Mission
                  </h2>

                  <p className="mt-7 text-lg leading-8 text-[#2B3386]/70">
                    Our mission is to provide innovative shipping, logistic and
                    multimodal transport services that meet the evolving needs
                    of our customers, while promoting excellence in everything
                    we do.
                  </p>

                  <p className="mt-5 text-base leading-8 text-[#2B3386]/65">
                    We're committed to building long-term relationships with
                    our customers, partners, and communities, and to making a
                    positive impact on the world around us.
                  </p>

                  <div className="mt-9 grid gap-4 sm:grid-cols-2">
                    <MissionCard
                      icon={<HeartHandshake size={20} />}
                      title='Generating "Hope"'
                      text="Building lasting relationships through trust, care and dependable service."
                    />

                    <MissionCard
                      icon={<Target size={20} />}
                      title='Delivering "Quality"'
                      text="Creating consistent shipping solutions with attention to every detail."
                    />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[28px] border border-[#2B3386]/10 bg-[#f5f6fb] p-2 shadow-[0_24px_70px_rgba(43,51,134,0.10)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                    <Image
                      src="/Mission.jpg"
                      alt="Sea Lloyd mission"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </article>

            {/* IDENTITY */}
            <article
              id="identity"
              className="scroll-mt-28 border-b border-[#2B3386]/10 py-20 lg:py-28"
            >
              <SectionEyebrow number="04" text="OUR CHARACTER" />

              <h2 className="mt-5 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                Identity
              </h2>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#2B3386]/70">
                Our identity is built around maritime experience, meaningful
                relationships, responsible growth and a clear commitment to
                delivering quality.
              </p>

              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                <IdentityCard
                  icon={<Anchor />}
                  title="Name & Memorable Impact"
                  text="Sea Lloyd represents movement, connection and a lasting presence across the maritime world."
                />

                <IdentityCard
                  icon={<Ship />}
                  title="Logo & Maritime Pride"
                  text="Our visual identity reflects our connection to ships, oceans and international trade."
                />

                <IdentityCard
                  icon={<Globe2 />}
                  title="Colors: Roots & Prosperity"
                  text="Our colors represent trust, stability, energy and the ambition to connect markets."
                />

                <IdentityCard
                  icon={<Users />}
                  title="Commitment & Values"
                  text="People, reliability and long-term partnerships remain at the heart of Sea Lloyd."
                />
              </div>
            </article>

            {/* IDEOLOGY */}
            <article
              id="ideology"
              className="scroll-mt-28 border-b border-[#2B3386]/10 py-20 lg:py-28"
            >
              <SectionEyebrow number="05" text="OUR IDEOLOGY" />

              <h2 className="mt-5 text-4xl tracking-[-0.03em] sm:text-5xl">
                Purpose-Driven Thinking
              </h2>

              <p className="mt-7 max-w-4xl text-lg leading-8 text-[#2B3386]/70">
                Our ideology is distinct and purpose-driven, acknowledging the
                inherent differences across communities, states, and nations.
                We embrace these varied perspectives, striving for a unique path
                tailored to our specific context and ambitions.
              </p>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Purpose-Driven & Nation-Focused",
                  "Adaptive Approach & Unique Abilities",
                  "Distinct Methods & Quality Services",
                  "Economic Contribution & Growth",
                  "Clear Focus & Developed Nation Goal",
                  "Empowering Maritime Future",
                ].map((title, index) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-[#2B3386]/10 bg-[#fafaff] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#EF7120]/40 hover:shadow-[0_15px_40px_rgba(43,51,134,0.08)]"
                  >
                    <span className="text-sm font-semibold text-[#EF7120]">
                      0{index + 1}
                    </span>

                    <h3 className="mt-5 text-xl leading-tight text-[#2B3386]">
                      {title}
                    </h3>
                  </div>
                ))}
              </div>
            </article>

            {/* PHILOSOPHY */}
            <article
              id="philosophy"
              className="scroll-mt-28 border-b border-[#2B3386]/10 py-20 lg:py-28"
            >
              <SectionEyebrow number="06" text="OUR PHILOSOPHY" />

              <h2 className="mt-5 text-4xl tracking-[-0.03em] sm:text-5xl">
                Moving Forward Together
              </h2>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "NICHE CARRIER",
                  "UNITED FORCE",
                  "UNIFIED",
                  "THE TASK",
                  "INCOMPARABLE",
                  "FUTURE EXPLORATION",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="group rounded-2xl border border-[#2B3386]/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-[#2B3386] hover:text-white"
                  >
                    <Lightbulb
                      size={22}
                      className="text-[#EF7120] transition-transform duration-300 group-hover:rotate-6"
                    />

                    <p className="mt-8 text-lg font-semibold tracking-[0.08em]">
                      {item}
                    </p>

                    <span className="mt-3 block text-sm text-[#2B3386]/50 group-hover:text-white/60">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            {/* APPROACH */}
            <article
              id="approach"
              className="scroll-mt-28 border-b border-[#2B3386]/10 py-20 lg:py-28"
            >
              <SectionEyebrow number="07" text="OUR APPROACH" />

              <h2 className="mt-5 text-4xl tracking-[-0.03em] sm:text-5xl">
                Experience Put Into Action
              </h2>

              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <div className="rounded-[26px] bg-[#2B3386] p-8 text-white lg:p-10">
                  <p className="text-lg leading-8 text-white/85">
                    Our approach is firmly rooted in our extensive
                    capabilities, which are meticulously built upon a foundation
                    of deep knowledge, specialized expertise, and invaluable
                    practical experience.
                  </p>
                </div>

                <div className="rounded-[26px] border border-[#2B3386]/10 bg-[#fafaff] p-8 lg:p-10">
                  <p className="text-base leading-8 text-[#2B3386]/70">
                    We align our business activities directly with the evolving
                    requirements of our valued customers and the dynamic demands
                    of the region's emerging economy.
                  </p>

                  <p className="mt-5 text-base leading-8 text-[#2B3386]/70">
                    Our operational skills, abilities, and hands-on experience
                    enable us to deliver quality shipping services that exceed
                    expectations.
                  </p>
                </div>
              </div>
            </article>

            {/* COMMONALITIES */}
            <article
              id="commonalities"
              className="scroll-mt-28 py-20 lg:py-28"
            >
              <SectionEyebrow number="08" text="OUR DIFFERENCE" />

              <h2 className="mt-5 text-4xl tracking-[-0.03em] sm:text-5xl">
                Commonalities & Differences
              </h2>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="rounded-[26px] border border-[#2B3386]/10 bg-[#fafaff] p-8 lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EF7120]">
                    Commonalities
                  </p>

                  <p className="mt-6 text-base leading-8 text-[#2B3386]/70">
                    The difference between Sea Lloyd and other shipping lines,
                    in terms of carrying goods from places to places, is
                    fundamentally about the services, capabilities and
                    solutions each organization provides.
                  </p>

                  <p className="mt-5 text-base leading-8 text-[#2B3386]/70">
                    Sea Lloyd operates in the same broad shipping, container
                    liner and multimodal transport-logistics industry while
                    using established maritime, port, inland and logistics
                    infrastructure.
                  </p>
                </div>

                <div className="rounded-[26px] bg-[#2B3386] p-8 text-white lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EF7120]">
                    Differences
                  </p>

                  <ul className="mt-7 space-y-5">
                    {[
                      "Diverse, distinct and defined objectives.",
                      "Playing a meaningful role in economic development.",
                      "Different ways and means of meeting stated objectives.",
                      "A purpose-driven operational philosophy.",
                      "Commitment to customers, communities and sustainable growth.",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-7 text-white/85"
                      >
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF7120]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </main>

          {/* =========================================================
              STICKY TABLE OF CONTENTS
          ========================================================= */}

          <aside className="lg:relative">
            <div className="lg:sticky lg:top-[120px]">
              <div className="border-l border-[#2B3386]/10 pl-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EF7120]">
                  On this page
                </p>

                <h3 className="mt-3 text-xl text-[#2B3386]">
                  Explore Sea Lloyd
                </h3>

                <nav className="mt-7">
                  <ul className="space-y-1">
                    {sections.map((section) => {
                      const active = activeSection === section.id

                      return (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(section.id)}
                            className={`group flex w-full items-start gap-3 rounded-r-xl border-l-2 px-4 py-3 text-left transition-all duration-300 ${
                              active
                                ? "border-[#EF7120] bg-[#EF7120]/10 text-[#2B3386]"
                                : "border-transparent text-[#2B3386]/55 hover:border-[#EF7120]/40 hover:bg-[#EF7120]/5 hover:text-[#2B3386]"
                            }`}
                          >
                            <span
                              className={`pt-0.5 text-[11px] font-semibold ${
                                active
                                  ? "text-[#EF7120]"
                                  : "text-[#2B3386]/35"
                              }`}
                            >
                              {section.number}
                            </span>

                            <span className="text-sm leading-5">
                              {section.label}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionEyebrow({
  number,
  text,
}: {
  number: string
  text: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold tracking-[0.18em] text-[#EF7120]">
        {number}
      </span>

      <span className="h-px w-10 bg-[#EF7120]" />

      <span className="text-xs font-semibold tracking-[0.2em] text-[#2B3386]">
        {text}
      </span>
    </div>
  )
}

function MissionCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div className="rounded-2xl border border-[#2B3386]/10 bg-[#fafaff] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#EF7120]/30 hover:shadow-lg">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EF7120]/10 text-[#EF7120]">
        {icon}
      </div>

      <h3 className="mt-5 text-lg text-[#2B3386]">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#2B3386]/60">{text}</p>
    </div>
  )
}

function IdentityCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div className="group rounded-[24px] border border-[#2B3386]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#EF7120]/40 hover:shadow-[0_20px_50px_rgba(43,51,134,0.08)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2B3386]/5 text-[#2B3386] transition-colors group-hover:bg-[#EF7120] group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-xl text-[#2B3386]">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-[#2B3386]/60">{text}</p>
    </div>
  )
}