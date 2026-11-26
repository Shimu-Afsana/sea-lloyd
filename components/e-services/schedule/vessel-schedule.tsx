
"use client"

import { Suspense, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { useSearchParams } from "next/navigation"
import {
  CalendarDays,
  CircleAlert,
  Route,
  Search,
  Ship,
} from "lucide-react"

import {
  sailingSchedules,
  scheduleSettings,
  type SailingScheduleRoute,
} from "@/app/data/e-services/sailing-schedules"

import { ScheduleTable } from "@/components/e-services/schedule/schedule-table"

type SearchMode = "point" | "vessel" | "port" | "all"

type Sailing = SailingScheduleRoute["sailings"][number]

type MatchedSailing = {
  route: SailingScheduleRoute
  sailing: Sailing
}

const PORT_ALIASES: Record<string, string[]> = {
  chittagong: ["chittagong", "chattogram", "bdcgp"],
  chattogram: ["chittagong", "chattogram", "bdcgp"],
  bdcgp: ["chittagong", "chattogram", "bdcgp"],
  singapore: ["singapore", "sgsin"],
  sgsin: ["singapore", "sgsin"],
  "port klang": ["port klang", "mypkg"],
  mypkg: ["port klang", "mypkg"],
  colombo: ["colombo", "lkcmb"],
  lkcmb: ["colombo", "lkcmb"],
  kolkata: ["kolkata", "inccu"],
  inccu: ["kolkata", "inccu"],
  shanghai: ["shanghai", "cnsha"],
  cnsha: ["shanghai", "cnsha"],
  "nhava sheva": ["nhava sheva", "innsa"],
  innsa: ["nhava sheva", "innsa"],
  mundra: ["mundra", "inmun"],
  inmun: ["mundra", "inmun"],
  "jebel ali": ["jebel ali", "aejea"],
  aejea: ["jebel ali", "aejea"],
}

function normalize(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
}

function getSailingValue(
  sailing: Sailing,
  key: string,
): string {
  const data = sailing as Record<string, string | null | undefined>
  return String(data[key] ?? "").trim()
}

function routeName(route: SailingScheduleRoute): string {
  return `${route.origin} → ${route.destination}`
}

function getPortTerms(port: string): string[] {
  const normalized = normalize(port)
  if (!normalized) return []

  return PORT_ALIASES[normalized] ?? [normalized]
}

function matchesPortName(
  value: string,
  terms: string[],
): boolean {
  const normalizedValue = normalize(value)

  return terms.some(
    (term) =>
      normalizedValue.includes(term) ||
      term.includes(normalizedValue),
  )
}

function getMatchingPortColumns(
  route: SailingScheduleRoute,
  port: string,
): string[] {
  const terms = getPortTerms(port)

  return route.columns.filter((column) => {
    const normalizedColumn = normalize(column)

    return (
      terms.some((term) => normalizedColumn.includes(term)) &&
      /eta|etb|etd/i.test(column)
    )
  })
}

function sailingMatchesPort(
  route: SailingScheduleRoute,
  sailing: Sailing,
  port: string,
): boolean {
  if (!port.trim()) return false

  const terms = getPortTerms(port)

  const matchingColumns = getMatchingPortColumns(route, port)

  
  if (matchingColumns.length > 0) {
    return matchingColumns.some(
      (column) => getSailingValue(sailing, column) !== "",
    )
  }


  return (
    matchesPortName(route.origin, terms) ||
    matchesPortName(route.destination, terms)
  )
}

function sailingMatchesDate(
  sailing: Sailing,
  startDate: string,
  endDate: string,
): boolean {
  if (!startDate && !endDate) return true

  const data = sailing as Record<string, string | null | undefined>

  const dates = Object.entries(data)
    .filter(([key, value]) => /ETA|ETB|ETD/i.test(key) && Boolean(value))
    .map(([, value]) => String(value).slice(0, 10))
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))

  if (dates.length === 0) return false

  return dates.some((date) => {
    if (startDate && date < startDate) return false
    if (endDate && date > endDate) return false
    return true
  })
}

function getSearchMode(
  rawMode: string,
  vessel: string,
  port: string,
  origin: string,
  destination: string,
): SearchMode | null {
  const mode = normalize(rawMode)

  if (mode === "point" || mode === "point to point") return "point"
  if (mode === "vessel") return "vessel"
  if (mode === "port") return "port"
  if (mode === "all" || mode === "long range") return "all"

  if (vessel) return "vessel"
  if (port) return "port"
  if (origin || destination) return "point"

  return null
}

