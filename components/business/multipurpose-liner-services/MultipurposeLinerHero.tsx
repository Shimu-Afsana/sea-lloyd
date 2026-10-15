'use client'

import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Globe2, ShieldCheck, Volume2, VolumeX, Waves } from 'lucide-react'

const VIDEO_SRC = '/videos/sealloyd-multipurpose.mp4'
const features = [
  { label: 'Cargo Versatility', icon: Waves },
  { label: 'Reliable Coordination', icon: ShieldCheck },
  { label: 'Connected Trade', icon: Globe2 },
]

export function MultipurposeLinerHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  function toggleSound() {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <section className="liner-hero" aria-labelledby="liner-hero-title">
      <video
        ref={videoRef}
        className="liner-hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="liner-hero__overlay" aria-hidden="true" />
      <div className="liner-hero__grain" aria-hidden="true" />

      <button
        type="button"
        className="liner-hero__sound"
        onClick={toggleSound}
        aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
        aria-pressed={!isMuted}
      >
        {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
      </button>

      <div className="liner-hero__content">
        <p className="liner-hero__eyebrow">Sea Lloyd</p>
        <h1 id="liner-hero-title" className="liner-hero__title">
          Multipurpose Liner Services
        </h1>
        <p className="liner-hero__description">
          Flexible maritime logistics solutions for diverse cargo, connecting businesses through dependable shipping coordination and multimodal transport networks.
        </p>
      </div>

      <div className="liner-hero__features" aria-label="Sea Lloyd service strengths">
        {features.map(({ label, icon: Icon }, index) => (
          <div className="liner-hero__feature" key={label} style={{ '--feature-delay': `${index * 100}ms` } as CSSProperties}>
            <span className="liner-hero__feature-icon"><Icon aria-hidden="true" /></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MultipurposeLinerHero



