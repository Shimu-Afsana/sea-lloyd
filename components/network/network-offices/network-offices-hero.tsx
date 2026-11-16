import type { NetworkOffice } from '@/app/data/network/network-offices'

function SingaporeMap() {
  return (
    <svg viewBox="0 0 760 390" role="img" aria-labelledby="map-title map-description" className="h-full w-full">
      <title id="map-title">Singapore in Southeast Asia</title>
      <desc id="map-description">An illustrative regional map showing Singapore at the southern tip of the Malay Peninsula, with a callout highlighting the island.</desc>
      <defs>
        <linearGradient id="sea" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#344094"/><stop offset="1" stopColor="#202967"/></linearGradient>
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#fff" strokeOpacity=".055" strokeWidth="1"/></pattern>
        <filter id="glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="760" height="390" rx="18" fill="url(#sea)"/><rect width="760" height="390" rx="18" fill="url(#grid)"/>
      <g fill="#dce5f5" fillOpacity=".88" stroke="#fff" strokeOpacity=".2" strokeWidth="1.5">
        <path d="M0 0h258l-12 29 14 17-9 20 16 18-4 22 18 17-7 21 15 22-3 22 15 19-9 17 12 14-2 24 13 17-6 20 9 20-12 12-3 30-15 18H0z"/>
        <path d="M264 0h86l-10 25 13 16-8 18 9 20-10 21 8 21-14 18 8 20-13 20 10 16-14 16 2 24-12 15 9 17-7 17-16-2-12-20 6-17-12-20 7-18-13-19 3-21-14-18 9-21-15-20 8-23-15-18 9-18-13-17z"/>
        <path d="M349 230l28 10 17 22-8 10-25-7-20-17z"/>
        <path d="M421 242l26 9 10 16-10 9-27-8-12-13z"/>
        <path d="M490 252l36 9 12 13-19 9-38-9-10-12z"/>
        <path d="M574 278l25 7 10 11-23 7-24-9z"/>
      </g>
      <g fill="none" stroke="#ef7120" strokeWidth="1.5" strokeDasharray="5 6" opacity=".8"><path d="M365 263C405 291 447 303 500 310"/></g>
      <circle cx="365" cy="263" r="12" fill="#ef7120" opacity=".2" className="animate-ping"/>
      <circle cx="365" cy="263" r="6" fill="#ef7120" stroke="white" strokeWidth="2" filter="url(#glow)"/>
      <text x="326" y="244" fill="white" fontSize="12" fontWeight="700" letterSpacing="1.2">SINGAPORE</text>
      <g transform="translate(500 286)">
        <rect width="225" height="82" rx="13" fill="#192253" fillOpacity=".96" stroke="#ef7120" strokeOpacity=".75"/>
        <text x="18" y="25" fill="#ef7120" fontSize="9" fontWeight="700" letterSpacing="2">SINGAPORE · MAIN BRANCH</text>
        <path d="M18 42h48" stroke="#ef7120" strokeWidth="2"/>
        <path d="M19 58c8-6 17-5 25 0 8 4 16 4 24-1" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="44" cy="56" r="4" fill="#ef7120" stroke="white" strokeWidth="1.5"/>
        <text x="84" y="59" fill="white" fontSize="15" fontWeight="600">Singapore</text>
      </g>
      <text x="24" y="354" fill="#d6def1" fillOpacity=".65" fontSize="9" letterSpacing="2">STRAIT OF MALACCA</text>
      <text x="293" y="362" fill="#d6def1" fillOpacity=".65" fontSize="9" letterSpacing="2">SINGAPORE STRAIT</text>
      <text x="635" y="38" fill="#d6def1" fillOpacity=".7" fontSize="9" letterSpacing="2">SOUTH CHINA SEA</text>
    </svg>
  )
}

export function NetworkOfficesHero({ office, officeCount }: { office: NetworkOffice; officeCount: number }) {
  return (
    <section className="relative overflow-hidden bg-[#2b3386] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgba(100,125,207,.22),transparent_48%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-7 sm:px-8 sm:pb-16 sm:pt-9 lg:px-12 lg:pb-[76px]">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[.25em] text-white/65 sm:text-xs">SEA LLOYD GLOBAL NETWORK</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-4xl lg:text-[48px]">Agency Network</h1>
          </div>
          <div className="mt-1 flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/[.06] px-3 py-2 text-xs text-white/90 sm:px-4 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef7120]" />{officeCount} {officeCount === 1 ? 'location' : 'locations'}
          </div>
        </header>
        <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[1.65fr_.85fr] lg:items-stretch">
          <article className="group rounded-[22px] border border-[#ef7120]/80 bg-white/[.075] p-3 shadow-[0_22px_65px_rgba(10,17,59,.2)] transition-colors duration-300 hover:bg-white/[.095] sm:p-5">
            <div className="h-[230px] overflow-hidden rounded-[15px] sm:h-[300px] lg:h-[345px]"><SingaporeMap /></div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-4 sm:px-3 sm:pt-5">
              <div className="flex items-center gap-3"><span className="text-2xl" role="img" aria-label="Singapore flag">{office.flag}</span><div><h2 className="text-lg font-semibold sm:text-xl">{office.country}</h2><p className="mt-0.5 text-xs tracking-wide text-white/60">{office.role}</p></div></div>
              <span className="rounded-full border border-white/15 bg-white/[.07] px-3 py-1.5 text-xs text-white/80">{officeCount} {officeCount === 1 ? 'Main office' : 'Offices'}</span>
            </div>
          </article>
          <aside className="flex flex-col justify-between rounded-[22px] border border-white/10 bg-[#222a70]/60 p-6 sm:p-8 lg:p-9">
            <div>
              <p className="text-[10px] font-bold tracking-[.23em] text-[#ef7120]">OUR REGIONAL PRESENCE</p>
              <h2 className="mt-4 max-w-sm text-2xl font-semibold leading-tight tracking-[-.03em] sm:text-3xl">A trusted connection to Southeast Asia.</h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">One dedicated main branch, connecting your business with the region from Singapore.</p>
            </div>
            <div className="mt-8 border-t border-white/15 pt-5">
              <p className="text-[10px] font-semibold tracking-[.2em] text-white/50">SINGAPORE · {office.latitude.toFixed(4)}° N, {office.longitude.toFixed(4)}° E</p>
              <div className="mt-4 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ef7120]/15 text-lg">{office.flag}</span><div><p className="text-sm font-semibold">{office.country}</p><p className="mt-0.5 text-xs text-white/55">Head office · Singapore</p></div><span className="ml-auto rounded-full bg-[#ef7120] px-2.5 py-1 text-[9px] font-bold tracking-[.15em] text-white">MAIN</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
