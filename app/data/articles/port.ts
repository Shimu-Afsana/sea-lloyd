export type Port = {
  id: string
  name: string
  code: string
  country: string
}

export const ports: Port[] = [
  { id: 'chittagong', name: 'Chittagong', code: 'CTG', country: 'Bangladesh' },
  { id: 'colombo', name: 'Colombo', code: 'CMB', country: 'Sri Lanka' },
  { id: 'port-klang', name: 'Port Klang', code: 'PKG', country: 'Malaysia' },
  { id: 'singapore', name: 'Singapore', code: 'SIN', country: 'Singapore' },
]

export function getPortsByIds(ids: string[]) {
  const wanted = new Set(ids)
  return ports.filter((port) => wanted.has(port.id))
}
