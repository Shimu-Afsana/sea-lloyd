
import Link from 'next/link'
import { notFound } from 'next/navigation'

const pages = {
  about: { eyebrow: 'About Sea Lloyd', title: 'Moving what matters with clarity and care.', description: 'Learn how our people, network, and values keep global commerce moving.' },
  business: { eyebrow: 'Our business', title: 'A dependable partner for every supply chain.', description: 'Explore the services and expertise behind reliable ocean freight.' },
  container: { eyebrow: 'Container solutions', title: 'The right equipment for every kind of cargo.', description: 'From standard containers to specialized solutions, we help cargo travel safely.' },
  'bill-of-lading': { eyebrow: 'Bill Of Lading', title: 'Clear documentation for every shipment.', description: 'Access bill of lading information and shipment documentation in one place.' },
  'agency-network': { eyebrow: 'Agency Network', title: 'Local expertise, connected worldwide.', description: 'Discover the Sea Lloyd agency network supporting customers across key ports.' },
  articles: { eyebrow: 'From the bridge', title: 'Latest thinking from Sea Lloyd.', description: 'Insights on resilience, visibility, and the future of ocean freight.' },
  contact: { eyebrow: 'Let’s connect', title: 'We are here to help move your business forward.', description: 'Reach our team for rates, schedules, documentation, and support.' },
  tracking: { eyebrow: 'Shipment visibility', title: 'Know where your cargo is at every step.', description: 'Use your booking or bill of lading number to get the latest shipment status.' },
} as const

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }))
}

export default async function InteriorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = pages[slug as keyof typeof pages]
  if (!page) notFound()

  return (
    <main className="min-h-screen bg-white text-[#182044]">
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow text-[#ef7120]">{page.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-7xl">{page.title}</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[#68708d]">{page.description}</p>
        <Link href="/contact" className="mt-9 inline-flex rounded-full bg-[#ef7120] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">Talk to our team</Link>
      </section>
    </main>
  )
}