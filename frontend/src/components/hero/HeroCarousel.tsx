import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

interface HeroCarouselProps {
  images: string[]
  intervalMs?: number
  className?: string
}

export default function HeroCarousel({ images, intervalMs = 5000, className }: HeroCarouselProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (safeImages.length <= 1) return
    timerRef.current && window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length)
    }, intervalMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [safeImages.length, intervalMs])

  // Reset blur state on index change and preload the next image for smoother transitions
  useEffect(() => {
    setLoaded(false)
    const next = (index + 1) % Math.max(1, safeImages.length)
    const img = new Image()
    img.src = safeImages[next] || ''
  }, [index, safeImages])

  if (safeImages.length === 0) {
    return (
      <div className={clsx('relative w-full h-64 sm:h-80 md:h-96 lg:h-[36rem] rounded-2xl overflow-hidden shadow-soft bg-gradient-to-br from-primary-400/40 via-secondary-400/40 to-primary-400/40', className)}>
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <p className="text-white/90 font-medium">Add images to src/assets/hero to enable the carousel</p>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('relative w-full h-64 sm:h-80 md:h-96 lg:h-[36rem] rounded-2xl overflow-hidden shadow-soft', className)}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        >
          {/* Blurred background fill to remove letterbox lines */}
          <img
            src={safeImages[index]}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl brightness-90"
            loading="eager"
          />
          {/* Foreground image fully visible */}
          <img
            src={safeImages[index]}
            alt={`Slide ${index + 1}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            className={clsx('absolute inset-0 h-full w-full object-contain object-center transition duration-500',
              loaded ? 'blur-0 scale-100' : 'blur-md scale-105')}
            onLoad={() => setLoaded(true)}
          />
        </motion.div>
      </AnimatePresence>
      {/* overlay removed to avoid visible top line on object-contain */}
      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {safeImages.map((_, i) => (
          <button
            key={i}
            className={clsx('h-2 rounded-full transition', i === index ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80')}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
