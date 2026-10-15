'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type ContainerFeature = {
  id: string
  category: string
  title: string
  description: string
  supportingText: string
  image: string
  imageAlt: string
}

const containerFeatures: ContainerFeature[] = [
  {
    id: '01',
    category: 'ON-TIME DELIVERY',
    title: 'Transit Time Confidence',
    description:
      'Sea Lloyd focuses on dependable transit times and efficient cargo delivery across India-Bangladesh trade routes. From port-to-port and point-to-point movements to door-to-door and shelf-to-shelf solutions, we help customers plan their shipments with greater confidence.',
    supportingText: 'Every shipment planned with care.',
    image: '/sealloyd container 2.jpeg',
    imageAlt: 'Modern container vessel carrying stacked containers near a commercial port',
  },
  {
    id: '02',
    category: 'FLEXIBLE LOGISTICS',
    title: 'Operational Flexibility',
    description:
      'Adapt to changing market demands with flexible sailing schedules, coordinated transport options, and strong operational partnerships. Sea Lloyd works to keep cargo moving efficiently as logistics requirements evolve.',
    supportingText: 'Solutions that adapt to your needs.',
    image: '/sealloyd container 1.jpeg',
    imageAlt: 'Containers being transferred between a vessel, terminal crane, and truck',
  },
  {
    id: '03',
    category: 'SCHEDULE RELIABILITY',
    title: 'Reliable Scheduling',
    description:
      'Clear planning, transparent lead times, and dependable port coordination help businesses manage cargo movements with confidence. Sea Lloyd prioritizes consistency and communication throughout the shipping process.',
    supportingText: 'Consistency at every port call.',
    image: '/sealloyd container 3.jpeg',
    imageAlt: 'Container ship alongside cranes at an organized commercial terminal',
  },
  {
    id: '04',
    category: 'REGIONAL CONNECTIVITY',
    title: 'Extensive Service Network',
    description:
      'Sea Lloyd connects Indian inland container depots and ports with key Bangladeshi cargo gateways, including Pangaon, Kamlapur ICD, Mongla, and Chittagong, with onward connections supporting wider trade routes.',
    supportingText: 'Connecting regional trade to wider markets.',
    image: '/sealloyd container 4.jpeg',
    imageAlt: 'Aerial view of a commercial container port with cranes, trucks, and stacked containers',
  },
  {
    id: '05',
    category: 'CARGO PROTECTION',
    title: 'Cargo Safety & Security',
    description:
      'Your cargo deserves careful handling at every stage. Sea Lloyd emphasizes responsible cargo management, appropriate handling procedures, and coordinated monitoring to help reduce the risks of damage, loss, and unnecessary delays throughout the journey.',
    supportingText: 'Your cargo, handled responsibly.',
    image: '/sealloyd container 5.jpeg',
    imageAlt: 'Port professionals inspecting and securing a shipping container',
  },
]

function FeatureRow({ feature, index }: { feature: ContainerFeature; index: number }) {
  const rowRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const imageFirst = index % 2 === 1

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16 },
    )
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={rowRef}
      className={`grid items-center gap-8 border-t border-[#d9deea] py-10 transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none sm:gap-12 sm:py-14 lg:grid-cols-2 lg:gap-20 lg:py-20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
    >
      <div className={`flex flex-col ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
        <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#ef7120] sm:text-xs">
          <span className="h-px w-7 bg-[#ef7120]" aria-hidden="true" />
          {feature.category}
        </p>
        <p className="mt-5 text-sm font-semibold tracking-[0.12em] text-[#2b3386]/50">{feature.id}</p>
        <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#2b3386] sm:text-4xl">
          {feature.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
          {feature.description}
        </p>
        <p className="mt-6 text-sm font-semibold text-[#2b3386]">{feature.supportingText}</p>
      </div>

      <div className={`group relative overflow-hidden rounded-xl bg-[#e8edf5] shadow-[0_16px_45px_rgba(43,51,134,0.10)] ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={feature.image}
            alt={feature.imageAlt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#2b3386]/10" aria-hidden="true" />
      </div>
    </article>
  )
}

export function ContainerCard() {
  return (
    <section id="container-services" className="bg-[#f8fafc] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-bold tracking-[0.22em] text-[#ef7120]">BUILT AROUND YOUR CARGO</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-[#2b3386] sm:text-5xl lg:text-6xl">
            Container Liner Services Designed Around Your Business
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            From dependable sailing schedules to secure cargo handling, Sea Lloyd connects businesses through flexible, reliable container liner solutions.
          </p>
        </header>

        <div>
          {containerFeatures.map((feature, index) => (
            <FeatureRow key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { containerFeatures }
export type { ContainerFeature }
