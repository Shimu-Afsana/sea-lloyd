
import { GlobalLogisticsMarquee } from '@/components/business/global logistics services/global-logistics-marquee'
import { GlobalLogisticsProcess } from '@/components/business/global logistics services/global-logistics-process'
import { GlobalLogisticsRegions } from '@/components/business/global logistics services/global-logistics-regions'
import { ProjectAndBreakbulkServices } from '@/components/business/project-and-breakbulk-services/project-and-breakbulk-services'
export default function ProjectAndBreakbulkServicesPage() {
  return<main>
   <ProjectAndBreakbulkServices />
   <GlobalLogisticsMarquee />
   <GlobalLogisticsRegions />
   <GlobalLogisticsProcess />
    
 
</main>
}
