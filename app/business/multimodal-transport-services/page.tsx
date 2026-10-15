import MultimodalHero from '@/components/business/multimodal-transport-services/multimodal-hero'
import MultimodalTransport from '@/components/business/multimodal-transport-services/multimodal-transport'
import MultimodalBenefits from '@/components/business/multimodal-transport-services/multimodal-benefits'

export default function MultimodalTransportServicesPage() {
  return (
    <main className="min-h-screen bg-[#2b3386]">
      <MultimodalHero />
      <MultimodalTransport />
      <MultimodalBenefits />
    </main>
  )
}

export const metadata = {
  title: 'Multimodal Transport Services | Sea Lloyd',
  description:
    'Comprehensive and flexible multimodal transportation solutions connecting sea, rail, road, and inland waterways.',
}
