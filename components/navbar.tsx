'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, ChevronDown, ChevronRight, Globe2, Menu, MoveRight, PackageCheck, Route, Search, Ship, X } from 'lucide-react'

const navGroups = [
  { label: 'About', links: ['About us', 'Our core values', 'Career'] },
  { label: 'Business', links: ['Why Sea Lloyd', 'Vessel', 'Service routes', 'Tracking', 'Schedule'] },
  { label: 'Container', links: ['Specification & measurement', 'Dangerous cargo', 'Refrigerated cargo', 'Special cargo'] },
]

const routes = [
  { code: 'EU–AS', name: 'Europe — Asia', detail: 'Weekly departures · 32 ports', tone: 'bg-[#e9eefb]' },
  { code: 'AS–NA', name: 'Asia — North America', detail: 'Weekly departures · 18 ports', tone: 'bg-[#fff0e6]' },
  { code: 'ME–EU', name: 'Middle East — Europe', detail: 'Bi-weekly departures · 14 ports', tone: 'bg-[#edf5f1]' },
]

function Logo() {
  return (
    <a href="/" className="flex items-center" aria-label="Sea Lloyd home">
      <img
        src="/Sealloyd-logo.png"
        alt="Sea Lloyd"
        className="h-10 w-auto"
      />
    </a>
  )
}

function DesktopNav({ active, setActive }: { active: string | null; setActive: (value: string | null) => void }) {
  return (
    <div className="hidden items-center gap-7 lg:flex" onMouseLeave={() => setActive(null)}>
      <a className="nav-link" href="/">Home</a>
      {navGroups.map((group) => (
        <div key={group.label} className="relative" onMouseEnter={() => setActive(group.label)}>
          <button className={`nav-link inline-flex items-center gap-1 ${active === group.label ? 'text-[#2b3386]' : ''}`} aria-expanded={active === group.label}>
            {group.label}<ChevronDown className={`size-3 transition-transform ${active === group.label ? 'rotate-180' : ''}`} />
          </button>
          {active === group.label && (
            <div className="menu-bridge" onMouseEnter={() => setActive(group.label)} />
          )}
        </div>
      ))}
      <a className="nav-link" href="/bill-of-lading">Bill Of Lading</a>
      <a className="nav-link" href="/agency-network">Agency Network</a>
      <a className="nav-link" href="/articles">Articles</a>
      <a className="nav-link" href="/contact">Contact Us</a>
      <a className="nav-link" href="/tracking">Tracking</a>
    </div>
  )
}

function MegaMenu({ active, setActive }: { active: string | null; setActive: (value: string | null) => void }) {
  if (!active) return null
  const group = navGroups.find((item) => item.label === active)
  if (!group) return null
  return (
    <div className="mega-menu" onMouseEnter={() => setActive(active)} onMouseLeave={() => setActive(null)}>
      <div className="mx-auto flex max-w-7xl gap-12 px-6 py-8 lg:px-10">
        <div className="max-w-xs border-r border-[#dfe3ed] pr-12">
          <p className="eyebrow text-[#ef7120]">Explore</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#182044]">{active} at Sea Lloyd</h2>
          <p className="mt-3 text-sm leading-6 text-[#68708d]">A connected global network, built around your cargo and the markets that matter.</p>
          <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2b3386]">Learn more <ArrowUpRight className="size-4" /></a>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-x-10 gap-y-5 md:grid-cols-3">
          {group.links.map((link, index) => (
            <a href="#services" key={link} className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-[#f4f6fb]">
              <span className="mt-0.5 text-xs font-semibold text-[#9aa1b8]">0{index + 1}</span>
              <span><span className="block text-sm font-semibold text-[#182044] group-hover:text-[#2b3386]">{link}</span><span className="mt-1 block text-xs text-[#8990a9]">Discover the details</span></span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileNav({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white px-5 py-5 lg:hidden">
      <div className="flex items-center justify-between"><Logo /><button onClick={() => setOpen(false)} aria-label="Close menu"><X className="size-6 text-[#182044]" /></button></div>
      <div className="mt-8 space-y-1 sm:mt-12">
        <a href="/" onClick={() => setOpen(false)} className="mobile-link">Home</a>
        {navGroups.map((group) => (
          <div key={group.label} className="border-b border-[#e8eaf1]">
            <button className="mobile-link flex w-full items-center justify-between" onClick={() => setExpanded(expanded === group.label ? null : group.label)}>{group.label}<ChevronDown className={`size-4 transition-transform ${expanded === group.label ? 'rotate-180' : ''}`} /></button>
            {expanded === group.label && <div className="space-y-3 pb-4 pl-4">{group.links.map((link) => <a href={`/${group.label.toLowerCase()}`} onClick={() => setOpen(false)} key={link} className="block text-sm text-[#68708d]">{link}</a>)}</div>}
          </div>
        ))}
        <a href="/bill-of-lading" onClick={() => setOpen(false)} className="mobile-link">Bill Of Lading</a>
        <a href="/agency-network" onClick={() => setOpen(false)} className="mobile-link">Agency Network</a>
        <a href="/articles" onClick={() => setOpen(false)} className="mobile-link">Articles</a>
        <a href="/contact" onClick={() => setOpen(false)} className="mobile-link">Contact Us</a>
        <a href="/tracking" onClick={() => setOpen(false)} className="mobile-link">Tracking</a>
      </div>
    </div>
  )
}

export function Navbar() {
  const [active, setActive] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-6 lg:px-10"><Logo /><DesktopNav active={active} setActive={setActive} /><div className="flex items-center gap-3"><a href="/#tracking" className="hidden items-center gap-2 rounded-full bg-[#2b3386] px-4 py-2.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 sm:flex"><Search className="size-3.5" />Track a shipment</a><button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu className="size-6" /></button></div></div>
        <MegaMenu active={active} setActive={setActive} />
      </header>
      <MobileNav open={mobileOpen} setOpen={setMobileOpen} />
    </>
  )
}


