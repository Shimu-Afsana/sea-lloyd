import { IntermodalTransportHero } from '@/components/services/intermodal-transport-services/intermodal-transport-hero'
import { IntermodalConnectivity } from '@/components/services/intermodal-transport-services/intermodal-connectivity'
import { IntermodalServiceCards } from '@/components/services/intermodal-transport-services/intermodal-service-cards'
import { IntermodalBenefits } from '@/components/services/intermodal-transport-services/intermodal-benefits'

export default function IntermodalTransportServicesPage() {
  return  <main>
      <IntermodalTransportHero />
      <IntermodalConnectivity />
      <IntermodalServiceCards />
       <IntermodalBenefits />
    </main>
}
