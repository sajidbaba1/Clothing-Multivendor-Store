import React, { useState } from 'react'
import Button from '../../../components/ui/Button'

interface Props { onClose?: () => void }

export default function ProductForm({ onClose }: Props) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [colors, setColors] = useState<string>('Black,Blue')
  const [sizes, setSizes] = useState<string>('S,M,L')
  const [stock, setStock] = useState(10)
  const [desc, setDesc] = useState('')
  const [images, setImages] = useState<File[]>([])

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here we'd send multipart/form-data to backend
    alert('Product saved (stub). Ready to integrate with backend.')
    onClose?.()
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <input type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input value={brand} onChange={e=>setBrand(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Colors (comma)</label>
            <input value={colors} onChange={e=>setColors(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sizes (comma)</label>
            <input value={sizes} onChange={e=>setSizes(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input type="number" value={stock} onChange={e=>setStock(Number(e.target.value))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <input type="file" multiple accept="image/*" onChange={onFiles} className="mt-1" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {images.map((f, idx)=> (
              <div key={idx} className="aspect-square bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600 truncate px-1">{f.name}</div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit">Save Product</Button>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </form>
  )
}
