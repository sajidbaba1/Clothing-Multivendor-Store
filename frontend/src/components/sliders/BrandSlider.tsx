import React, { useMemo } from 'react'
import BlurImage from '../common/BlurImage'

export default function BrandSlider() {
  const images = useMemo(() => {
    return Object.values(
      import.meta.glob('../../assets/brands/*.{png,jpg,jpeg,webp,avif,svg}', {
        eager: true,
        query: '?url',
        import: 'default',
      })
    ) as string[]
  }, [])

  if (!images.length) {
    return (
      <div className="card">
        <div className="card-body">
          <p className="text-gray-700">Add brand logos in <code>src/assets/brands</code> to enable the slider.</p>
        </div>
      </div>
    )
  }

  const track = [...images, ...images]

  return (
    <div className="relative overflow-hidden fade-edges py-6">
      <div className="marquee-fast flex items-center gap-20 md:gap-28 w-max">
        {track.map((src, i) => (
          <div key={i} className="shrink-0 opacity-95 hover:opacity-100 transition">
            <div className="h-40 sm:h-52 md:h-64 min-w-[220px] sm:min-w-[260px] md:min-w-[320px] grid place-items-center bg-white rounded-xl px-8 shadow-sm">
              <BlurImage src={src} alt={`Brand ${i + 1}`} className="h-32 sm:h-44 md:h-56 w-auto object-contain grayscale hover:grayscale-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
