
type ProcessStep = {
  id: string
  number: string
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    id: 'requirements',
    number: '01',
    title: 'Understanding Your Requirements',
    description:
      'We begin by understanding your cargo requirements, origin, destination, shipment priorities, and logistics objectives.',
  },
  {
    id: 'route',
    number: '02',
    title: 'Planning the Route',
    description:
      'We evaluate suitable shipping routes, transport modes, schedules, and coordination requirements to establish an appropriate logistics plan.',
  },
  {
    id: 'preparation',
    number: '03',
    title: 'Preparing the Shipment',
    description:
      'We coordinate shipment readiness, relevant documentation, cargo information, and origin-side arrangements before dispatch.',
  },
  {
    id: 'movement',
    number: '04',
    title: 'Coordinating Cargo Movement',
    description:
      'We coordinate transport milestones, shipping activities, and communication between relevant parties throughout the cargo journey.',
  },
  {
    id: 'follow-up',
    number: '05',
    title: 'Destination & Follow-Up',
    description:
      'We support destination coordination, cargo handover, and shipment follow-up to help bring each logistics movement to a clear conclusion.',
  },
]

export function GlobalLogisticsProcess() {
  return (
    <section
      className="overflow-hidden bg-[#f4f0e8] py-20 text-[#2b3386] sm:py-24 lg:py-28"
      aria-labelledby="global-logistics-process-title"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 xl:px-20">
        <header className="mx-auto max-w-4xl text-center opacity-0 motion-safe:animate-[process-heading-in_650ms_cubic-bezier(.22,1,.36,1)_forwards]">
          <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#ef7120] sm:text-sm">
            <span
              className="h-px w-12 bg-[#ef7120]"
              aria-hidden="true"
            />
            <span>How We Work</span>
            <span
              className="h-px w-12 bg-[#ef7120]"
              aria-hidden="true"
            />
          </div>

          <h2
            id="global-logistics-process-title"
            className="mt-6 text-[clamp(2.45rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#2b3386]"
          >
            A Clear, Step-by-Step Global Logistics Process.
          </h2>
        </header>

        <ol className="mt-14 grid grid-cols-1 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:mt-20 lg:grid-cols-5 lg:gap-x-6 xl:gap-x-8">
          {processSteps.map((step, index) => (
            <li
              key={step.id}
              className="group relative border-t-2 border-[#2b3386] pt-8 opacity-0 motion-safe:animate-[process-step-in_600ms_cubic-bezier(.22,1,.36,1)_forwards] sm:pt-9 lg:min-w-0"
              style={{ animationDelay: `${220 + index * 95}ms` }}
            >
              <span
                className="absolute left-0 top-[-2px] h-0.5 w-0 bg-[#ef7120] transition-all duration-500 group-hover:w-16"
                aria-hidden="true"
              />

              <p
                className="text-[2rem] leading-none tracking-[-0.04em] text-[#ef7120] sm:text-[2.15rem]"
                aria-label={`Step ${step.number}`}
              >
                {step.number}
              </p>

              <h3 className="mt-5 max-w-[15rem] text-[1.35rem] font-medium leading-[1.15] tracking-[-0.035em] text-[#2b3386] sm:text-[1.45rem]">
                {step.title}
              </h3>

              <p className="mt-4 max-w-[18rem] text-sm leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        @keyframes process-heading-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes process-step-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[process-heading-in_650ms_cubic-bezier\\(\\.22\\,1\\,\\.36\\,1\\)_forwards\\],
          .motion-safe\\:animate-\\[process-step-in_600ms_cubic-bezier\\(\\.22\\,1\\,\\.36\\,1\\)_forwards\\] {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
