
import type { Metadata } from 'next'
import '@/components/network/routes/shipping-routes-map.css'

import { ShippingRoutesMap } from '@/components/network/routes/shipping-routes-map'
import { isSailingScheduleAvailable } from '@/lib/sailing-schedule'

export const metadata: Metadata = {
  title: 'Shipping Network | Sea Lloyd',
  description:
    'Explore Sea Lloyd’s connected ports and illustrative shipping network across South and Southeast Asia.',
}

export default function ShippingRoutesPage() {
  return <ShippingRoutesMap scheduleAvailable={isSailingScheduleAvailable()} />
}

