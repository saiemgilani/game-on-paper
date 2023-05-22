"use client";

import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'
import emptylogo from '@/public/images/empty-logo.png'

interface ImageWithFallbackProps extends ImageProps {
    fallback?: ImageProps['src']
  }

export default function ImageWithFallback({
    fallback = emptylogo,
    alt,
    src,
    ...props
  }: ImageWithFallbackProps){
    const [error, setError] = useState<React.SyntheticEvent<
      HTMLImageElement,
      Event
    > | null>(null)

    useEffect(() => {
      setError(null)
    }, [src])

    return (
      <Image
        alt={alt}
        onError={setError}
        src={error ? fallback : src}
        {...props}
      />
    )
  }