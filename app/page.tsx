import Hero from "@/components/home/hero";
import Content from "@/components/home/content";
import AboutPreview from "@/components/home/about-preview";
import DirectService from "@/components/home/direct-service";

export default function Page() {
  return (
    <main>
      {/* page content */}
      <Hero />
      <Content />
      <AboutPreview />
      <DirectService />
    </main>
  )
}
