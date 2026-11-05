import { CharteringServices } from '@/components/business/chartering-ship-brokers/chartering-services'
import { CharteringShipBrokersHero } from '@/components/business/chartering-ship-brokers/chartering-ship-brokers-hero'

export default function CharteringShipBrokersPage() {
  return (
    <main>
      <CharteringShipBrokersHero />
      <CharteringServices />
    </main>
  )
}