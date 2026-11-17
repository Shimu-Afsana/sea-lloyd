import { MapPin } from 'lucide-react'

export function ContactMap() {
  return (
    <section aria-label="Sea Lloyd Singapore headquarters location" className="relative h-[280px] overflow-hidden bg-[#eef3f7] sm:h-[340px] lg:h-[430px]">
      <iframe
        title="Map showing Sea Lloyd Singapore headquarters at International Plaza"
        src="https://maps.google.com/maps?q=10%20Anson%20Road%2C%20International%20Plaza%2C%20Singapore%20079903&t=&z=15&ie=UTF8&iwloc=&output=embed"
        className="absolute inset-0 h-full w-full border-0 grayscale-[.18]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#101b35]/10" />
    
      <div className="pointer-events-none absolute bottom-4 right-4 rounded-md bg-white/90 px-3 py-1.5 text-[10px] font-medium tracking-[.12em] text-[#45556c] shadow sm:bottom-6 sm:right-8">INTERNATIONAL PLAZA</div>
    </section>
  )
}
