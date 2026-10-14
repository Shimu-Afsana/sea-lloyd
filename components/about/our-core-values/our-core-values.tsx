'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type CoreValue = {
  id: string
  number: string
  title: string
  description: string
  caption: string
  image: string
  alt: string
}

const coreValues: CoreValue[] = [
  {
    id: 'employees',
    number: '01',
    title: 'Our Employees',
    description:
      'We believe our employees are our greatest asset. We foster a culture of growth, respect, and opportunity where every individual can thrive.',
    caption: 'People Behind Every Promise',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1400&q=85',
    alt: 'Logistics team members collaborating in a warehouse',
  },
  {
    id: 'care',
    number: '02',
    title: 'Enduring Care',
    description:
      'We handle every shipment, client relationship, and responsibility with unwavering attention and dedication, ensuring reliability at every step.',
    caption: 'Care at Every Step',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
    alt: 'Cargo containers being carefully handled at a port',
  },
  {
    id: 'respect',
    number: '03',
    title: 'Grounded Respect',
    description:
      'Humility guides our interactions. We value collaboration, listening, and learning from every experience and every partner.',
    caption: 'Stronger Through Collaboration',
    image: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1400&q=85',
    alt: 'Warehouse colleagues working together beside freight',
  },
  {
    id: 'integrity',
    number: '04',
    title: 'Integrity First',
    description:
      'We operate with honesty, transparency, and accountability, ensuring trust in every decision and action.',
    caption: 'Trust in Every Detail',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=85',
    alt: 'Professional reviewing shipment documentation',
  },
  {
    id: 'promise',
    number: '05',
    title: 'Our Name, Our Promise',
    description:
      "The Sea Lloyd name represents professionalism, reliability, and commitment. Every action we take reflects our brand's reputation and legacy.",
    caption: 'A Promise That Travels Further',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1400&q=85',
    alt: 'Container vessel sailing through an international port',
  },
]

export function OurCoreValues() {
  const [activeId, setActiveId] = useState(coreValues[0].id)
  const activeValue = coreValues.find((value) => value.id === activeId) ?? coreValues[0]

  return (
    <section className="relative isolate overflow-hidden bg-[#f7f9fc] px-5 py-20 text-[#17213d] sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(#c9d4e6_0.75px,transparent_0.75px)] [background-size:24px_24px]" />
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(300px,0.82fr)_minmax(480px,1.18fr)] lg:items-center lg:gap-20 xl:gap-28">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-[#ef7120]">The Sea Lloyd standard</p>
          <h3 className="max-w-md text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#2b3386] sm:text-5xl lg:text-[3.5rem]">
            Sea Lloyd Core Values
          </h3>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#5f6b82] sm:text-lg sm:leading-8">
            At Sea Lloyd, our core values define who we are, guide our actions, and shape the way we serve our clients and communities. They are the principles that keep us grounded and drive our commitment to excellence.
          </p>

          <div className="mt-12 border-t border-[#d8e0ec]">
            {coreValues.map((value) => {
              const isActive = value.id === activeId
              return (
                <div key={value.id} className="border-b border-[#d8e0ec]">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-label={`View ${value.title} value`}
                    onClick={() => setActiveId(value.id)}
                    className={cn(
                      'group flex min-h-20 w-full items-center gap-4 py-5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-4',
                      isActive ? 'text-[#2b3386]' : 'text-[#6c7688] hover:text-[#2b3386]',
                    )}
                  >
                    <span className={cn('w-8 shrink-0 text-xs font-semibold tracking-[0.16em] transition-colors', isActive ? 'text-[#ef7120]' : 'text-[#a5afbf]')}>
                      {value.number}
                    </span>
                    <span className="flex-1 text-xl font-medium tracking-[-0.02em] sm:text-2xl">{value.title}</span>
                    <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300', isActive ? 'border-[#ef7120] bg-[#ef7120] text-white' : 'border-[#bdc8d8] text-[#2b3386] group-hover:border-[#2b3386]')}>
                      <Plus className={cn('size-4 transition-transform duration-300', isActive && 'rotate-45')} aria-hidden="true" />
                    </span>
                  </button>
                  <div className={cn('grid transition-[grid-template-rows,opacity] duration-400 ease-out', isActive ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                    <p className="min-h-0 overflow-hidden pl-12 pr-8 text-sm leading-6 text-[#667188]">{value.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgba(43,51,134,0.2),transparent_68%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-[#d9e2ef] shadow-[0_24px_70px_rgba(43,51,134,0.16)]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img key={activeValue.id} src={activeValue.image} alt={activeValue.alt} className="absolute inset-0 size-full animate-[core-value-image_450ms_ease-out] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101b3d]/80 via-transparent to-[#101b3d]/5" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-9">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#f6a06d]">{activeValue.number} / 05</p>
                  <p className="text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">{activeValue.caption}</p>
                </div>
                <span className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-white/35 text-sm text-white sm:flex">↗</span>
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#758096]">A culture built on people, responsibility, and a commitment that reaches every corner of the world.</p>
        </div>
      </div>
      <style jsx>{`@keyframes core-value-image { from { opacity: 0; transform: scale(1.03) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } } @media (prefers-reduced-motion: reduce) { img { animation: none; } }`}</style>
    </section>
  )
}

export default OurCoreValues
