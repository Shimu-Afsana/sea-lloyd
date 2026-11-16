import { MultimodalTransportHero } from '@/components/services/multimodal-transport-services/multimodal-transport-hero'
import { MultimodalTransportOverview } from '@/components/services/multimodal-transport-services/multimodal-transport-overview'
import { MultimodalTransportTabs } from '@/components/services/multimodal-transport-services/multimodal-transport-tabs'

export default function ProjectCargoServicesPage() {
  return (
    <main>
      <MultimodalTransportHero />
      <MultimodalTransportTabs />
      <MultimodalTransportOverview />
    </main>
  )
}
