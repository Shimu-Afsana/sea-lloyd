'use client'

import { useEffect, useState } from 'react'

type Section = {
  id: string
  label: string
  title: string
  intro: string
  paragraphs?: string[]
  bullets?: string[]
}

const sections: Section[] = [
  { id: 'overview', 
    label: 'Project Cargo Overview',
    title: 'Project Cargo Overview', 
    intro: 'Project cargo involves planning and transporting oversized, heavy, high-value, or complex equipment that requires specialized logistics coordination. Sea Lloyd approaches each movement as a carefully coordinated operation, considering cargo dimensions, handling requirements, transport routes, and delivery constraints.',
    paragraphs: ['This can include industrial equipment, infrastructure components, oversized machinery, engineering structures, wind energy equipment, generators, and other large industrial components. Every movement benefits from early alignment between transport, handling, routing, and delivery requirements.'] },
  
    { id: 'breakbulk',
      label: 'Breakbulk Cargo', 
      title: 'Breakbulk Cargo',
      intro: 'Breakbulk cargo consists of individual pieces or packages transported separately rather than solely inside standard shipping containers. It is often suitable for cargo with unusual dimensions, specialized handling requirements, or project-specific loading arrangements.', 
      paragraphs: ['Machinery, steel structures, packaged equipment, and industrial components may all require this approach. Appropriate lifting equipment, cargo securing, and port coordination are essential to support a carefully managed movement and a connected industrial supply chain.'] },
  { id: 'types',
    label: 'Types of Cargo', 
    title: 'Cargo Types We Help Coordinate', 
    intro: 'We help coordinate a broad range of project and breakbulk cargo, with each movement reviewed against its specific operational requirements.',
    bullets: ['Heavy industrial machinery and plant equipment.', 'Generators, transformers, and engineering components.', 'Wind energy components and oversized structures.', 'Steel products and fabricated structures.', 'Construction and infrastructure equipment.', 'Crated, palletized, and other non-containerized cargo.', 'Specialized cargo requiring specific handling arrangements.'],
    paragraphs: ['Acceptance depends on cargo specifications, handling requirements, vessel suitability, and applicable regulations.'] },
  { id: 'planning',
    label: 'Transport Planning', 
    title: 'Planning Every Stage of the Journey', 
    intro: 'Successful project cargo movements begin with detailed planning. Cargo dimensions, weight, lifting points, transport routes, port capabilities, and delivery constraints all influence how a shipment should be coordinated.', 
    bullets: ['Collect cargo data and develop a shipment plan.', 'Evaluate routes and transport feasibility.', 'Coordinate road, port, vessel, and delivery operations where applicable.', 'Schedule cargo handling and required equipment.', 'Maintain clear communication with customers, logistics partners, and port stakeholders.'] },
  { id: 'handling', 
    label: 'Heavy-Lift & Handling', 
    title: 'Heavy-Lift and Specialized Handling', 
    intro: "Heavy and oversized cargo may require specialized lifting equipment, engineered lifting arrangements, and carefully coordinated loading and discharge operations. Equipment selection should reflect the cargo's weight, dimensions, lifting points, and the capabilities of available facilities.", 
    bullets: ['Confirm crane and lifting-equipment suitability.', 'Review cargo weight, dimensions, and lifting points.', 'Coordinate lifting plans and operational teams.', 'Plan loading, discharge, and cargo securing arrangements.', 'Consider suitable shore-based or vessel-mounted equipment.'] },
  { id: 'safety', 
    label: 'Safety & Risk Management', 
    title: 'Safety and Risk Management', 
    intro: 'Project and breakbulk shipments require careful attention to cargo stability, lifting procedures, securing arrangements, route constraints, and workplace safety. Identifying risks early helps support safer and better-coordinated transport operations.', 
    bullets: ['Assess cargo condition and handling requirements.', 'Plan appropriate securing and support arrangements.', 'Identify operational and route-related risks early.', 'Coordinate loading teams, transport providers, and port personnel.', 'Consider environmental conditions and applicable safety requirements.'] },
  { id: 'documentation', 
    label: 'Documentation & Coordination', 
    title: 'Documentation and Operational Coordination', 
    intro: 'Complex cargo movements depend on accurate shipment information and clear communication among the parties involved. Appropriate documentation and early coordination help identify operational requirements before cargo reaches critical stages of the journey.', 
    bullets: ['Prepare cargo descriptions, dimensions, weights, and handling instructions.', 'Coordinate transport and shipment documentation as applicable.', 'Align carriers, port operators, and transport partners.', 'Consider customs and regulatory requirements relevant to the route and cargo.', 'Communicate promptly when schedules or handling requirements change.'] },
  { id: 'why-sea-lloyd', 
    label: 'Why Choose Sea Lloyd', 
    title: 'Why Choose Sea Lloyd', 
    intro: 'Sea Lloyd focuses on coordinating complex cargo movements with careful planning, responsive communication, and attention to operational requirements. Our approach emphasizes dependable coordination and solutions shaped around the needs of each shipment.', 
    bullets: ['Cargo-specific planning.', 'Coordinated transport and handling requirements.', 'Attention to shipment safety and securing considerations.', 'Communication throughout the logistics process.', 'Flexible consideration of project-specific requirements.'], 
    paragraphs: ['Talk with Sea Lloyd about your project cargo requirements and the practical considerations for your next movement.'] },
]

export function Content() {
  const [activeId, setActiveId] = useState(sections[0].id)
  const [revealed, setRevealed] = useState<string[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActiveId(visible[0].target.id)
      entries.forEach((entry) => { if (entry.isIntersecting) setRevealed((current) => current.includes(entry.target.id) ? current : [...current, entry.target.id]) })
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] })
    sections.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-white px-5 py-16 text-slate-600 sm:px-8 sm:py-24 lg:px-12 xl:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[minmax(12rem,17rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[18rem_minmax(0,52rem)] xl:gap-24">
        <nav aria-label="On this page" className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-slate-900">On this page</p>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {sections.map((section) => <a key={section.id} href={`#${section.id}`} onClick={() => setActiveId(section.id)} className={`shrink-0 border-b-2 px-1 py-2 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] lg:border-b-0 lg:border-l-2 lg:px-4 ${activeId === section.id ? 'border-[#ef7120] font-semibold text-[#2b3386]' : 'border-transparent text-slate-500 hover:text-[#2b3386]'}`}>{section.label}</a>)}
          </div>
        </nav>

        <main className="min-w-0  rounded-2xl bg-[#2b3386] p-6 sm:p-10 lg:p-12">
          <div className="max-w-4xl">
            {sections.map((section, index) => <section id={section.id} key={section.id} className={`scroll-mt-8 border-t border-slate-200 py-12 first:border-t-0 first:pt-0 sm:py-16 ${revealed.includes(section.id) ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'} transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:opacity-100`}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ef7120]">0{index + 1}</p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">{section.title}</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 text-white">{section.intro}</p>
              {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-6 max-w-3xl text-base leading-8 text-slate-600 text-white">{paragraph}</p>)}
              {section.bullets && <ul className="mt-7 grid gap-3 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-base text-white leading-7"><span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-[#ef7120]" />{bullet}</li>)}</ul>}
            </section>)}
          </div>
        </main>
      </div>
    </section>
  )
}
