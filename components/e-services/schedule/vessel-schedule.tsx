
"use client"

import {
  CalendarDays,
  CircleAlert,
  Route,
  Ship,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import {
  sailingSchedules,
  scheduleSettings,
  type SailingScheduleRoute,
} from "@/app/data/e-services/sailing-schedules"

import {
  CompactRoutePicker,
  RouteNavigation,
  type RouteFilter,
} from "@/components/e-services/schedule/route-navigation"

import { ScheduleTable } from "@/components/e-services/schedule/schedule-table"

function routeName(route: SailingScheduleRoute) {
  return `${route.origin} → ${route.destination}`
}

function formatScheduleDate(value: string) {
  const timestamp = Date.parse(`${value}T00:00:00Z`)

  if (Number.isNaN(timestamp)) return value

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(timestamp)
}

function scheduleIsDue(lastUpdated: string, intervalDays: number) {
  const [year, month, day] = lastUpdated.split("-").map(Number)

  const updatedAt = Date.UTC(year, month - 1, day)

  const today = new Date()

  const todayUtc = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  )

  const ageInDays = Math.floor(
    (todayUtc - updatedAt) / 86_400_000,
  )

  return ageInDays > intervalDays
}

function ScheduleNotice() {
  return (
    <div
      role="note"
      className="mt-6 flex gap-3 rounded-xl border border-[#ef7120]/25 bg-[#ef7120]/[0.055] p-4 sm:p-5"
    >
      <CircleAlert
        aria-hidden="true"
        className="mt-0.5 size-5 shrink-0 text-[#ef7120]"
        strokeWidth={1.8}
      />

      <div>
        <p className="text-sm font-semibold text-[#2b3386]">
          Schedule Notice
        </p>

        <p className="mt-1 text-sm leading-6 text-[#45556C]">
          {scheduleSettings.notice} Please reconfirm the applicable
          schedule before making shipment arrangements.
        </p>
      </div>
    </div>
  )
}

function SummaryMetric({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: number
  detail: string
  icon: typeof Route
}) {
  return (
    <article className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_6px_22px_rgba(43,51,134,0.035)] transition-[border-color,box-shadow] duration-200 hover:border-[#2b3386]/20 hover:shadow-[0_10px_26px_rgba(43,51,134,0.065)] motion-reduce:transition-none sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] leading-4 font-semibold tracking-[.1em] text-[#45556C] uppercase sm:text-xs">
            {label}
          </p>

          <p className="mt-2 text-2xl leading-none font-semibold tracking-[-.04em] text-[#2b3386] sm:text-[28px]">
            {value}
          </p>
        </div>

        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#2b3386]/[0.06] text-[#2b3386]">
          <Icon
            aria-hidden="true"
            className="size-[18px]"
            strokeWidth={1.8}
          />
        </span>
      </div>

      <p className="mt-2.5 text-xs leading-5 text-[#45556C]">
        {detail}
      </p>
    </article>
  )
}

