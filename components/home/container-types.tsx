'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const containerTypes = [
  { title: "20' STANDARD", description: '20ft dry container for general cargo like machinery or goods. Easy handling with forklifts and corner castings for stacking.', image: '/images/QSL.20.png', href: '/container/specification-measurement' },
  { title: "40' STANDARD", description: '40ft dry container for all non-temperature cargo, ideal for bulk goods, textiles, and electronics.', image: '/images/QSLU 40 Feet Container.jpeg', href: '/container/specification-measurement' },
  { title: "40' HIGH-CUBE", description: 'Extra-tall 40ft container offering more space for lightweight, bulky cargo like furniture or clothing.', image: '/images/40 feet GP QSLU Container.jpg', href: '/container/specification-measurement' },
  { title: "45' HIGH-CUBE", description: 'Extended 45ft high-cube for large-volume shipments and long-haul transport needing extra capacity.', image: '/images/40 feet GP QSLU Container.jpg', href: '/container/specification-measurement' },
  { title: "20' OPEN TOP", description: 'A 20ft open-top container offering a removable tarpaulin roof, ideal for loading heavy or oversized cargo such as machinery, steel, or timber.', image: '/images/20 Feet Open top Container.jpeg', href: '/container/specification-measurement' },
  { title: "40' OPEN TOP", description: 'A 40ft open-top container offering greater capacity for over-height or irregularly shaped cargo.', image: '/images/Qslu Container open top.png', href: '/container/specification-measurement' },
]

export default function ContainerTypes() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })

    const section = document.getElementById('container-types')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="container-types" aria-labelledby="container-types-heading" className="bg-white px-5 py-20 text-[#2B3386] sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1180px]">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="mb-4 text-[0.68rem] font-semibold tracking-[0.28em] text-[#EF7120] sm:text-xs">CONTAINER TYPES &amp; SPECIFICATIONS</p>
          <h2 id="container-types-heading" className="font-[Biome,Arial,sans-serif] text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">Container Types &amp; Specifications</h2>
          <p className="mt-5 text-sm leading-7 text-[#2B3386]/65 sm:text-base">Explore our comprehensive range of shipping containers designed for various cargo and logistics needs.</p>
        </header>

        <div className="grid grid-cols-1 border-t border-[#2B3386]/[0.14] md:grid-cols-2">
          {containerTypes.map((container, index) => (
            <article
              key={container.title}
              className={`group border-b border-[#2B3386]/[0.14] px-1 py-9 sm:px-6 sm:py-11 md:px-8 lg:px-10 ${index % 2 === 0 ? 'md:border-r' : ''} ${visible ? 'animate-container-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="relative mx-auto h-[150px] w-full max-w-[330px] transition-transform duration-500 ease-out group-hover:scale-[1.015] sm:h-[180px] lg:h-[190px]">
                <Image src={container.image} alt={`${container.title} shipping container illustration`} fill sizes="(max-width: 767px) 90vw, 42vw" className="object-contain" />
              </div>
              <div className="mt-5 max-w-[430px]">
                <h3 className="font-[Biome,Arial,sans-serif] text-sm font-semibold tracking-[0.03em] sm:text-base">{container.title}</h3>
                <p className="mt-3 min-h-[3.5rem] text-xs leading-5 text-[#2B3386]/65 sm:text-sm sm:leading-6">{container.description}</p>
                <Link href={container.href} className="mt-5 inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.03em] text-[#2B3386] transition-colors hover:text-[#EF7120] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF7120] focus-visible:ring-offset-4 sm:text-xs">
                  Read Specification <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}