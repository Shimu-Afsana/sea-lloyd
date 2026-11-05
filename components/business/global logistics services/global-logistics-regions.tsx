
type Region = {
  id: string
  number: string
  name: string
  description: string
}

const regions: Region[] = [
  {
    id: 'middle-east',
    number: 'REGION 01',
    name: 'UAE, GCC & Middle East',
    description:
      'Supporting regional cargo coordination and trade connections across Gulf markets and the wider Middle East.',
  },
  {
    id: 'africa',
    number: 'REGION 02',
    name: 'Africa',
    description:
      'Supporting international cargo movements and logistics connections across important African markets.',
  },
  {
    id: 'south-asia',
    number: 'REGION 03',
    name: 'South Asia',
    description:
      'Connecting regional trade and logistics operations across South Asian markets, including India and neighboring economies.',
  },
  {
    id: 'southeast-asia',
    number: 'REGION 04',
    name: 'Southeast Asia',
    description:
      'Supporting cargo coordination and international trade connections across Southeast Asian markets.',
  },
  {
    id: 'far-east',
    number: 'REGION 05',
    name: 'Far East',
    description:
      'Connecting businesses with logistics and cargo coordination across East Asian commercial markets.',
  },
  {
    id: 'bangladesh',
    number: 'REGION 06',
    name: 'Bangladesh',
    description:
      'A key market for Sea Lloyd, supporting Bangladesh-linked import, export, and regional cargo movements.',
  },
]

function WorldMapBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      viewBox="0 0 1600 760"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#ef7120" strokeOpacity=".28" strokeWidth="1">
        <path d="M-80 510C270 170 520 700 875 285S1400 95 1690 160" />
        <path d="M350 720C650 435 1000 120 1700 540" />
      </g>

      <g fill="#46618d" fillOpacity=".58">
        <path d="M108 211l28-34 56-18 46 12 21 32-30 24-18 39-41 17-37-20-22-30zM255 276l32 8 18 35-22 27-25-19-19-30zM470 185l42-18 64 12 26 28-42 21-17 31-61-4-24-27zM618 243l39-3 19 26-13 39-31 31-28-18 12-38-18-20zM732 218l39-28 73 6 33 25-34 26-3 34-39 11-34-20-45 0-16-27zM856 207l45-8 30 31-18 32-43 2-30-25zM1009 225l45-19 63 9 28 33-38 22-21 42-37-12-8-35-43-15zM1150 183l56-22 77 17 30 34-15 28-61-4-26 25-50-22-21-29zM1291 278l45-17 40 24-15 29-45 15-37-18zM1407 362l50-15 33 27-20 29-47 6-30-20zM1097 407l36 2 24 28-9 49-31 35-22-42-32-25zM928 427l48-15 26 31-14 40-37 39-29-28 12-37zM770 444l43-21 38 17 4 44-31 36-42-12-20-31zM646 487l37-14 31 27-14 34-35 18-31-24zM487 472l54-17 30 23-11 37-41 19-47-26zM354 520l49-14 27 31-20 34-44 9-26-28z" />
      </g>

      <g fill="#ef7120" fillOpacity=".72">
        <circle cx="177" cy="252" r="4" />
        <circle cx="521" cy="223" r="4" />
        <circle cx="793" cy="257" r="4" />
        <circle cx="1034" cy="266" r="4" />
        <circle cx="1191" cy="218" r="4" />
        <circle cx="1321" cy="297" r="4" />
        <circle cx="951" cy="457" r="4" />
        <circle cx="687" cy="510" r="4" />
      </g>

      <g stroke="#ef7120" strokeDasharray="2 9" strokeOpacity=".45">
        <path d="M177 252C411 190 571 209 793 257S1084 235 1191 218" />
        <path d="M521 223C649 293 757 346 951 457" />
      </g>
    </svg>
  )
}

export function GlobalLogisticsRegions() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#09162b] py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="global-logistics-regions-title"
    >
      <WorldMapBackdrop />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <header className="max-w-5xl">
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#ef7120] sm:text-sm">
            <span
              className="h-px w-12 bg-[#ef7120]"
              aria-hidden="true"
            />
            <span>Global Markets</span>
          </div>

          <h2
            id="global-logistics-regions-title"
            className="mt-6 max-w-5xl text-[clamp(2rem,5vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white"
          >
            Connecting markets,{' '}
            <em className="font-normal tracking-[-0.045em] text-[#ef7120]">
              across six regions.
            </em>
          </h2>

          <p className="mt-7 max-w-4xl text-base leading-7 text-[#c1c9da] sm:text-lg sm:leading-8 lg:text-xl">
            Sea Lloyd connects businesses with coordinated shipping and
            logistics support across key regional markets, helping cargo move
            between origins, ports, and destinations with greater clarity and
            confidence.
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-lg border border-[#9da9dd]/35 bg-[#0d1d35]/90 sm:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {regions.map((region, index) => (
            <article
              key={region.id}
              className="group min-h-[205px] border-[#ef7120]/20 p-6 opacity-0 motion-safe:animate-[region-card-in_600ms_cubic-bezier(.22,1,.36,1)_forwards] sm:p-7 lg:min-h-[205px] lg:p-8 [&:nth-child(n+2)]:border-t md:[&:nth-child(even)]:border-l lg:[&:nth-child(n+2)]:border-l lg:[&:nth-child(n+4)]:border-t"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.23em] text-[#ef7120]">
                {region.number}
              </p>

              <h3 className="mt-5 text-[clamp(1.45rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.035em] text-white">
                {region.name}
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#bac4d4] sm:text-[15px]">
                {region.description}
              </p>

              <span
                className="mt-5 block h-px w-10 bg-[#efb95e] transition-all duration-300 group-hover:w-16 group-hover:bg-[#ef7120]"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes region-card-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[region-card-in_600ms_cubic-bezier\\(\\.22\\,1\\,\\.36\\,1\\)_forwards\\] {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}

