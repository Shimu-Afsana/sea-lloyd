
"use client"

import { ArrowRight, Check, ChevronDown, Compass } from "lucide-react"
import type {
  SailingRouteStatus,
  SailingScheduleRoute,
} from "@/app/data/e-services/sailing-schedules"

export type RouteFilter = "all" | "available"

function routeName(route: SailingScheduleRoute) {
  return `${route.origin} → ${route.destination}`
}

function statusLabel(status: SailingRouteStatus) {
  return status === "available" ? "SCHEDULE AVAILABLE" : "SERVICE SUSPENDED"
}

function RouteStatusFilters({
  value,
  onChange,
}: {
  value: RouteFilter
  onChange: (value: RouteFilter) => void
}) {
  const options: { value: RouteFilter; label: string }[] = [
    { value: "all", label: "All routes" },
    { value: "available", label: "Schedule available" },
  ]

  return (
    <div
      role="group"
      aria-label="Filter routes by service status"
      className="grid grid-cols-2 gap-1 rounded-xl bg-[#f8fafc] p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`min-h-9 rounded-lg px-3 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-1 motion-reduce:transition-none ${
            value === option.value
              ? "bg-white text-[#2b3386] shadow-sm"
              : "text-[#45556C] hover:text-[#2b3386]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: SailingRouteStatus }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2 py-1 text-[9px] leading-none font-semibold tracking-[.06em] ${
        status === "available"
          ? "bg-[#2b3386]/[0.07] text-[#2b3386]"
          : "bg-[#ef7120]/[0.09] text-[#ef7120]"
      }`}
    >
      {statusLabel(status)}
    </span>
  )
}

export function RouteNavigation({
  routes,
  selectedRouteId,
  filter,
  onFilterChange,
  onSelect,
}: {
  routes: readonly SailingScheduleRoute[]
  selectedRouteId: string
  filter: RouteFilter
  onFilterChange: (value: RouteFilter) => void
  onSelect: (route: SailingScheduleRoute) => void
}) {
  const filteredRoutes = routes.filter(
    (route) => filter === "all" || route.status === filter
  )

  return (
    <aside className="hidden min-w-0 lg:block">
      <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_8px_28px_rgba(43,51,134,0.045)]">
        <div className="border-b border-[#e2e8f0] p-5">
          <div className="flex items-center gap-2">
            <Compass
              aria-hidden="true"
              className="size-4 text-[#ef7120]"
              strokeWidth={1.8}
            />

            <h2 className="text-sm font-semibold text-[#2b3386]">
              Shipping routes
            </h2>

            <span className="ml-auto rounded-full bg-[#f8fafc] px-2 py-1 text-xs font-medium text-[#45556C]">
              {routes.length}
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-[#45556C]">
            Choose a route to view its published sailing schedule.
          </p>

          <div className="mx-auto mt-4 max-w-[340px]">
            <RouteStatusFilters
              value={filter}
              onChange={onFilterChange}
            />
          </div>
        </div>

        <nav
          aria-label="Shipping routes"
          className="max-h-[min(68vh,760px)] space-y-1.5 overflow-y-auto p-2.5"
        >
          {filteredRoutes.map((route) => {
            const selected = route.id === selectedRouteId

            return (
              <button
                key={route.id}
                type="button"
                aria-current={selected ? "true" : undefined}
                onClick={() => onSelect(route)}
                className={`group relative flex min-h-[78px] w-full items-start gap-2.5 rounded-xl border p-3 text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] focus-visible:ring-offset-1 motion-reduce:transition-none ${
                  selected
                    ? "border-[#2b3386]/20 bg-[#2b3386]/[0.045] shadow-sm"
                    : "border-transparent bg-white hover:border-[#e2e8f0] hover:bg-[#f8fafc]"
                }`}
              >
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${
                    selected
                      ? "border-[#ef7120] bg-[#ef7120] text-white"
                      : "border-[#e2e8f0] bg-white text-transparent group-hover:border-[#2b3386]/30"
                  }`}
                >
                  {selected ? (
                    <Check
                      aria-hidden="true"
                      className="size-3"
                      strokeWidth={2.5}
                    />
                  ) : null}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-[13px] leading-5 font-semibold text-[#2b3386]">
                    <span className="truncate">{route.origin}</span>

                    <ArrowRight
                      aria-hidden="true"
                      className={`size-3.5 shrink-0 ${
                        selected
                          ? "text-[#ef7120]"
                          : "text-[#45556C]/65"
                      }`}
                    />

                    <span className="truncate">{route.destination}</span>
                  </span>

                  <span className="mt-2 block">
                    <StatusBadge status={route.status} />
                  </span>
                </span>

                {selected ? (
                  <span className="sr-only">Selected route</span>
                ) : null}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export function CompactRoutePicker({
  routes,
  selectedRoute,
  query,
  filter,
  onQueryChange,
  onFilterChange,
  onSelect,
}: {
  routes: readonly SailingScheduleRoute[]
  selectedRoute: SailingScheduleRoute
  query: string
  filter: RouteFilter
  onQueryChange: (query: string) => void
  onFilterChange: (value: RouteFilter) => void
  onSelect: (route: SailingScheduleRoute) => void
}) {
  const filteredRoutes = routes.filter(
    (route) => filter === "all" || route.status === filter
  )

  const listId = "sailing-schedule-route-options"

  return (
    <section
      aria-labelledby="route-picker-heading"
      className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_8px_28px_rgba(43,51,134,0.045)] sm:p-5 lg:hidden"
    >
      <div className="flex items-center gap-2">
        <Compass
          aria-hidden="true"
          className="size-4 text-[#ef7120]"
          strokeWidth={1.8}
        />

        <h2
          id="route-picker-heading"
          className="text-sm font-semibold text-[#2b3386]"
        >
          Select a shipping route
        </h2>
      </div>

      <label htmlFor="sailing-route-search" className="sr-only">
        Search and select a route
      </label>

      <div className="relative mt-3">
        <input
          id="sailing-route-search"
          type="search"
          list={listId}
          autoComplete="off"
          value={query}
          onChange={(event) => {
            const value = event.currentTarget.value
            onQueryChange(value)

            const match = routes.find(
              (route) =>
                routeName(route).toLocaleLowerCase() ===
                value.trim().toLocaleLowerCase()
            )

            if (match) onSelect(match)
          }}
          placeholder="Search origin or destination"
          aria-label="Search and select a route"
          aria-describedby="selected-route-status"
          className="min-h-12 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 pr-10 text-sm text-[#2b3386] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#45556C]/70 focus:border-[#2b3386]/45 focus:ring-2 focus:ring-[#2b3386]/10 motion-reduce:transition-none"
        />

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#45556C]"
        />
      </div>

      <datalist id={listId}>
        {filteredRoutes.map((route) => (
          <option key={route.id} value={routeName(route)} />
        ))}
      </datalist>

      <div
        id="selected-route-status"
        className="mt-3 flex flex-wrap items-center gap-2"
      >
        <span className="text-xs font-medium text-[#45556C]">
          Selected:
        </span>

        <span className="text-xs font-semibold text-[#2b3386]">
          {routeName(selectedRoute)}
        </span>

        <StatusBadge status={selectedRoute.status} />
      </div>

      <div className="mt-4 border-t border-[#e2e8f0] pt-3">
        <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[.12em] text-[#45556C]">
          Filter routes
        </p>

        <div className="mx-auto max-w-[340px]">
          <RouteStatusFilters
            value={filter}
            onChange={onFilterChange}
          />
        </div>
      </div>
    </section>
  )
}
