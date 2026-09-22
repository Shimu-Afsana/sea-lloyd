import Hero from "@/components/home/hero";
import Content from "@/components/home/content";
import AboutPreview from "@/components/home/about-preview";
import DirectService from "@/components/home/direct-service";
import LinerServices from "@/components/home/liner-services";
import ShippingAnimation from "@/components/home/shipping-animation";

export default function Page() {
  return (
    <main>
      {/* page content */}
      <Hero />
      <ShippingAnimation />
      <LinerServices />
      <Content />
      <AboutPreview />
      <DirectService />
    </main>
  )
}