function ScheduleNotice({
  children,
  warning = false,
}: {
  children: ReactNode
  warning?: boolean
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
        warning
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : "border-blue-100 bg-blue-50 text-[#2b3386]"
      }`}
    >
      {warning ? (
        <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
      ) : (
        <CalendarDays className="mt-0.5 h-5 w-5 shrink-0" />
      )}
      <div>{children}</div>
    </div>
  )
}

function SummaryMetric({
  label,
  value,
  icon,
}: {
  label: string
  value: string | number
  icon: ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="text-[#ef7120]">{icon}</span>
      </div>
      <div className="text-2xl font-semibold text-[#2b3386]">
        {value}
      </div>
    </div>
  )
}

function VesselScheduleContent() {
  const searchParams = useSearchParams()

  const [selectedRouteId, setSelectedRouteId] = useState(
    "chittagong-colombo",
  )
  const [localSearch, setLocalSearch] = useState("")

  const availableRoutes = useMemo(
    () =>
      sailingSchedules.filter(
        (route) =>
          route.status === "available" &&
          route.sailings.length > 0,
      ),
    [],
  )

  const rawMode = searchParams.get("mode") ?? ""

  const origin = searchParams.get("origin") ?? ""
  const destination = searchParams.get("destination") ?? ""

  const vesselQuery =
    searchParams.get("vessel") ??
    searchParams.get("vesselName") ??
    ""

  const portQuery =
    searchParams.get("port") ??
    searchParams.get("portName") ??
    ""

  const startDate =
    searchParams.get("date") ??
    searchParams.get("from") ??
    ""

  const endDate =
    searchParams.get("endDate") ??
    searchParams.get("to") ??
    ""

  const mode = getSearchMode(
    rawMode,
    vesselQuery,
    portQuery,
    origin,
    destination,
  )

  const hasSearch = mode !== null

  const selectedRoute =
    availableRoutes.find((route) => route.id === selectedRouteId) ??
    availableRoutes[0]

  const matchedSailings = useMemo(() => {
    const results: MatchedSailing[] = []


    if (!mode) return results

    // Vessel and Port searches must have a search value.
    if (mode === "vessel" && !vesselQuery.trim()) return results
    if (mode === "port" && !portQuery.trim()) return results

    availableRoutes.forEach((route) => {
      route.sailings.forEach((sailing) => {
        let matches = false

        if (mode === "vessel") {
          const vesselName = getSailingValue(sailing, "Vessel")

          matches = normalize(vesselName).includes(
            normalize(vesselQuery),
          )
        } else if (mode === "port") {
          matches = sailingMatchesPort(
            route,
            sailing,
            portQuery,
          )
        } else if (mode === "point") {
          const originMatches =
            !origin ||
            normalize(route.origin).includes(normalize(origin))

          const destinationMatches =
            !destination ||
            normalize(route.destination).includes(
              normalize(destination),
            )

          matches =
            Boolean(origin || destination) &&
            originMatches &&
            destinationMatches
        } else if (mode === "all") {
          matches = true
        }

        // Apply date range to Point, Vessel and Port searches.
        // Long Range continues to show all available schedules.
        if (
          matches &&
          mode !== "all" &&
          (startDate || endDate)
        ) {
          matches = sailingMatchesDate(
            sailing,
            startDate,
            endDate,
          )
        }

        // Apply the additional result filter.
        if (matches && localSearch.trim()) {
          const query = normalize(localSearch)
          const data = sailing as Record<
            string,
            string | null | undefined
          >

          const searchableValues = [
            route.origin,
            route.destination,
            ...Object.values(data),
          ]

          matches = searchableValues.some((value) =>
            normalize(value).includes(query),
          )
        }

        if (matches) {
          results.push({ route, sailing })
        }
      })
    })

    return results
  }, [
    availableRoutes,
    mode,
    vesselQuery,
    portQuery,
    origin,
    destination,
    startDate,
    endDate,
    localSearch,
  ])

  const globalSearchRoute = useMemo(() => {
    if (!hasSearch) return null

    const columns = Array.from(
      new Set([
        "Route",
        ...matchedSailings.flatMap(({ route }) => route.columns),
      ]),
    )

    const sailings = matchedSailings.map(({ route, sailing }) => ({
      ...sailing,
      Route: routeName(route),
    }))

    return {
      id: "global-search-results",
      origin: "Search Results",
      destination: "Matching Routes",
      sourceSheet: "Global Search",
      status: "available" as const,
      columns,
      sailings,
    } as SailingScheduleRoute
  }, [hasSearch, matchedSailings])

  const displayRoute = hasSearch
    ? globalSearchRoute
    : selectedRoute

  const totalSailings = availableRoutes.reduce(
    (total, route) => total + route.sailings.length,
    0,
  )

  const searchTitle =
    mode === "vessel"
      ? `Vessel Search: ${vesselQuery}`
      : mode === "port"
        ? `Port Search: ${portQuery}`
        : mode === "point"
          ? `${origin || "Any Origin"} → ${destination || "Any Destination"}`
          : mode === "all"
            ? "Long Range Schedule"
            : "Vessel Sailing Schedule"

  const hasResults =
    Boolean(displayRoute) &&
    (displayRoute?.sailings.length ?? 0) > 0

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#ef7120]">
            <Ship className="h-4 w-4" />
            SEALLOYD SHIPPING
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#2b3386] sm:text-4xl">
            Sailing Schedule
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Explore our vessel movements, sailing routes and port
            schedules. Search by route, vessel name or port to find
            the sailing information you need.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryMetric
            label="Active Routes"
            value={availableRoutes.length}
            icon={<Route className="h-5 w-5" />}
          />

          <SummaryMetric
            label="Total Sailings"
            value={totalSailings}
            icon={<Ship className="h-5 w-5" />}
          />

          <SummaryMetric
            label="Last Updated"
            value={scheduleSettings.lastUpdated}
            icon={<CalendarDays className="h-5 w-5" />}
          />
        </div>

        {hasSearch && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#ef7120]">
                  Search Results
                </div>

                <h2 className="mt-1 text-xl font-semibold text-[#2b3386]">
                  {searchTitle}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {matchedSailings.length} matching sailing
                  {matchedSailings.length === 1 ? "" : "s"} found
                  across all available routes.
                </p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={localSearch}
                  onChange={(event) =>
                    setLocalSearch(event.target.value)
                  }
                  placeholder="Filter these results..."
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#2b3386] focus:ring-2 focus:ring-[#2b3386]/10"
                />
              </div>
            </div>
          </div>
        )}

        {!hasSearch && selectedRoute && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-[#2b3386]">
                Select a Sailing Route
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose a route to view its vessel schedule.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableRoutes.map((route) => {
                const isSelected = route.id === selectedRoute.id

                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setSelectedRouteId(route.id)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                      isSelected
                        ? "border-[#2b3386] bg-[#2b3386] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#2b3386] hover:text-[#2b3386]"
                    }`}
                  >
                    {routeName(route)}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {hasSearch && (
          <div className="mb-6 flex flex-wrap gap-2">
            {mode === "vessel" && (
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm text-[#2b3386]">
                Vessel: {vesselQuery}
              </span>
            )}

            {mode === "port" && (
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm text-[#2b3386]">
                Port: {portQuery}
              </span>
            )}

            {mode === "point" && (
              <>
                {origin && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm text-[#2b3386]">
                    From: {origin}
                  </span>
                )}
                {destination && (
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm text-[#2b3386]">
                    To: {destination}
                  </span>
                )}
              </>
            )}

            {startDate && (
              <span className="rounded-full bg-orange-50 px-3 py-1.5 text-sm text-[#b45309]">
                From: {startDate}
              </span>
            )}

            {endDate && (
              <span className="rounded-full bg-orange-50 px-3 py-1.5 text-sm text-[#b45309]">
                To: {endDate}
              </span>
            )}
          </div>
        )}

        {hasResults && displayRoute ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#2b3386]">
                    {hasSearch
                      ? "Matching Sailing Details"
                      : routeName(displayRoute)}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {displayRoute.sailings.length} sailing
                    {displayRoute.sailings.length === 1 ? "" : "s"} displayed
                  </p>
                </div>

                <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  Available
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <ScheduleTable route={displayRoute} />
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <ScheduleNotice warning>
              <div className="font-semibold">
                No matching sailing schedule found.
              </div>

              <p className="mt-1">
                {mode === "vessel"
                  ? `No sailing was found for vessel "${vesselQuery}". Check the vessel name and try again.`
                  : mode === "port"
                    ? `No sailing was found for port "${portQuery}". Try the port name or its port code.`
                    : "There are no matching schedules for the selected search criteria."}
              </p>
            </ScheduleNotice>

            <a
              href="/e-services/schedule"
              className="mt-5 inline-flex items-center rounded-lg bg-[#2b3386] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ef7120]"
            >
              View All Schedules
            </a>
          </div>
        )}

        <div className="mt-6">
          <ScheduleNotice>
            Sailing schedules are subject to change. Please contact
            Sea Lloyd for the latest confirmation before planning
            your shipment.
          </ScheduleNotice>
        </div>
      </section>
    </main>
  )
}

export function VesselSchedule() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-[#f8f9fc]">
          <div className="text-sm font-medium text-[#2b3386]">
            Loading sailing schedule...
          </div>
        </div>
      }
    >
      <VesselScheduleContent />
    </Suspense>
  )
}



