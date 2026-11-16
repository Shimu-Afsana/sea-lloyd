import type { Metadata } from "next"
import { VesselSchedule } from "@/components/e-services/schedule/vessel-schedule"

export const metadata: Metadata = {
  title: "Vessel Sailing Schedule | Sea Lloyd",
  description:
    "Explore published Sea Lloyd vessel schedules across regional shipping routes, including voyage references and port-specific schedule milestones.",
}

export default function VesselSchedulePage() {
  return <VesselSchedule />
}
