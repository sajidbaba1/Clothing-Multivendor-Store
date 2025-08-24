import React, { useMemo } from 'react'
import BlurImage from '../common/BlurImage'

export default function CategorySlider() {
  const images = useMemo(() => {
    return Object.values(
      import.meta.glob('../../assets/categories/*.{png,jpg,jpeg,webp,avif,svg}', {
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
          <p className="text-gray-700">Add category images in <code>src/assets/categories</code> to enable the slider.</p>
        </div>
      </div>
    )
  }

  const track = [...images, ...images]

  return (
    <div className="relative overflow-hidden">
      <div className="marquee flex items-center gap-4 w-max">
        {track.map((src, i) => (
          <div key={i} className="shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border border-gray-200 shadow-soft grid place-items-center p-2">
              <BlurImage src={src} alt={`Category ${i + 1}`} className="w-full h-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
