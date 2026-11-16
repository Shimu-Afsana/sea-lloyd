import type { Metadata } from 'next'
import { BreakbulkServicesHero } from '@/components/services/break-bulk-services/breakbulk-services-hero'
import { BreakbulkOverview } from '@/components/services/break-bulk-services/breakbulk-overview'
import { BreakbulkCapabilities } from '@/components/services/break-bulk-services/breakbulk-capabilities'

export const metadata: Metadata = {
  title: 'Breakbulk Cargo | Sea Lloyd',
  description: 'Sea Lloyd maritime transport and coordinated logistics for oversized, heavy, and non-containerized project cargo.',
}

export default function BreakbulkServicesPage() {
  return (
    <>
      <BreakbulkServicesHero />
      <BreakbulkOverview />
      <BreakbulkCapabilities />
    </>
  )
}
