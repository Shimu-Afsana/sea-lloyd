export type Port = {
  id: string
  name: string
  code: string
  country: string
  latitude: number
  longitude: number
}

export type ShippingRoute = {
  id: string
  name: string
  origin: string
  destination: string
  via: string[]
  description: string
  status: 'illustrative' | 'verified'
  isIllustrative: boolean
  outboundPath: [number, number][]
  returnPath?: [number, number][]
  showOutbound: boolean
  showReturn: boolean
  color?: string
}

export const networkSettings = {
  mapTitle: 'Sea Lloyd Shipping Network',
  initialRegion: 'south-and-southeast-asia',
  defaultPortId: 'chittagong',
  defaultRouteId: 'regional-network-preview',
  showCountryLabels: true,
  enableShipAnimation: true,
}

export const ports: Port[] = [
  { id: 'chittagong', name: 'Chittagong', code: 'CTG', country: 'Bangladesh', latitude: 22.3569, longitude: 91.7832 },
  { id: 'colombo', name: 'Colombo', code: 'CMB', country: 'Sri Lanka', latitude: 6.9271, longitude: 79.8612 },
  { id: 'port-klang', name: 'Port Klang', code: 'PKG', country: 'Malaysia', latitude: 3, longitude: 101.4 },
  { id: 'singapore', name: 'Singapore', code: 'SIN', country: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
]

export const shippingRoutes: ShippingRoute[] = [
  {
    id: 'regional-network-preview',
    name: 'Regional Network Preview',
    origin: 'chittagong',
    destination: 'singapore',
    via: ['colombo', 'port-klang'],
    description: 'A conceptual connection linking Sea Lloyd network gateways.',
    status: 'illustrative',
    isIllustrative: true,
    outboundPath: [
      [91.7832, 22.3569], [90.6, 19.8], [88.7, 16], [86.4, 12.5], [83.4, 9.5],
      [79.8612, 6.9271], [83.8, 5.4], [89, 4.4], [95, 3.8], [101.4, 3],
      [102.7, 2.5], [103.8198, 1.3521],
    ],
    returnPath: [
      [103.8198, 1.3521], [102.5, 2], [101.4, 3], [97, 3.5], [91, 3.7],
      [85, 4.7], [79.8612, 6.9271], [83, 10], [86, 14], [89, 18], [91.7832, 22.3569],
    ],
    showOutbound: true,
    showReturn: true,
  },
]


