'use client'

import Image from 'next/image'

interface TransportationOption {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  accent: 'navy' | 'orange'
}

const transportationOptions: TransportationOption[] = [
  {
    id: 'truck',
    title: 'TRUCK',
    description:
      'Provides final mile deliveries across varying distances, offering flexibility tailored to your supply chain schedule.',
    image: '/seallyod-truck.jpeg',
    imageAlt: 'Commercial freight trucks transporting cargo',
    accent: 'orange',
  },
  {
    id: 'train',
    title: 'TRAIN',
    description:
      'A sustainable option that provides flexibility and timeliness for high volume shipments.',
    image: '/SeaLloyd Freight Train in Daylight.png',
    imageAlt: 'Freight trains carrying intermodal shipping containers',
    accent: 'navy',
  },
  {
    id: 'ocean',
    title: 'OCEAN',
    description:
      'Environmentally-friendly option to move shipments inland via water transport routes that large vessels cannot access.',
    image: '/ocean-freight.jpeg',
    imageAlt: 'Cargo ship transporting containers on coastal water',
    accent: 'orange',
  },
  {
    id: 'warehousing',
    title: 'WAREHOUSING',
    description:
      'End-to-end warehousing solutions providing secure storage, efficient inventory management, and seamless distribution to support reliable shipping operations.',
    image: '/Sea Lloyd Industrial Shipping Yard.png',
    imageAlt: 'Organized pallet storage inside a modern logistics warehouse',
    accent: 'navy',
  },
  {
    id: 'custom-clearances',
    title: 'CUSTOM CLEARANCES',
    description:
      'Efficient customs clearance services ensuring smooth, compliant, and timely import and export of goods.',
    image: '/custom clearence.webp',
    imageAlt: 'Commercial customs and port clearance facility',
    accent: 'orange',
  },
  {
    id: 'bulk-cargo',
    title: 'BULK CARGO',
    description:
      'Specialized bulk cargo handling and transportation services for safe, efficient, and large-volume shipments.',
    image: '/sealloyd container 3.jpeg',
    imageAlt: 'Bulk cargo vessel at a commercial terminal',
    accent: 'orange',
  },
]

export default function MultimodalTransport() {
  return (
    <section className="bg-[#f8fafc] px-5 py-10 text-[#2b3386] sm:px-8 sm:py-12 lg:px-12 lg:py-16" aria-labelledby="transportation-choices-title">
      <div className="mx-auto max-w-[1340px]">
        <h2 id="transportation-choices-title" className="mb-7 text-[clamp(1.55rem,2.5vw,2.45rem)] font-medium leading-tight tracking-[-0.035em]">
          MULTIMODAL TRANSPORTATION CHOICES
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {transportationOptions.map((option) => (
            <article
              key={option.id}
              className="group overflow-hidden bg-white shadow-[0_5px_16px_rgba(15,23,42,0.12)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_10px_24px_rgba(15,23,42,0.18)] focus-within:shadow-[0_10px_24px_rgba(15,23,42,0.18)] motion-reduce:transition-none"
            >
              <h3 className={`flex min-h-12 items-center px-3 py-2 text-lg font-medium leading-tight tracking-[-0.02em] text-white sm:min-h-13 sm:px-4 sm:text-xl ${option.accent === 'navy' ? 'bg-[#2146d8]' : 'bg-[#ef7120]'}`}>
                {option.title}
              </h3>
              <div className="relative aspect-[1.86/1] overflow-hidden bg-slate-200">
                <Image
                  src={option.image}
                  alt={option.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:scale-100 motion-reduce:transition-none"
                />
              </div>
              <p className={`min-h-[104px] px-3.5 py-3.5 text-sm leading-6 ${option.accent === 'navy' ? 'bg-[#edf4ff]' : 'bg-[#fff8eb]'} text-[#294b7c] sm:px-4 sm:py-3.5`}>
                {option.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { transportationOptions }
export type { TransportationOption }
