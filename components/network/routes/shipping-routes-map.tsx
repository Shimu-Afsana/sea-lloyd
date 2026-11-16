'use client'

import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import world from 'world-atlas/countries-110m.json'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Anchor, ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, ChevronsUpDown, Compass, Download, Minus, Pause, Play, Plus, RotateCcw, X } from 'lucide-react'
import { networkSettings, ports, shippingRoutes, type Port, type ShippingRoute } from '@/app/data/network/shipping-routes'
import { SCHEDULE_PDF_PATH } from '@/app/data/network/schedule-config'

type WorldObjects = { countries: GeometryCollection }
const land = feature(world as unknown as Topology<WorldObjects>, (world as unknown as Topology<WorldObjects>).objects.countries) as unknown as GeoPermissibleObjects
const W = 1000
const H = 720
const projection = geoMercator().scale(900).translate([-715, 690]).clipExtent([[0, 0], [W, H]])
const pathGenerator = geoPath(projection)
const projectPort = (port: Port) => projection([port.longitude, port.latitude]) ?? [0, 0]
const portById = new Map(ports.map((port) => [port.id, port]))
const svgPath = (coordinates: [number, number][]) => pathGenerator({ type: 'LineString', coordinates }) ?? ''

function positionShip(path: SVGPathElement, ship: SVGGElement, distance: number, totalLength: number) {
  const point = path.getPointAtLength(distance)
  const before = path.getPointAtLength(Math.max(0, distance - 1))
  const after = path.getPointAtLength(Math.min(totalLength, distance + 1))
  const angle = Math.atan2(after.y - before.y, after.x - before.x) * (180 / Math.PI)
  ship.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`)
}

const scheduleButtonClass = 'inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-md bg-[#2b3386] px-3.5 text-[10px] font-semibold tracking-[0.02em] text-white shadow-[0_6px_18px_rgba(43,51,134,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#252c75] hover:shadow-[0_10px_22px_rgba(43,51,134,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-2 max-sm:ml-auto max-[380px]:h-8 max-[380px]:gap-1.5 max-[380px]:px-2 max-[380px]:text-[9px] max-[380px]:tracking-normal'

function Marker({ port, selected, relevant, onClick }: { port: Port; selected: boolean; relevant: boolean; onClick: () => void }) {
  const [x, y] = projectPort(port)
  const labelOnLeft = port.longitude > 100
  const labelBelow = port.latitude < 4
  return (
    <g className={`map-marker ${selected ? 'is-selected' : ''} ${relevant ? 'is-relevant' : ''}`} onClick={onClick} role="button" tabIndex={0} aria-label={`Select ${port.name}, ${port.code}, ${port.country}`} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onClick() }}>
      <circle className="marker-halo" cx={x} cy={y} r="8" />
      <circle className="marker-core" cx={x} cy={y} r="4.5" />
      <g className="marker-label" transform={`translate(${x + (labelOnLeft ? -12 : 12)},${y + (labelBelow ? 21 : -10)})`}>
        <text textAnchor={labelOnLeft ? 'end' : 'start'} className="marker-name">{port.name}</text>
        <text y="13" textAnchor={labelOnLeft ? 'end' : 'start'} className="marker-code">{port.code} · {port.country}</text>
      </g>
    </g>
  )
}

export function ShippingRoutesMap({ scheduleAvailable }: { scheduleAvailable: boolean }) {
  const [activeRouteId, setActiveRouteId] = useState(networkSettings.defaultRouteId)
  const [selectedPortId, setSelectedPortId] = useState(networkSettings.defaultPortId)
  const [panelOpen, setPanelOpen] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState([0, 0])
  const [drag, setDrag] = useState<{ x: number; y: number; originX: number; originY: number } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const motionPathRef = useRef<SVGPathElement>(null)
  const shipRef = useRef<SVGGElement>(null)
  const progressRef = useRef(0)
  const previousRouteIdRef = useRef(activeRouteId)
  const route = shippingRoutes.find((item) => item.id === activeRouteId) ?? shippingRoutes[0]
  const selectedPort = ports.find((port) => port.id === selectedPortId)
  const sequence = route ? [route.origin, ...route.via, route.destination].map((id) => portById.get(id)).filter((port): port is Port => Boolean(port)) : []
  const relevantIds = new Set(sequence.map((port) => port.id))
  const routeD = route?.showOutbound ? svgPath(route.outboundPath) : ''
  const returnD = route?.showReturn && route.returnPath ? svgPath(route.returnPath) : ''
  const motionPathD = [routeD, returnD].filter(Boolean).join(' ')
  const routeStart = route?.outboundPath.length ? projection(route.outboundPath[0]) : null
  const routeNext = route?.outboundPath.length > 1 ? projection(route.outboundPath[1]) : null
  const initialShipAngle = routeStart && routeNext ? Math.atan2(routeNext[1] - routeStart[1], routeNext[0] - routeStart[0]) * (180 / Math.PI) : 0
  const initialShipTransform = routeStart ? `translate(${routeStart[0]} ${routeStart[1]}) rotate(${initialShipAngle})` : 'translate(0 0)'

  useEffect(() => {
    const path = motionPathRef.current
    const ship = shipRef.current
    if (!path || !ship || !motionPathD || !networkSettings.enableShipAnimation) return

    const totalLength = path.getTotalLength()
    if (!Number.isFinite(totalLength) || totalLength <= 0) return

    if (previousRouteIdRef.current !== activeRouteId) {
      previousRouteIdRef.current = activeRouteId
      progressRef.current = 0
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const duration = Math.min(35_000, Math.max(20_000, totalLength * 30))
    let frameId = 0
    let startTime: number | null = null
    let running = false

    const setPosition = (progress: number) => {
      positionShip(path, ship, Math.max(0, Math.min(1, progress)) * totalLength, totalLength)
    }

    const animate = (time: number) => {
      if (!running) return
      startTime ??= time - progressRef.current * duration
      const progress = ((time - startTime) % duration) / duration
      progressRef.current = progress
      setPosition(progress)
      frameId = requestAnimationFrame(animate)
    }

    const start = () => {
      if (running) return
      running = true
      frameId = requestAnimationFrame(animate)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(frameId)
      startTime = null
    }

    if (reducedMotion.matches) {
      progressRef.current = 0.5
      setPosition(0.5)
    } else if (playing) {
      start()
    } else {
      setPosition(progressRef.current)
    }

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stop()
        progressRef.current = 0.5
        setPosition(0.5)
      } else if (playing) {
        start()
      }
    }

    reducedMotion.addEventListener('change', handleMotionPreference)
    return () => {
      stop()
      reducedMotion.removeEventListener('change', handleMotionPreference)
    }
  }, [activeRouteId, motionPathD, playing])

  const countryLabels = useMemo(() => [
    { name: 'INDIA', position: [78.2, 21.5] as [number, number] },
    { name: 'BANGLADESH', position: [90.9, 25.5] as [number, number] },
    { name: 'SRI LANKA', position: [80.7, 9.4] as [number, number] },
    { name: 'MYANMAR', position: [96, 19] as [number, number] },
    { name: 'THAILAND', position: [101, 16] as [number, number] },
    { name: 'MALAYSIA', position: [104, 5.8] as [number, number] },
    { name: 'CHINA', position: [105, 29] as [number, number] },
    { name: 'ARABIAN SEA', position: [68, 15] as [number, number] },
    { name: 'BAY OF BENGAL', position: [87, 12] as [number, number] },
    { name: 'INDIAN OCEAN', position: [88, -1] as [number, number] },
  ], [])

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if ((event.target as Element).closest('.map-marker')) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setDrag({ x: event.clientX, y: event.clientY, originX: pan[0], originY: pan[1] })
  }
  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (drag) setPan([drag.originX + event.clientX - drag.x, drag.originY + event.clientY - drag.y])
  }

  const selectPort = (port: Port) => { setSelectedPortId(port.id); setDrawerOpen(false) }
  const changeZoom = (amount: number) => setZoom((value) => Math.max(0.9, Math.min(2.1, value + amount)))

  return (
    <main className="network-page">
      <header className="network-mobile-header">
        <div className="brand-mark"><span className="brand-symbol"><Anchor size={19} strokeWidth={1.7} /></span><span>SEA LLOYD</span></div>
        <span className="header-caption">GLOBAL NETWORK</span>
      </header>

      <section className="network-experience" aria-label="Interactive Sea Lloyd shipping network">
        <div className="map-stage">
          <div className="map-topline"><div className="brand-mark desktop-brand"><span className="brand-symbol"><Anchor size={19} strokeWidth={1.7} /></span><span>SEA LLOYD</span></div><div className="map-region"><span className="live-indicator" /> SOUTH & SOUTHEAST ASIA <span className="region-divider">/</span> INDIAN OCEAN</div><button className="map-locate" type="button" onClick={() => { setZoom(1); setPan([0, 0]) }} aria-label="Reset map view"><Compass size={16} /><span>RESET VIEW</span></button></div>

          <svg ref={svgRef} className={`regional-map ${drag ? 'is-dragging' : ''}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Geographic map showing Sea Lloyd ports across South and Southeast Asia" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={() => setDrag(null)} onPointerCancel={() => setDrag(null)}>
            <defs>
              <linearGradient id="sea-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f9fcff" /><stop offset="100%" stopColor="#eaf3f8" /></linearGradient>
              <pattern id="sea-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#dbe7ef" strokeWidth=".45" opacity=".55" /></pattern>
              <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="ship-glow" x="-50%" y="-80%" width="200%" height="260%"><feDropShadow dx="0" dy="1" stdDeviation="2.2" floodColor="#ef7120" floodOpacity=".48" /></filter>
            </defs>
            <rect width={W} height={H} fill="url(#sea-gradient)" />
            <rect width={W} height={H} fill="url(#sea-grid)" />
            <g className="map-content" transform={`translate(${pan[0]} ${pan[1]}) translate(${W / 2} ${H / 2}) scale(${zoom}) translate(${-W / 2} ${-H / 2})`}>
              <path d={pathGenerator(land) ?? ''} className="land-shape" />
              <path d={pathGenerator(land) ?? ''} className="land-detail" />
              {countryLabels.map(({ name, position }) => { const [x, y] = projection(position) ?? [0, 0]; return <text key={name} x={x} y={y} className="geo-label" textAnchor="middle">{name}</text> })}
              <path d={routeD} className="route-underlay" />
              {returnD && <path d={returnD} className="route-return" />}
              {routeD && <path d={routeD} className="route-outbound" />}
              {ports.map((port) => <Marker key={port.id} port={port} selected={port.id === selectedPortId} relevant={relevantIds.has(port.id)} onClick={() => selectPort(port)} />)}
              {motionPathD && networkSettings.enableShipAnimation && (
                <g className="ship-overlay" aria-hidden="true">
                  <path ref={motionPathRef} d={motionPathD} fill="none" stroke="none" />
                  <g ref={shipRef} className="moving-ship" filter="url(#ship-glow)" transform={initialShipTransform} pointerEvents="none">
                    <path d="M -13 1.5 L 12 1.5 L 8.5 7 L -9.5 7 Z" fill="#2b3386" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M -8 -5.5 H -2 V 1.5 H -8 Z" fill="#ef7120" stroke="#fff" strokeWidth=".8" />
                    <path d="M -1 -6 H 5 V 1.5 H -1 Z" fill="#2b3386" stroke="#fff" strokeWidth=".8" />
                    <path d="M 6 -3 H 10 V 1.5 H 6 Z" fill="#ef7120" stroke="#fff" strokeWidth=".8" />
                  </g>
                </g>
              )}
            </g>
          </svg>

          <div className="map-controls" aria-label="Map controls"><button type="button" onClick={() => changeZoom(0.15)} aria-label="Zoom in"><Plus size={17} /></button><button type="button" onClick={() => changeZoom(-0.15)} aria-label="Zoom out"><Minus size={17} /></button><button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause route animation' : 'Play route animation'}>{playing ? <Pause size={14} /> : <Play size={14} />}</button><span className="control-rule" /><button type="button" onClick={() => { setZoom(1); setPan([0, 0]) }} aria-label="Reset map"><RotateCcw size={15} /></button></div>

          <aside className={`network-sidebar ${panelOpen ? '' : 'is-collapsed'}`} aria-label="Network navigation">
            <div className="sidebar-topline"><span className="eyebrow"><span className="eyebrow-line" /> SHIPPING NETWORK <span className="eyebrow-number">01 / 04</span></span><button className="sidebar-toggle" type="button" onClick={() => setPanelOpen(!panelOpen)} aria-label={panelOpen ? 'Collapse network panel' : 'Expand network panel'}>{panelOpen ? <Minus size={15} /> : <Plus size={15} />}</button></div>
            {panelOpen && <div className="sidebar-content"><div className="sidebar-intro"><p className="sidebar-overline">CONNECTING PORTS. MOVING GLOBAL TRADE.</p><h1>Connected by<br /><span>the sea.</span></h1><p className="sidebar-description">Explore Sea Lloyd&apos;s maritime gateways across South and Southeast Asia.</p></div>
              <div className="sidebar-section-heading"><span>NETWORK PORTS</span><span className="section-count">{String(ports.length).padStart(2, '0')}</span></div>
              <div className="port-list">{ports.map((port, index) => <button className={`port-row ${selectedPortId === port.id ? 'active' : ''}`} key={port.id} type="button" onClick={() => selectPort(port)}><span className="port-index">0{index + 1}</span><span className="port-pin" /><span className="port-row-copy"><span className="port-name">{port.name}</span><span className="port-meta">{port.country}</span></span><span className="port-code">{port.code}</span><ArrowUpRight className="port-arrow" size={13} /></button>)}</div>
              <div className="sidebar-section-heading route-heading"><span>CONFIGURED ROUTES</span><span className="section-count">{String(shippingRoutes.length).padStart(2, '0')}</span></div>
              <div className="route-list">{shippingRoutes.map((item) => { const itemOrigin = portById.get(item.origin); const itemDestination = portById.get(item.destination); return <button type="button" className={`route-row ${item.id === activeRouteId ? 'active' : ''}`} key={item.id} onClick={() => setActiveRouteId(item.id)}><span className="route-row-indicator" /><span><span className="route-row-title">{item.name}</span><span className="route-row-meta">{itemOrigin?.code} <ArrowRight size={11} /> {itemDestination?.code}</span></span><ChevronRight size={15} className="route-chevron" /></button> })}</div>
              <div className="sidebar-foot"><span className="foot-dot" /> MAP DATA CONFIGURABLE</div>
            </div>}
          </aside>

          <button className={`mobile-drawer-trigger ${drawerOpen ? 'is-open' : ''}`} onClick={() => setDrawerOpen(!drawerOpen)} type="button" aria-expanded={drawerOpen}><span className="drawer-trigger-icon">{drawerOpen ? <X size={16} /> : <ChevronsUpDown size={16} />}</span><span>{drawerOpen ? 'CLOSE NETWORK' : selectedPort?.name ?? 'NETWORK PORTS'}</span><ChevronDown size={15} className={drawerOpen ? 'rotate' : ''} /></button>
          {drawerOpen && <div className="mobile-drawer">{ports.map((port) => <button key={port.id} type="button" onClick={() => selectPort(port)} className={`drawer-port ${selectedPortId === port.id ? 'active' : ''}`}><span className="drawer-dot" /><span>{port.name}<small>{port.country} · {port.code}</small></span>{selectedPortId === port.id && <span className="drawer-check">✓</span>}</button>)}<div className="drawer-divider" />{shippingRoutes.map((item) => <button key={item.id} type="button" onClick={() => { setActiveRouteId(item.id); setDrawerOpen(false) }} className="drawer-route"><span className="drawer-dot" />{item.name}<small>ILLUSTRATIVE</small></button>)}</div>}

          <div className="map-coordinate-note"><span className="coord-cross">+</span> 01° 21&apos; N&nbsp;&nbsp; 103° 49&apos; E <span className="coordinate-separator">·</span> NETWORK VIEW</div>

          {selectedPort && <div className="selected-port-card"><button type="button" className="selected-card-close" aria-label="Dismiss port details" onClick={() => setSelectedPortId('')}><X size={13} /></button><span className="selected-kicker">NETWORK GATEWAY</span><strong>{selectedPort.name}</strong><span>{selectedPort.country} <i /> {selectedPort.code}</span></div>}

          <div className="map-scale"><span className="scale-line" /> <span>500 KM</span></div>
          <div className="map-mobile-attribution">SEA LLOYD <span>·</span> NETWORK VISUALIZATION</div>
        </div>
      </section>
      <footer className="network-footer max-sm:flex-wrap max-sm:h-auto max-sm:min-h-[39px] max-sm:gap-y-2 max-sm:py-2">
        <span>SEA LLOYD <i>·</i> CONNECTING GLOBAL TRADE</span>
        <span>ALL ROUTES SHOWN ARE FOR NETWORK VISUALIZATION</span>
        {scheduleAvailable ? (
          <a
            className={scheduleButtonClass}
            href={SCHEDULE_PDF_PATH}
            download="Sea-Lloyd-Sailing-Schedule.pdf"
          >
            <Download aria-hidden="true" className="size-4 text-[#ef7120]" strokeWidth={2.2} />
            Download Sailing Schedule
          </a>
        ) : (
          <button
            aria-label="Download Sailing Schedule — Schedule PDF coming soon"
            className={`${scheduleButtonClass} h-auto min-h-9 cursor-not-allowed opacity-80`}
            disabled
            type="button"
          >
            <Download aria-hidden="true" className="size-4 shrink-0 text-[#ef7120]" strokeWidth={2.2} />
            <span className="flex flex-col items-start leading-tight">
              <span>Download Sailing Schedule</span>
              <span className="text-[8px] font-medium text-white/70">Schedule PDF coming soon</span>
            </span>
          </button>
        )}
        <span>© SEA LLOYD</span>
      </footer>
     
    </main>
  )
}


