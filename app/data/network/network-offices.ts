export type NetworkOffice = {
  id: string
  name: string
  country: string
  countryCode: string
  flag: string
  role: string
  latitude: number
  longitude: number
  address: string
  phones: string[]
  fax?: string
  email: string
  heroImage: string
  imageAlt: string
}

export const networkOffices: NetworkOffice[] = [
  {
    id: 'singapore-main',
    name: 'Sea Lloyd — Singapore Main Branch',
    country: 'Singapore',
    countryCode: 'SG',
    flag: '🇸🇬',
    role: 'MAIN BRANCH',
    latitude: 1.3521,
    longitude: 103.8198,
    address: '10 Anson Road #22-08, International Plaza, Singapore 079903',
    phones: ['+65 6291 4540', '+65 6291 4541'],
    fax: '+65 6223 4348',
    email: 'sin@sealloyd.com',
    heroImage: '/images/network/network-offices/singapore-office-hero.jpg',
    imageAlt: 'Sea Lloyd Singapore office location',
  },
]
