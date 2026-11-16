import { networkOffices } from '@/app/data/network/network-offices'
import { NetworkOfficesHero } from './network-offices-hero'
import { OfficeDetails } from './office-details'

export function NetworkOffices() {
  const countryCount = new Set(networkOffices.map((office) => office.countryCode)).size
  const officeCount = networkOffices.length
  const primaryOffice = networkOffices[0]

  if (!primaryOffice) return null

  return (
    <main>
      <NetworkOfficesHero office={primaryOffice} officeCount={officeCount} />
      <OfficeDetails office={primaryOffice} />
      <span className="sr-only">{countryCount} {countryCount === 1 ? 'country' : 'countries'} represented</span>
    </main>
  )
}
