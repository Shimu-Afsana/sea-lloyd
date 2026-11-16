'use client'

import Image from 'next/image'
import { useState } from 'react'

type ArticleImageProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  style?: React.CSSProperties
}

export function ArticleImage({ src, alt, className, priority, sizes, style }: ArticleImageProps) {
  const [unavailable, setUnavailable] = useState(false)
  if (unavailable) return null

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      style={style}
      onError={() => setUnavailable(true)}
    />
  )
}
