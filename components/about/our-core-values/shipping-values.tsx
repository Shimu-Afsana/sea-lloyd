'use client'

import { useState } from 'react'
import { ArrowUpRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionKey = 'core' | 'commitments' | 'delivery'
type ValueCard = {
  id: string
  number: string
  category: string
  title: string
  description: string
  microLabel: string
  icon: typeof ShieldCheck
}

const valueGroups: Record<SectionKey, ValueCard[]> = {
  core: [
  {
    id: 'core-safety',
    number: '01',
    category: 'People & planet',
    title: 'Safety, Care & Sustainability',
    description:
      'Protecting our crew, vessels, and cargo comes first. We champion a zero-incident mindset, care for our people, and work to reduce marine pollution and carbon emissions through responsible maritime practices.',
    microLabel: 'Safety first. Every voyage.',
    icon: ShieldCheck,
  },
  {
    id: 'integrity',
    number: '02',
    category: 'Trust & integrity',
    title: 'Integrity & Accountability',
    description:
      'We conduct business with honesty, humility, transparency, and accountability. By respecting international maritime laws, honoring our commitments, and acting responsibly, we build lasting trust with every partner.',
    microLabel: 'Trust in every commitment.',
    icon: Leaf,
  },
  {
    id: 'excellence',
    number: '03',
    category: 'Service & progress',
    title: 'Customer Excellence & Innovation',
    description:
      'We put customers first through dependable delivery, flexible logistics, and lasting partnerships. Empowering our people and embracing digital transformation and sustainable technologies help us deliver better solutions for a changing world.',
    microLabel: 'Built around your needs.',
    icon: Sparkles,
  },
  ],
  commitments: [
    { id: 'commitments-safety', number: '01', category: 'Operational care', title: 'Safety Without Compromise', description: 'We prioritize the safety and well-being of our seafarers, shore-based teams, vessels, and cargo. Our commitment to responsible operations includes pollution prevention, environmental protection, and continuous improvement toward a zero-incident goal.', microLabel: 'Every voyage. Everyone home.', icon: ShieldCheck },
    { id: 'commitments-integrity', number: '02', category: 'Trusted conduct', title: 'Honest Partnerships', description: 'We act with integrity, humility, and transparency in every relationship. We respect applicable international maritime regulations, honor our commitments, and build lasting trust through accountable decisions and responsible conduct.', microLabel: 'Trust built to last.', icon: Leaf },
    { id: 'commitments-planet', number: '03', category: 'Shared future', title: 'People & Planet First', description: 'We empower our people, value teamwork and diversity, and embrace sustainable maritime practices. By exploring cleaner fuels, digital transformation, and modern logistics technologies, we work toward a more responsible future.', microLabel: 'Progress with purpose.', icon: Sparkles },
  ],
  delivery: [
    { id: 'delivery-customer', number: '01', category: 'Partnership', title: 'Customer Dedication', description: 'We put our customers at the center of our decisions. Through clear communication, personalized support, and a focus on long-term partnerships, we work to deliver service that meets their needs.', microLabel: 'Your priorities, our focus.', icon: ShieldCheck },
    { id: 'delivery-logistics', number: '02', category: 'Reliability', title: 'Dependable Logistics', description: 'We stand behind our commitments through responsible coordination, consistent communication, and accountable service. Every shipment deserves attention, care, and a reliable approach from beginning to end.', microLabel: 'Reliable from port to port.', icon: Leaf },
    { id: 'delivery-flexible', number: '03', category: 'Continuous progress', title: 'Flexible & Forward-Thinking', description: 'We adapt to changing customer requirements, from straightforward shipments to complex logistics challenges. By combining collaboration, adaptable solutions, and modern technologies, we continually work to improve our service.', microLabel: 'Ready for what is next.', icon: Sparkles },
  ],
}

function ShipMascot({ activeIndex }: { activeIndex: number }) {
  const rotation = activeIndex === 0 ? -8 : activeIndex === 2 ? 8 : 0
  const translation = activeIndex === 0 ? '-18%' : activeIndex === 2 ? '18%' : '0%'

  return (
    <div className="relative mx-auto mb-7 size-20 sm:mb-8 sm:size-24" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-[#eef0ff]" />
      <svg viewBox="0 0 96 72" className="relative size-full overflow-visible transition-transform duration-[380ms] ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: `translateX(${translation}) rotate(${rotation}deg)` }}>
        <path d="M18 47h61l-8 12H29z" fill="#2b3386" />
        <path d="M24 47V31h37v16" fill="#fff" stroke="#2b3386" strokeWidth="2" />
        <path d="M31 31V19h19v12" fill="#fff" stroke="#2b3386" strokeWidth="2" />
        <path d="M55 25h12v22H55" fill="#ef7120" opacity=".92" />
        <path d="M18 59c10 5 20 5 30 0s20-5 30 0" fill="none" stroke="#ef7120" strokeLinecap="round" strokeWidth="3" />
        <path d="M35 24V13M35 13l9 6" fill="none" stroke="#2b3386" strokeLinecap="round" strokeWidth="2" />
        <circle cx="31" cy="39" r="2.5" fill="#ef7120" />
        <circle cx="40" cy="39" r="2.5" fill="#ef7120" />
        <circle cx="49" cy="39" r="2.5" fill="#ef7120" />
      </svg>
    </div>
  )
}

export default function ShippingValues() {
  const [sectionKey, setSectionKey] = useState<SectionKey>('core')
  const [activeIndex, setActiveIndex] = useState(1)
  const values = valueGroups[sectionKey]

  function selectSection(nextSection: SectionKey) {
    setSectionKey(nextSection)
    setActiveIndex(1)
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#fbfcff] px-4 py-16 text-[#17213d] sm:px-6 sm:py-20 md:px-8 lg:px-10 lg:py-28" aria-labelledby="core-values-heading">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(43,51,134,0.08),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f6f8fc_100%)]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -z-10 h-48 w-[80%] -translate-x-1/2 rounded-[50%] border border-[#2b3386]/[0.05] bg-[#dce8f6]/20 blur-3xl" />
      <div className="mx-auto max-w-[1380px]">
        <header className="mx-auto max-w-3xl text-center">
          <ShipMascot activeIndex={activeIndex} />
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ef7120] sm:text-xs">The Sea Lloyd standard</p>
          <h1 id="core-values-heading" className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#17213d] sm:text-5xl lg:text-6xl">Values That Move Us <span className="text-[#2b3386]">Forward</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#64708a] sm:mt-6 sm:text-lg sm:leading-8">Our values guide every voyage, every partnership, and every promise. They shape how we protect our people, care for the environment, and deliver dependable shipping solutions.</p>
        </header>

        <div className="mx-auto mt-9 flex w-fit max-w-full items-center rounded-full border border-[#aeb8d7] bg-white/90 p-1 shadow-[0_8px_24px_rgba(43,51,134,0.07)] backdrop-blur-sm sm:mt-11" role="tablist" aria-label="Sea Lloyd values sections">
          {([['core', 'Core Values'], ['commitments', 'Our Commitments'], ['delivery', 'How We Deliver']] as const).map(([key, label]) => (
            <button key={key} type="button" role="tab" aria-selected={sectionKey === key} onClick={() => selectSection(key)} className={cn('rounded-full px-3 py-2 text-[11px] font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-2 sm:px-5 sm:text-xs', sectionKey === key ? 'bg-[#2b3386] text-white shadow-sm' : 'text-[#2b3386] hover:bg-[#eef0ff]')}>
              {label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 xl:grid-cols-3" onMouseLeave={() => setActiveIndex(1)}>
          {values.map((value, index) => {
            const Icon = value.icon
            const isActive = index === activeIndex
            return (
              <article key={value.id} className={cn('group relative flex min-h-[370px] flex-col rounded-2xl border bg-white p-6 shadow-[0_8px_30px_rgba(43,51,134,0.05)] transition-all duration-300 sm:p-8 md:min-h-[390px]', isActive ? 'border-[#2b3386]/45 bg-[linear-gradient(145deg,#ffffff_35%,#f1f3ff)] shadow-[0_18px_45px_rgba(43,51,134,0.13)] md:-translate-y-1' : 'border-[#dce3ef] hover:-translate-y-1 hover:border-[#aeb8d7]')}>
                <button type="button" aria-label={`Explore ${value.title}`} aria-pressed={isActive} onClick={() => setActiveIndex(index)} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-4" />
                <div className="relative z-0 flex items-start justify-between">
                  <span className={cn('text-xs font-bold tracking-[0.2em]', isActive ? 'text-[#ef7120]' : 'text-[#a0abc0]')}>{value.number}</span>
                  <span className={cn('flex size-11 items-center justify-center rounded-full border transition-colors duration-300', isActive ? 'border-[#2b3386] bg-[#2b3386] text-white' : 'border-[#d7dfec] text-[#2b3386]')}><Icon className="size-5" aria-hidden="true" /></span>
                </div>
                <div className="relative z-0 mt-auto">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#7b879d]">{value.category}</p>
                  <h2 className="max-w-sm text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#17213d] sm:text-[1.7rem]">{value.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-[#65718a]">{value.description}</p>
                  <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#e4e9f2] pt-5 text-xs font-semibold text-[#2b3386]">
                    <span>{value.microLabel}</span>
                    <ArrowUpRight className={cn('size-5 transition-transform duration-300', isActive && 'translate-x-1 -translate-y-1')} aria-hidden="true" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

