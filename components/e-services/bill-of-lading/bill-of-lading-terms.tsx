
"use client"

import { useEffect, useRef, useState } from "react"
import {
  billOfLadingClauses,
  billOfLadingIntro,
} from "@/app/data/e-services/bill-of-lading-terms"

export function BillOfLadingTerms() {
  const [activeId, setActiveId] = useState(
    billOfLadingClauses[0]?.id ?? "",
  )
  const [menuOpen, setMenuOpen] = useState(false)

  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  // Scroll spy: detects the currently visible clause
  useEffect(() => {
    const sections = billOfLadingClauses
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    let ticking = false

    const updateActiveSection = () => {
      if (ticking) return

      ticking = true

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 180

        const pageBottom =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 5

        if (pageBottom) {
          setActiveId(sections[sections.length - 1].id)
          ticking = false
          return
        }

        let currentSection = sections[0]

        for (const section of sections) {
          if (section.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
            currentSection = section
          } else {
            break
          }
        }

        setActiveId(currentSection.id)
        ticking = false
      })
    }

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    })

    window.addEventListener("resize", updateActiveSection)

    updateActiveSection()

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [])

  // Automatically keep active sidebar option visible
  useEffect(() => {
    const link = linkRefs.current[activeId]
    const nav = link?.closest("nav")

    if (!link || !nav) return

    const navBounds = nav.getBoundingClientRect()
    const linkBounds = link.getBoundingClientRect()

    if (linkBounds.top < navBounds.top + 12) {
      nav.scrollTo({
        top: nav.scrollTop - (navBounds.top + 12 - linkBounds.top),
        behavior: "smooth",
      })
    } else if (linkBounds.bottom > navBounds.bottom - 12) {
      nav.scrollTo({
        top: nav.scrollTop + (linkBounds.bottom - navBounds.bottom + 12),
        behavior: "smooth",
      })
    }
  }, [activeId])

  const activeClause =
    billOfLadingClauses.find((clause) => clause.id === activeId) ??
    billOfLadingClauses[0]

  const activeNumber = activeClause?.number ?? "01"

  function navigateToClause(id: string) {
    setActiveId(id)
    setMenuOpen(false)

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-12 lg:pt-[4.5rem]">

      {/* Header */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-[#e2e8f0] pb-5 sm:mb-10">
        <div>
          <div className="mb-3 h-[3px] w-10 rounded-full bg-[#ef7120]" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef7120]">
            Bill of Lading
            <span className="mx-1 text-[#b7c0d0]">/</span>
            Terms &amp; Conditions
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#2b3386] sm:text-3xl">
            Terms of carriage
          </h2>
        </div>

        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#45556c]">
          Clause {activeNumber}
          <span className="px-1 text-[#ef7120]">of</span>
          {billOfLadingClauses.length}
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(250px,300px)_minmax(0,1fr)] lg:gap-12 xl:gap-16">

        {/* LEFT STICKY SIDEBAR */}
        <aside className="hidden self-start lg:sticky lg:top-24 lg:block">

          <nav
            aria-label="Bill of Lading clauses"
            className="max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-sm"
          >
            <div className="sticky top-0 z-10 border-b border-[#e2e8f0] bg-white px-3 pb-4 pt-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2b3386]">
                Contents
              </p>

              <p className="pt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#45556c]">
                Bill of Lading · {billOfLadingClauses.length} clauses
              </p>
            </div>

            <ol className="mt-3 flex flex-col gap-1">
              {billOfLadingClauses.map((clause) => {
                const active = activeId === clause.id

                return (
                  <li key={clause.id}>
                    <a
                      ref={(node) => {
                        linkRefs.current[clause.id] = node
                      }}
                      href={`#${clause.id}`}
                      aria-current={active ? "location" : undefined}
                      onClick={(event) => {
                        event.preventDefault()
                        navigateToClause(clause.id)
                      }}
                      className={`block rounded-md border-l-[3px] px-3 py-3 text-[13px] leading-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b3386] focus-visible:ring-offset-2 ${
                        active
                          ? "border-[#ef7120] bg-[#f4f5ff] font-semibold text-[#2b3386]"
                          : "border-transparent text-[#45556c] hover:border-[#ef7120]/40 hover:bg-[#f8fafc] hover:text-[#2b3386]"
                      }`}
                    >
                      <span className="mr-2 text-[11px] font-semibold tabular-nums text-[#ef7120]">
                        {clause.number}
                      </span>

                      {clause.title}
                    </a>
                  </li>
                )
              })}
            </ol>
          </nav>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="min-w-0">

          {/* MOBILE NAVIGATION */}
          <div className="sticky top-0 z-20 -mx-5 mb-6 border-y border-[#e2e8f0] bg-white/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-clause-list"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex min-h-11 w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b3386]"
            >
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ef7120]">
                  Contents · {activeNumber}
                </span>

                <span className="mt-0.5 block truncate text-sm font-medium text-[#2b3386]">
                  {activeClause?.title}
                </span>
              </span>

              <svg
                aria-hidden="true"
                className={`size-4 shrink-0 text-[#2b3386] transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="m5 7.5 5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {menuOpen && (
              <nav
                id="mobile-clause-list"
                aria-label="Bill of Lading clauses"
                className="mt-3 max-h-[min(58vh,420px)] overflow-y-auto border-t border-[#e2e8f0] pt-2"
              >
                <ol className="flex flex-col gap-0.5">
                  {billOfLadingClauses.map((clause) => {
                    const active = activeId === clause.id

                    return (
                      <li key={clause.id}>
                        <a
                          href={`#${clause.id}`}
                          aria-current={active ? "location" : undefined}
                          onClick={(event) => {
                            event.preventDefault()
                            navigateToClause(clause.id)
                          }}
                          className={`block min-h-11 border-l-[3px] px-3 py-2.5 text-sm leading-5 transition-colors ${
                            active
                              ? "border-[#ef7120] bg-[#f4f5ff] font-semibold text-[#2b3386]"
                              : "border-transparent text-[#45556c] hover:bg-[#f8fafc]"
                          }`}
                        >
                          <span className="mr-2 text-xs tabular-nums text-[#ef7120]">
                            {clause.number}
                          </span>

                          {clause.title}
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </nav>
            )}
          </div>

          {/* ARTICLE CONTENT */}
          <article className="min-w-0">

            <p className="mb-8 border-l-2 border-[#ef7120] pl-4 text-base leading-7 text-[#45556c] sm:mb-10 sm:pl-5 sm:text-[17px] sm:leading-[1.85]">
              {billOfLadingIntro}
            </p>

            <div className="mb-8 flex items-center justify-between border-b border-[#e2e8f0] pb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#45556c]">
              <span>Official terms</span>
              <span>{billOfLadingClauses.length} clauses</span>
            </div>

            <div className="divide-y divide-[#e2e8f0]">

              {billOfLadingClauses.map((clause) => (
                <section
                  id={clause.id}
                  key={clause.id}
                  aria-labelledby={`${clause.id}-heading`}
                  className="scroll-mt-28 py-8 first:pt-0 sm:py-10"
                >
                  <h3
                    id={`${clause.id}-heading`}
                    className="mb-5 flex items-start gap-3 text-xl font-semibold leading-tight tracking-[-0.02em] text-[#2b3386] sm:text-[25px]"
                  >
                    <span className="mt-0.5 shrink-0 text-sm font-semibold tabular-nums tracking-normal text-[#ef7120] sm:text-base">
                      {clause.number}
                    </span>

                    <span>{clause.title}</span>
                  </h3>

                  <div className="flex flex-col gap-4 text-[15px] leading-[1.8] text-[#45556c] sm:text-[16px] sm:leading-[1.85]">

                    {clause.blocks.map((block, index) =>
                      block.type === "subheading" ? (
                        <h4
                          key={`${clause.id}-sub-${index}`}
                          className="pt-1 text-base font-semibold leading-7 text-[#2b3386] sm:text-[17px]"
                        >
                          {block.text}
                        </h4>
                      ) : (
                        <p
                          key={`${clause.id}-p-${index}`}
                          className="whitespace-pre-line"
                        >
                          {block.text}
                        </p>
                      ),
                    )}

                  </div>
                </section>
              ))}

            </div>
          </article>
        </div>
      </div>

      {/* DOWNLOAD SECTION */}
      <div className="mt-8 border-t border-[#e2e8f0] pt-8 text-center sm:mt-12 sm:pt-10">

        <p className="mb-4 text-sm text-[#45556c]">
          Keep a copy of the official Bill of Lading terms for your records.
        </p>

        <a
          href="/documents/bill-of-lading-final-copy.pdf"
          download="Bill-Of-Lading-Final-Copy.pdf"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2b3386] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222a73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b3386] focus-visible:ring-offset-2 active:bg-[#1e2567]"
        >
          <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 2.75v9.5m0 0 3.5-3.5M10 12.25l-3.5-3.5M3.5 13.25v2A1.75 1.75 0 0 0 5.25 17h9.5a1.75 1.75 0 0 0 1.75-1.75v-2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Download the PDF
        </a>
      </div>
    </section>
  )
}

