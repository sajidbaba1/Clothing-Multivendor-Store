import React, { useState } from 'react'
import clsx from 'clsx'

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  asBg?: boolean
}

export default function BlurImage({ className, asBg = false, onLoad, ...rest }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false)
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true)
    onLoad?.(e)
  }

  if (asBg) {
    // Not used currently, but kept flexible
    return <img {...rest} onLoad={handleLoad} className={clsx(className, 'transition duration-500', loaded ? 'blur-0 scale-100' : 'blur-md scale-105')} />
  }

  return (
    <img
      {...rest}
      loading={rest.loading ?? 'lazy'}
      onLoad={handleLoad}
      className={clsx('transition duration-500 object-cover object-center', loaded ? 'blur-0 scale-100' : 'blur-md scale-105', className)}
    />
  )
}
