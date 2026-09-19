'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const aboutHref = '/about'
const images = { back: '/ocean-freight.jpeg', front: '/sealloyd container 4.jpeg' }
const benefits = ['Flexible shipping — PORT-TO-PORT, POINT-TO-POINT, DOOR-TO-DOOR.', 'Expert team ensuring smooth global operations.', 'Customer-first service driving growth and trust.']

export default function AboutPreview() {
  const area = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (!area.current) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.18 })
    observer.observe(area.current)
    return () => observer.disconnect()
  }, [])
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = event.currentTarget.getBoundingClientRect()
    setTilt({ x: ((event.clientX - box.left) / box.width - 0.5) * 2, y: ((event.clientY - box.top) / box.height - 0.5) * 2 })
  }
  return <section className="overflow-hidden bg-white py-20 text-[#2B3386] sm:py-24 lg:py-32" aria-labelledby="about-preview-heading">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
      <div ref={area} onPointerMove={move} onPointerLeave={() => setTilt({ x: 0, y: 0 })} className={`relative mx-auto aspect-[1.05] w-full max-w-[560px] transition duration-700 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
        <div className="absolute left-[2%] top-[8%] h-[68%] w-[78%] overflow-hidden rounded-sm border-8 border-white bg-[#eef1f8] shadow-[0_20px_45px_rgba(43,51,134,0.16)] transition duration-500" style={{ transform: `translate(${tilt.x * -4}px,${tilt.y * -3}px) rotate(${tilt.x * -0.7}deg)` }}><Image src={images.back} alt="Sea Lloyd container vessel sailing through a port" fill sizes="(max-width: 1024px) 80vw, 42vw" className="object-cover" /></div>
        <div className="absolute bottom-[2%] right-[3%] h-[52%] w-[60%] overflow-hidden rounded-sm border-8 border-white bg-[#eef1f8] shadow-[0_20px_45px_rgba(43,51,134,0.2)] transition duration-500" style={{ transform: `translate(${tilt.x * 7}px,${tilt.y * 5}px) rotate(${tilt.x * 0.7}deg)` }}><Image src={images.front} alt="Sea Lloyd cargo operations at a busy port" fill sizes="(max-width: 1024px) 70vw, 34vw" className="object-cover" /></div>
      </div>
      <div className={`max-w-2xl transition duration-700 delay-150 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        <p className="text-xs font-bold tracking-[0.2em] text-[#EF7120]">OCEANWIDE CONTAINER LINER SERVICES</p>
        <h2 id="about-preview-heading" className="mt-5 max-w-xl text-4xl font-bold leading-[1.04] tracking-[-0.05em] sm:text-5xl lg:text-[4.2rem]">Generating Hope<br />Delivering Quality</h2>
        <h3 className="mt-7 text-xl font-bold text-[#111b50] sm:text-2xl">Global Expertise in Seamless Ocean Shipping</h3>
        <div className="mt-6 grid gap-4 text-sm leading-7 text-[#58628b] sm:text-base"><p className="border-l-2 border-[#EF7120] pl-5">Sea Lloyd is guided by a highly experienced team of professionals who have been in the industry for decades and have successfully delivered solutions for customers of all industries irrespective of size of enterprises across the oceans around world.</p><p className="border-l-2 border-[#EF7120] pl-5">With strong industry expertise, we offer efficient delivery through PORT-TO-PORT, POINT-TO-POINT, DOOR-TO-DOOR, and SHELF-TO-SHELF services.</p></div>
        <h3 className="mt-9 text-lg font-bold text-[#111b50]">Driven by Experience, Focused on Customer Success</h3>
        <ul className="mt-5 grid gap-3 text-sm text-[#58628b] sm:text-base">{benefits.map((benefit) => <li key={benefit} className="flex items-start gap-3"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-[#3dbfc0] text-[#3dbfc0]"><Check aria-hidden="true" /></span><span>{benefit}</span></li>)}</ul>
        <Link href={aboutHref} className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 bg-[#EF7120] px-6 text-xs font-bold tracking-[0.08em] text-white shadow-[0_12px_25px_rgba(239,113,32,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#2B3386] hover:shadow-[0_16px_30px_rgba(43,51,134,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EF7120]">MORE ABOUT US <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
      </div>
    </div>
  </section>
}
