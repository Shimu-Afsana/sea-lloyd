'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FAQ = {
  id: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: 'routes',
    question: 'What routes does Sea Lloyd Container Liner Services cover?',
    answer: "Sea Lloyd's shipping network highlights key maritime gateways including Chattogram (CTG), Colombo, Port Klang, and Singapore. We also support India-Bangladesh cargo movements through coordinated sea, rail, road, and inland waterway transport arrangements. Available origin and destination combinations are confirmed according to the shipment requirements and applicable service arrangements.",
  },
  {
    id: 'transit-times',
    question: 'What are the transit times for India-Bangladesh shipments?',
    answer: 'Transit times depend on the selected route, vessel schedule, port operations, cargo readiness, and transport arrangements. Sea Lloyd coordinates shipment planning and provides applicable schedule information during the booking process. Exact transit estimates should be confirmed for each shipment.',
  },
  {
    id: 'container-types',
    question: 'What container types are available for your liner services?',
    answer: 'Container suitability depends on cargo dimensions, weight, nature of the goods, handling requirements, and equipment availability. Share your cargo specifications with Sea Lloyd so that the appropriate container options can be assessed for your shipment.',
  },
  {
    id: 'multimodal',
    question: 'Does Sea Lloyd provide multimodal transportation?',
    answer: 'Sea Lloyd supports coordinated transportation solutions combining sea, rail, road, and inland waterways under an integrated logistics arrangement for suitable cargo movements.',
  },
  {
    id: 'door-to-door',
    question: 'Does Sea Lloyd support door-to-door cargo transportation?',
    answer: "Sea Lloyd's service solutions can be arranged around different cargo movement requirements, including port-to-port, point-to-point, door-to-door, and shelf-to-shelf transportation, depending on the agreed service scope.",
  },
  {
    id: 'ports',
    question: "Which ports are highlighted in Sea Lloyd's shipping network?",
    answer: "Sea Lloyd's highlighted regional port network includes Chattogram (CTG) in Bangladesh, Colombo in Sri Lanka, Port Klang in Malaysia, and Singapore. These locations form key reference points in our regional shipping network visualization.",
  },
  {
    id: 'quotation',
    question: 'What information is required to request a shipping quotation?',
    answer: 'To assess a shipment, customers should provide the cargo type, origin, destination, quantity, dimensions, weight, preferred shipping dates, and any special handling requirements. This information helps Sea Lloyd evaluate suitable shipping arrangements.',
  },
  {
    id: 'coordination',
    question: 'How does Sea Lloyd support cargo delivery and coordination?',
    answer: 'Sea Lloyd focuses on coordinated shipment planning, clear communication, schedule information, and cargo handover arrangements to help customers manage their logistics requirements throughout the shipping process.',
  },
]

export function ContainerLinerFAQ() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const visibleFAQs = showAll ? faqs : faqs.slice(0, 3)

  const toggleFAQ = (id: string) => {
    setActiveId((currentId) => (currentId === id ? null : id))
  }

  const toggleMore = () => {
    setShowAll((current) => !current)
    if (showAll && activeId && !faqs.slice(0, 3).some((faq) => faq.id === activeId)) {
      setActiveId(null)
    }
  }

  return (
    <section aria-labelledby="faq-heading" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-20">
      <div className="mx-auto max-w-[1345px]">
        <h2 id="faq-heading" className="text-center text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.045em] text-[#2b3386]">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-5">
          {visibleFAQs.map((faq) => {
            const isOpen = activeId === faq.id
            const answerId = `answer-${faq.id}`
            return (
              <div key={faq.id} className={`overflow-hidden border bg-white transition-[border-color,box-shadow] duration-300 ${isOpen ? 'border-[#ef7120]/45 shadow-[0_8px_24px_rgba(43,51,134,0.07)]' : 'border-[#dce3f0] hover:border-[#2b3386]/30'}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  id={`question-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex min-h-[72px] w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-medium leading-6 text-[#2b3386] outline-none transition-colors duration-300 hover:bg-[#fbfcff] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ef7120] sm:min-h-[86px] sm:px-7 sm:py-6 sm:text-lg lg:px-8 lg:text-xl"
                >
                  <span>{faq.question}</span>
                  <ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-[#2b3386] transition-all duration-300 ${isOpen ? 'rotate-180 text-[#ef7120]' : ''}`} strokeWidth={1.8} />
                </button>
                <div id={answerId} role="region" aria-labelledby={`question-${faq.id}`} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="border-t border-[#edf0f7] px-5 pb-6 pt-5 text-sm leading-7 text-slate-600 sm:px-7 sm:pb-7 sm:text-[15px] lg:px-8">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <button
            type="button"
            onClick={toggleMore}
            aria-expanded={showAll}
            className="min-h-11 border border-[#cbd5e5] px-7 py-2.5 text-sm font-medium text-[#2b3386] transition-all duration-300 hover:border-[#2b3386] hover:bg-[#2b3386] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-2 active:scale-[0.98] sm:px-9"
          >
            {showAll ? 'Show Less' : 'More FAQs'}
          </button>
        </div>
      </div>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { transition-duration: .01ms !important; scroll-behavior: auto !important; }
        }
      `}</style>
    </section>
  )
}
