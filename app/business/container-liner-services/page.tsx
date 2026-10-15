import { ContainerLinerServicesHero } from '@/components/business/container-liner-services/container-liner-services-hero'
import { ContainerCard } from '@/components/business/container-liner-services/container-card'

export default function ContainerLinerServicesPage() {
  return (
    <main>
      <ContainerLinerServicesHero imageSrc="/sealloyd container 2.jpeg" />
       <ContainerCard />
      <div id="container-services" className="sr-only" />
      <div id="contact" className="sr-only" />
     
    </main>
  )
}