export function VesselSchedule() {
  // Only routes with available schedules
  const availableRoutes = useMemo(
    () =>
      sailingSchedules.filter(
        (route) => route.status === "available",
      ),
    [],
  )

  const [selectedRouteId, setSelectedRouteId] = useState(
    "chittagong-colombo",
  )

  const [routeQuery, setRouteQuery] = useState("")

  const [routeFilter, setRouteFilter] =
    useState<RouteFilter>("all")

  // Select only an available route
  const selectedRoute =
    availableRoutes.find(
      (route) => route.id === selectedRouteId,
    ) ?? availableRoutes[0]

  // Update search text when selected route changes
  useEffect(() => {
    if (selectedRoute) {
      setRouteQuery(routeName(selectedRoute))
    }
  }, [selectedRoute])

  
  const scheduleEntryCount = useMemo(
    () =>
      availableRoutes.reduce(
        (total, route) => total + route.sailings.length,
        0,
      ),
    [availableRoutes],
  )

  const updateDue = scheduleIsDue(
    scheduleSettings.lastUpdated,
    scheduleSettings.updateIntervalDays,
  )

  // No suspended routes are passed to navigation
  const visibleRoutes = availableRoutes.filter(
    (route) =>
      routeFilter === "all" || route.status === routeFilter,
  )

  function selectRoute(route: SailingScheduleRoute) {
    if (route.status !== "available") return

    setSelectedRouteId(route.id)
    setRouteQuery(routeName(route))
  }

  function changeRouteFilter(filter: RouteFilter) {
    setRouteFilter(filter)
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#45556C]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

        {/* HEADER */}
        <header className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_30px_rgba(43,51,134,0.04)] sm:rounded-3xl sm:p-7 lg:p-9">

          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">

            <div className="max-w-3xl">
              <div className="flex items-start gap-3.5">

                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#2b3386]/[0.06] text-[#2b3386] sm:size-12">
                  <Ship
                    aria-hidden="true"
                    className="size-5 sm:size-[22px]"
                    strokeWidth={1.7}
                  />
                </span>

                <div className="pt-0.5">
                  <p className="text-[10px] font-semibold tracking-[.2em] text-[#ef7120] sm:text-[11px]">
                    SEA LLOYD E-SERVICES
                  </p>

                  <h1 className="mt-1.5 text-balance text-[clamp(2rem,5vw,3.25rem)] leading-[1.04] font-semibold tracking-[-.045em] text-[#2b3386]">
                    Vessel Sailing Schedule
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-[780px] text-sm leading-6 text-[#45556C] sm:mt-5 sm:text-base sm:leading-7">
                Explore published vessel schedules across Sea Lloyd&apos;s
                regional shipping routes. Select your origin and
                destination to view vessel information, voyage references,
                and port-specific schedule milestones.
              </p>
            </div>

            {/* LAST UPDATED */}
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3.5 sm:p-4 xl:min-w-[260px] xl:justify-end">

              <CalendarDays
                aria-hidden="true"
                className="size-5 shrink-0 text-[#2b3386]"
                strokeWidth={1.8}
              />

              <div className="min-w-[125px] flex-1 xl:flex-none">
                <p className="text-[10px] font-semibold tracking-[.12em] text-[#45556C] uppercase">
                  Last updated
                </p>

                <p className="mt-1 text-sm font-semibold text-[#2b3386]">
                  {formatScheduleDate(scheduleSettings.lastUpdated)}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[.06em] ${
                  updateDue
                    ? "bg-[#ef7120]/[0.09] text-[#ef7120]"
                    : "bg-[#2b3386]/[0.07] text-[#2b3386]"
                }`}
              >
                {updateDue ? "UPDATE DUE" : "RECENTLY UPDATED"}
              </span>

              <span className="sr-only">
                The freshness label is a maintenance reminder, not
                confirmation of vessel timing.
              </span>
            </div>
          </div>

          <ScheduleNotice />

          {/* SUMMARY CARDS */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">

            <SummaryMetric
              label="Active Routes"
              value={availableRoutes.length}
              detail="Routes with available sailing schedules"
              icon={Route}
            />

            <SummaryMetric
              label="Vessel Schedule Entries"
              value={scheduleEntryCount}
              detail="Published vessel records"
              icon={CalendarDays}
            />

          </div>
        </header>

        {/* ROUTES + SCHEDULE */}
        <div className="mt-6 grid min-w-0 gap-5 lg:grid-cols-[minmax(250px,0.31fr)_minmax(0,0.69fr)] lg:gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">

          {/* DESKTOP ROUTE NAVIGATION */}
          <RouteNavigation
            routes={visibleRoutes}
            selectedRouteId={selectedRoute?.id ?? ""}
            filter={routeFilter}
            onFilterChange={changeRouteFilter}
            onSelect={selectRoute}
          />

          {/* MAIN CONTENT */}
          <div className="min-w-0 space-y-5">

            {/* MOBILE ROUTE PICKER */}
            {selectedRoute ? (
              <CompactRoutePicker
                routes={availableRoutes}
                selectedRoute={selectedRoute}
                query={routeQuery}
                filter={routeFilter}
                onQueryChange={setRouteQuery}
                onFilterChange={changeRouteFilter}
                onSelect={selectRoute}
              />
            ) : null}

            {/* SCHEDULE TABLE */}
            {selectedRoute ? (
              <ScheduleTable
                key={selectedRoute.id}
                route={selectedRoute}
              />
            ) : (
              <section className="rounded-2xl border border-[#e2e8f0] bg-white p-8 text-center">
                <Ship className="mx-auto size-8 text-[#2b3386]" />

                <h2 className="mt-3 text-lg font-semibold text-[#2b3386]">
                  No Active Routes
                </h2>

                <p className="mt-2 text-sm text-[#45556C]">
                  There are currently no available sailing schedules.
                  Please contact Sea Lloyd for further information.
                </p>
              </section>
            )}

            {selectedRoute ? (
              <p className="px-1 text-xs leading-5 text-[#45556C]">
                {scheduleSettings.notice}
              </p>
            ) : null}

          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-[#e2e8f0] pt-5 text-xs leading-5 text-[#45556C]">
          <p>
            Schedule information is published for reference and may
            change without prior notice. Please reconfirm before making
            shipment arrangements.
          </p>

          <p className="mt-1">
            Schedule review interval: every{" "}
            {scheduleSettings.updateIntervalDays} days.
          </p>
        </footer>

      </div>
    </main>
  )
}

