"use client"

import { Search, Ship, X } from "lucide-react"
import { useMemo, useState } from "react"
import type { SailingScheduleEntry, SailingScheduleRoute } from "@/app/data/e-services/sailing-schedules"

function formatScheduleValue(value: string | null | undefined) {
  if (!value) return "—"
  if (value === "TBA" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const timestamp = Date.parse(`${value}T00:00:00Z`)
  if (Number.isNaN(timestamp)) return value

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(timestamp)
}

function columnWidth(column: string) {
  if (column === "Vessel") return 188
  if (column === "Voyage") return 128
  if (column === "Registration No.") return 152
  if (column === "Service Name" || column === "West/North") return 140
  return 134
}

function matchesSearch(entry: SailingScheduleEntry, query: string) {
  const searchValue = query.trim().toLocaleLowerCase()
  if (!searchValue) return true

  return [entry.Vessel, entry.Voyage, entry["Registration No."]]
    .filter((value): value is string => typeof value === "string")
    .some((value) => value.toLocaleLowerCase().includes(searchValue))
}

export function ScheduleTable({ route }: { route: SailingScheduleRoute }) {
  const [search, setSearch] = useState("")
  const sailings = useMemo(
    () => route.sailings.filter((entry) => matchesSearch(entry, search)),
    [route.sailings, search],
  )
  const tableWidth = route.columns.reduce((total, column) => total + columnWidth(column), 0)

  return (
    <section aria-labelledby="schedule-panel-heading" className="min-w-0 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_8px_30px_rgba(43,51,134,0.05)]">
      <div className="border-b border-[#e2e8f0] p-4 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0 xl:flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2b3386]/[0.07] px-2.5 py-1 text-[10px] font-semibold tracking-[.06em] text-[#2b3386]">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#2b3386]" />
                SCHEDULE AVAILABLE
              </span>
              {route.serviceLabel ? (
                <span className="rounded-full border border-[#e2e8f0] px-2.5 py-1 text-[10px] font-medium tracking-[.03em] text-[#45556C]">
                  {route.serviceLabel}
                </span>
              ) : null}
            </div>
            <h2 id="schedule-panel-heading" className="mt-3 text-xl leading-tight font-semibold tracking-[-.03em] text-[#2b3386] sm:text-2xl">
              {route.origin} <span aria-hidden="true" className="text-[#ef7120]">→</span> {route.destination}
            </h2>
            <p className="mt-1.5 text-sm text-[#45556C]">
              {route.sailings.length} {route.sailings.length === 1 ? "vessel entry" : "vessel entries"} in the published schedule
            </p>
          </div>

          <div className="w-full xl:max-w-[340px]">
            <label htmlFor="vessel-search" className="mb-1.5 block text-xs font-semibold text-[#2b3386]">
              Search this route
            </label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#45556C]" />
              <input
                id="vessel-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Vessel, voyage or registration"
                className="min-h-11 w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] py-2.5 pr-11 pl-10 text-sm text-[#2b3386] outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[#45556C]/70 focus:border-[#2b3386]/45 focus:bg-white focus:ring-2 focus:ring-[#2b3386]/10 motion-reduce:transition-none"
              />
              {search ? (
                <button
                  type="button"
                  aria-label="Clear vessel search"
                  onClick={() => setSearch("")}
                  className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-[#45556C] transition-colors hover:bg-[#2b3386]/[0.06] hover:text-[#2b3386] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] motion-reduce:transition-none"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <p aria-live="polite" className="mt-4 text-xs text-[#45556C]">
          Showing <span className="font-semibold text-[#2b3386]">{sailings.length}</span> of {route.sailings.length} {route.sailings.length === 1 ? "entry" : "entries"}
        </p>
      </div>

      {sailings.length > 0 ? (
        <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <table className="table-fixed border-separate border-spacing-0 text-left" style={{ minWidth: `${tableWidth}px` }}>
            <caption className="sr-only">
              Vessel sailing schedule for {route.origin} to {route.destination}
            </caption>
            <thead>
              <tr>
                {route.columns.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={`sticky top-0 z-10 border-b border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[11px] font-semibold tracking-[.04em] text-[#2b3386] sm:px-5 ${index === 0 ? "sticky left-0 z-20 shadow-[6px_0_10px_-9px_rgba(43,51,134,0.45)]" : ""}`}
                    style={{ width: `${columnWidth(column)}px` }}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sailings.map((sailing, rowIndex) => {
                const rowBackground = rowIndex % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                return (
                  <tr key={`${route.id}-${sailing.Vessel}-${sailing.Voyage}`} className="group">
                    {route.columns.map((column, columnIndex) => (
                      <td
                        key={column}
                        className={`border-b border-[#e2e8f0]/80 px-4 py-3.5 text-[13px] leading-5 whitespace-nowrap text-[#45556C] transition-colors group-hover:bg-[#2b3386]/[0.025] motion-reduce:transition-none sm:px-5 ${rowBackground} ${columnIndex === 0 ? "sticky left-0 z-[1] font-semibold text-[#2b3386] shadow-[6px_0_10px_-9px_rgba(43,51,134,0.35)]" : ""}`}
                        style={{ width: `${columnWidth(column)}px` }}
                      >
                        {formatScheduleValue(sailing[column])}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-14 text-center sm:py-16">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#f8fafc] text-[#2b3386]">
            <Ship aria-hidden="true" className="size-5" strokeWidth={1.6} />
          </span>
          <h3 className="mt-4 text-base font-semibold text-[#2b3386]">No matching sailings</h3>
          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-[#45556C]">
            No vessel, voyage, or registration number matches “{search}”. Clear your search to see every published entry for this route.
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#2b3386]/20 px-4 text-sm font-semibold text-[#2b3386] transition-colors hover:bg-[#2b3386]/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef7120] motion-reduce:transition-none"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  )
}
