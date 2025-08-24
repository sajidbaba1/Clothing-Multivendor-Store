import React, { useCallback, useState } from 'react'
import clsx from 'clsx'

export default function UploadDropzone({ file, setFile }: { file: File | null; setFile: (f: File | null) => void }) {
  const [drag, setDrag] = useState(false)

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [setFile])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f)
  }

  return (
    <div
      className={clsx(
        'border-2 border-dashed rounded-lg p-3 text-center transition cursor-pointer',
        drag ? 'border-secondary-500 bg-secondary-50' : 'border-gray-300 hover:bg-gray-50'
      )}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
    >
      <input type="file" accept="image/*" onChange={onChange} className="hidden" id="support-image-input" />
      <label htmlFor="support-image-input" className="block text-sm text-gray-600">
        {file ? `Selected: ${file.name}` : 'Drop image here, or click to upload receipt/defect photo'}
      </label>
    </div>
  )
}
