import React, { useMemo, useState } from 'react'
import Container from '../../components/layout/Container'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { formatINR } from '../../utils/currency'

const categories = ['Men', 'Women', 'Kids', 'Accessories']
const brands = ['Zara', 'H&M', 'Nike', 'Adidas']
const colors = ['Black', 'White', 'Blue', 'Red', 'Green']
const sizes = ['XS', 'S', 'M', 'L', 'XL']

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const [search, setSearch] = useState(params.get('q') || '')
  const [cat, setCat] = useState(params.get('category') || '')
  const [brand, setBrand] = useState(params.get('brand') || '')
  const [minP, setMinP] = useState(params.get('min') || '')
  const [maxP, setMaxP] = useState(params.get('max') || '')
  const [color, setColor] = useState(params.get('color') || '')
  const [size, setSize] = useState(params.get('size') || '')

  const applyFilters = (e?: React.FormEvent) => {
    e?.preventDefault()
    const p = new URLSearchParams()
    if (search) p.set('q', search)
    if (cat) p.set('category', cat)
    if (brand) p.set('brand', brand)
    if (minP) p.set('min', minP)
    if (maxP) p.set('max', maxP)
    if (color) p.set('color', color)
    if (size) p.set('size', size)
    setParams(p)
  }

  // demo list for UI only
  const products = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: String(i + 1),
      title: `Product ${i + 1}`,
      price: 999 + i * 100,
      image: '',
    })), []
  )

  return (
    <Container>
      <div className="py-8 grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
        {/* Filters */}
        <aside className="space-y-4">
          <div className="card">
            <div className="card-body">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              <form onSubmit={applyFilters} className="mt-4 space-y-3">
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                <select value={cat} onChange={e=>setCat(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={brand} onChange={e=>setBrand(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="">All Brands</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <div className="flex gap-2">
                  <input value={minP} onChange={e=>setMinP(e.target.value)} placeholder="Min ₹" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                  <input value={maxP} onChange={e=>setMaxP(e.target.value)} placeholder="Max ₹" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                </div>
                <select value={color} onChange={e=>setColor(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="">Any Color</option>
                  {colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={size} onChange={e=>setSize(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="">Any Size</option>
                  {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="flex gap-2">
                  <Button type="submit">Apply</Button>
                  <Button type="button" variant="ghost" onClick={()=>{ setSearch(''); setCat(''); setBrand(''); setMinP(''); setMaxP(''); setColor(''); setSize(''); setParams(new URLSearchParams()) }}>Reset</Button>
                </div>
              </form>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Catalog</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => (
              <div key={p.id} className="card cursor-pointer" onClick={()=>navigate(`/product/${p.id}`)}>
                <div className="card-body p-3">
                  <div className="aspect-[3/4] w-full rounded-lg bg-gray-200" />
                  <div className="mt-3">
                    <p className="text-sm text-gray-700">{p.title}</p>
                    <p className="font-semibold">{formatINR(p.price)}</p>
                  </div>
                  <button className="mt-3 w-full rounded-md bg-primary-600 text-white py-2 text-sm font-semibold hover:bg-primary-700">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
