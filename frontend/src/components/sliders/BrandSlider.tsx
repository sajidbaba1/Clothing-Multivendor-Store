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
    <div className="relative overflow-hidden">
      <div className="marquee-fast flex items-center gap-8 w-max">
        {track.map((src, i) => (
          <div key={i} className="shrink-0 opacity-80 hover:opacity-100 transition">
            <div className="h-12 sm:h-14 grid place-items-center">
              <BlurImage src={src} alt={`Brand ${i + 1}`} className="h-full w-auto object-contain grayscale hover:grayscale-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
