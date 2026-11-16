"use client"

import Image from "next/image"
import { TrainFront, Truck, Warehouse, Workflow } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type IntermodalService = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
  icon: typeof Truck
}

const intermodalServices: IntermodalService[] = [
  {
    id: "container-haulage",
    title: "Container Carrier Haulage",
    description:
      "Sea Lloyd coordinates container haulage between relevant port terminals, inland facilities, warehouses, and delivery locations. Our approach focuses on arranging suitable road transportation, coordinating cargo collection, and supporting organized container handovers throughout the inland movement.",
    image: "/intermodal transport img.png",
    imageAlt: "Container truck collecting cargo at a commercial shipping terminal",
    imagePosition: "center",
    icon: Truck,
  },
  {
    id: "multi-carrier-coordination",
    title: "Multi-Carrier Coordination",
    description:
      "Sea Lloyd supports coordinated cargo movements involving relevant shipping carriers and inland transportation providers. By considering vessel arrival information, terminal procedures, container availability, and onward transport requirements, we help organize connected shipment arrangements.",
    image: "/intermodalimg-2.png",
    imageAlt: "Container logistics operation connecting inland transportation facilities",
    imagePosition: "center",
    icon: Workflow,
  },
  {
    id: "rail-freight-connections",
    title: "Rail Freight Connections",
    description:
      "Sea Lloyd supports the coordination of containerized cargo movements through suitable rail transportation arrangements. Rail connections can link inland logistics terminals with relevant port facilities, providing an additional option for organized long-distance cargo movement.",
    image: "/Sea Lloyd Global Logistics at Sunset.png",
    imageAlt: "Freight train carrying shipping containers through an inland rail corridor",
    imagePosition: "center",
    icon: TrainFront,
  },
  {
    id: "ground-freight-delivery",
    title: "Ground Freight & Delivery",
    description:
      "From port collection to inland distribution, Sea Lloyd coordinates suitable road freight arrangements for containerized cargo. We consider vehicle requirements, collection points, delivery destinations, and cargo handover arrangements to support practical inland transportation.",
    image: "/intermodal img-3.png",
    imageAlt: "Road freight truck transporting cargo near a distribution facility",
    imagePosition: "center",
    icon: Warehouse,
  },
]

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: IntermodalService
  index: number
  isVisible: boolean
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const FallbackIcon = service.icon
  const delay = `${index * 100}ms`

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc]">
        {imageFailed ? (
          <div
            role="img"
            aria-label={`Image placeholder for ${service.title}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f8fafc] text-[#2b3386]"
          >
            <span className="grid size-14 place-items-center rounded-full border border-[#e2e8f0] bg-white text-[#2b3386]">
              <FallbackIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </span>
            <span className="text-[10px] font-semibold tracking-[.18em] text-[#45556C]">ADD LOCAL SERVICE PHOTO</span>
          </div>
        ) : (
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1280px) 292px, (min-width: 768px) 46vw, (min-width: 640px) 44vw, 100vw"
            className={`object-cover transition-[transform,opacity] duration-[550ms] ease-out motion-reduce:transform-none motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.04] ${isVisible ? "opacity-100" : "translate-y-2 opacity-0"}`}
            style={{ objectPosition: service.imagePosition, transitionDelay: delay }}
            onError={() => setImageFailed(true)}
          />
        )}
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-12 bg-[#ef7120] transition-[width] duration-500 ease-out group-hover:w-20 motion-reduce:transition-none" />
      </div>

      <div
        className={`mt-5 transition-[opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:mt-6 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        style={{ transitionDelay: isVisible ? `calc(${delay} + 70ms)` : "0ms" }}
      >
        <p className="mb-2 text-[10px] font-semibold tracking-[.2em] text-[#ef7120]">SERVICE 0{index + 1}</p>
        <h3 className="text-[20px] leading-[1.25] font-semibold tracking-[-.025em] text-[#2b3386] sm:text-[21px] lg:text-[22px]">
          {service.title}
        </h3>
        <p
          className={`mt-3 text-[15px] leading-[1.75] text-[#45556C] transition-[opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:text-base ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          style={{ transitionDelay: isVisible ? `calc(${delay} + 140ms)` : "0ms" }}
        >
          {service.description}
        </p>
      </div>
    </article>
  )
}

export function IntermodalServiceCards() {
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
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="intermodal-services-title"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-9 flex flex-col gap-4 border-b border-[#e2e8f0] pb-6 sm:mb-11 sm:flex-row sm:items-end sm:justify-between sm:pb-7 lg:mb-12">
          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[.22em] text-[#ef7120] sm:text-[11px]">
              SEA LLOYD <span aria-hidden="true" className="px-2 text-[#e2e8f0]">/</span> SERVICE CAPABILITIES
            </p>
            <h2
              id="intermodal-services-title"
              className="max-w-3xl text-balance text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] font-semibold tracking-[-.045em] text-[#2b3386]"
            >
              Intermodal services, connected around your cargo.
            </h2>
          </div>
          <span aria-hidden="true" className="hidden h-1 w-16 shrink-0 rounded-full bg-[#ef7120] sm:mb-2 sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-11 min-[640px]:grid-cols-2 sm:gap-x-7 sm:gap-y-14 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-0">
          {intermodalServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
