import { ProjectCargoHero } from '@/components/services/project-cargo-services/project-cargo-hero'
import { ProjectCargoIntro } from '@/components/services/project-cargo-services/project-cargo-intro'
import { ProjectCargoLogistics } from '@/components/services/project-cargo-services/project-cargo-logistics'
import { ProjectCargoBenefits } from '@/components/services/project-cargo-services/project-cargo-benefits'
export default function ProjectCargoServicesPage() {
  return (
    <main>
      <ProjectCargoHero />
      <ProjectCargoIntro />
       <ProjectCargoLogistics />
       <ProjectCargoBenefits />
    </main>
  )
}