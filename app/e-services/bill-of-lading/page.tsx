import type { Metadata } from "next"
import { BillOfLadingHero } from "@/components/e-services/bill-of-lading/bill-of-lading-hero"
import { BillOfLadingTerms } from "@/components/e-services/bill-of-lading/bill-of-lading-terms"

export const metadata: Metadata = {
  title: "Bill of Lading Terms & Conditions | Sea Lloyd",
  description: "Review Sea Lloyd's Bill of Lading terms and conditions governing the carriage of goods, and download the official PDF.",
}

export default function BillOfLadingPage() {
  return (
    <main className="min-h-screen bg-white">
      <BillOfLadingHero />
      <BillOfLadingTerms />
    </main>
  )
}
