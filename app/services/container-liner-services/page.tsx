import { ContainerLinerBenefits } from '@/components/services/container-liner-services/container-liner-benefits'
import { ContainerLinerFAQ } from '@/components/services/container-liner-services/container-liner-faq'
import { ContainerLinerHero } from '@/components/services/container-liner-services/container-liner-hero'
import { ContainerLinerNetwork } from '@/components/services/container-liner-services/container-liner-network'
import { ContainerLinerServicesOverview } from '@/components/services/container-liner-services/container-liner-services-overview'

export default function ContainerLinerServicesPage() {
  return (
    <main>
      <ContainerLinerHero />
      <ContainerLinerServicesOverview />
      <ContainerLinerNetwork />
       <ContainerLinerBenefits />
        <ContainerLinerFAQ />
    </main>
  )
}
