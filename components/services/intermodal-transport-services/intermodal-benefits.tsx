"use client"

import Image from "next/image"
import { Image as ImageIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Benefit = {
  id: string
  number: string
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
}

const benefits: Benefit[] = [
  {
    id: "routing-flexibility",
    number: "01",
    title: "Greater Routing Flexibility",
    description:
      "Different shipments require different transportation arrangements. Sea Lloyd considers the cargo, origin, destination, route conditions, and available infrastructure to help coordinate suitable combinations of ocean, rail, road, and inland waterway transportation.",
    image: "/intermodal img-3.png",
    imageAlt: "Intermodal cargo terminal with containers prepared for onward transportation",
    imagePosition: "center",
  },
  {
    id: "regional-connectivity",
    number: "02",
    title: "Wider Regional Connectivity",
    description:
      "By coordinating maritime and inland transportation requirements, Sea Lloyd helps connect cargo movements with relevant ports, terminals, and distribution locations. Our highlighted regional network includes Chattogram (CTG), Colombo, Port Klang, and Singapore.",
    image: "/Wider Regional Connectivity.jpg",
    imageAlt: "Aerial view of an international container port and shipping terminal",
    imagePosition: "center",
  },
  {
    id: "coordinated-transfers",
    number: "03",
    title: "Coordinated Cargo Transfers",
    description:
      "Moving cargo between transportation modes requires careful attention to handover arrangements, terminal procedures, documentation, and timing. Sea Lloyd focuses on coordinating these stages to support a more organized shipment journey.",
    image: "/Coordinated Cargo Transfers.jpg",
    imageAlt: "Container being transferred between freight transportation operations",
    imagePosition: "center",
  },
  {
    id: "transport-options",
    number: "04",
    title: "Better Use of Transport Options",
    description:
      "Ocean, rail, and road transportation each serve different logistical requirements. Sea Lloyd considers their respective suitability when planning cargo movements, helping businesses evaluate practical transportation combinations for their shipments.",
    image: "/Better Use of Transport Options.jpg",
    imageAlt: "Freight containers moving through an intermodal transportation terminal",
    imagePosition: "center",
  },
  {
    id: "project-cargo-handling",
    number: "05",
    title: "Project Cargo & Specialized Handling",
    description:
      "Not every shipment fits a standard container movement. Sea Lloyd considers specialized transportation requirements for oversized industrial machinery, heavy equipment, project components, and other cargo requiring individual handling and logistics planning.",
    image: "/Project Cargo & Specialized Handling.jpg",
    imageAlt: "Oversized industrial equipment prepared for specialized project cargo transport",
    imagePosition: "center",
  },
  {
    id: "shipment-planning",
    number: "06",
    title: "More Organized Shipment Planning",
    description:
      "An intermodal shipment involves multiple transportation stages and operational parties. Sea Lloyd emphasizes clear shipment planning, coordinated milestones, and communication around cargo movements to help businesses manage transportation requirements with greater clarity.",
    image: "/More Organized Shipment Planning.jpg",
    imageAlt: "Logistics professionals coordinating container shipment operations",
    imagePosition: "center",
  },
]

function BenefitImage({ benefit }: { benefit: Benefit }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (imageFailed) {
    return (
      <div
        role="img"
        aria-label={`Image placeholder for ${benefit.title}`}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f8fafc] text-[#2b3386]"
      >
        <span className="grid size-12 place-items-center rounded-full border border-[#e2e8f0] bg-white">
          <ImageIcon aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </span>
        <span className="text-[10px] font-semibold tracking-[.18em] text-[#45556C]">
          LOCAL IMAGE PLACEHOLDER
        </span>
      </div>
    )
  }

  return (
    <Image
      src={benefit.image}
      alt={benefit.imageAlt}
      fill
      sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, calc(100vw - 40px)"
      className="object-cover transition-transform duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none motion-reduce:group-hover:scale-100 [@media(hover:hover)]:group-hover:scale-[1.035]"
      style={{ objectPosition: benefit.imagePosition ?? "center" }}
      onError={() => setImageFailed(true)}
    />
  )
}

export function IntermodalBenefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="intermodal-benefits-title"
      className="bg-[#f8fafc] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1360px]">
        <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-12 lg:mb-14">
          <p
            className={`text-[10px] font-semibold tracking-[.22em] text-[#ef7120] transition-[opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:text-xs ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          >
            WHY INTERMODAL LOGISTICS
          </p>
          <h2
            id="intermodal-benefits-title"
            className={`mt-3 text-balance text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] font-semibold tracking-[-.045em] text-[#2b3386] transition-[opacity,transform] duration-[600ms] ease-out motion-reduce:transform-none motion-reduce:transition-none ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            style={{ transitionDelay: isVisible ? "70ms" : "0ms" }}
          >
            The Advantages of Connected Logistics.
          </h2>
          <span
            aria-hidden="true"
            className={`mx-auto mt-5 block h-1 w-14 rounded-full bg-[#ef7120] transition-[opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
            style={{ transitionDelay: isVisible ? "140ms" : "0ms" }}
          />
          <p
            className={`mx-auto mt-5 max-w-[780px] text-[15px] leading-7 text-[#45556C] transition-[opacity,transform] duration-[600ms] ease-out motion-reduce:transform-none motion-reduce:transition-none sm:mt-6 sm:text-[17px] sm:leading-[1.75] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            style={{ transitionDelay: isVisible ? "170ms" : "0ms" }}
          >
            An efficient shipment involves more than choosing a transportation mode. It requires the right combination of transport options, carefully coordinated transfers, suitable infrastructure, and clear communication throughout the cargo journey. Sea Lloyd focuses on bringing these elements together to support practical intermodal shipping arrangements.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 min-[640px]:gap-6 lg:grid-cols-3 lg:gap-7">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.id}
              className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_10px_30px_rgba(43,51,134,0.045)] transition-[transform,opacity,border-color,box-shadow] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none hover:border-[#2b3386]/25 hover:shadow-[0_16px_38px_rgba(43,51,134,0.09)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${benefit.id === "project-cargo-handling" ? "border-[#ef7120]/45" : "border-[#e2e8f0]"}`}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
            >
              <div className="relative aspect-[1.62/1] w-full overflow-hidden bg-[#f8fafc]">
                <BenefitImage benefit={benefit} />
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-[3px] bg-[#ef7120] transition-[width] duration-500 ease-out motion-reduce:transition-none group-hover:w-14 ${benefit.id === "project-cargo-handling" ? "w-10" : "w-0"}`}
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[11px] font-semibold tracking-[.18em] text-[#ef7120]">
                  {benefit.number}
                </p>
                <h3 className="mt-2 text-[19px] leading-[1.25] font-semibold tracking-[-.025em] text-[#2b3386] sm:text-xl">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#45556C] sm:text-base">
                  {benefit.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
