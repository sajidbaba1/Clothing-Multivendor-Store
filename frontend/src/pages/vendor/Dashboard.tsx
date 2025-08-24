import React, { useMemo, useState } from 'react'
import Container from '../../components/layout/Container'
import Button from '../../components/ui/Button'
import { useAppSelector } from '../../store'
import ProductForm from './components/ProductForm'

export default function VendorDashboard() {
  const auth = useAppSelector(s => s.auth)
  const [tab, setTab] = useState<'products'|'orders'|'coupons'|'analytics'>('products')

  const TabButton = ({ id, children }: { id: typeof tab; children: React.ReactNode }) => (
    <button onClick={()=>setTab(id)} className={`px-4 py-2 rounded-md text-sm font-semibold ${tab===id? 'bg-primary-600 text-white':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{children}</button>
  )

  return (
    <Container>
      <div className="py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600">{auth.email}</p>
        </div>

        <div className="mt-6 flex gap-2 flex-wrap">
          <TabButton id="products">Products</TabButton>
          <TabButton id="orders">Orders</TabButton>
          <TabButton id="coupons">Coupons</TabButton>
          <TabButton id="analytics">Analytics</TabButton>
        </div>

        <div className="mt-6">
          {tab === 'products' && <ProductsTab />}
          {tab === 'orders' && <OrdersTab />}
          {tab === 'coupons' && <CouponsTab />}
          {tab === 'analytics' && <AnalyticsTab />}
        </div>
      </div>
    </Container>
  )
}

function ProductsTab() {
  const [showForm, setShowForm] = useState(false)
  const products = useMemo(()=> Array.from({length:4}).map((_,i)=>({id:String(i+1), title:`My Product ${i+1}`, price:999+i*100})), [])
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your Products</h2>
        <Button onClick={()=>setShowForm(true)}>Add Product</Button>
      </div>
      {showForm && (
        <div className="mt-4 card">
          <div className="card-body">
            <ProductForm onClose={()=>setShowForm(false)} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {products.map(p => (
          <div key={p.id} className="card">
            <div className="card-body p-3">
              <div className="aspect-[3/4] w-full rounded-lg bg-gray-200" />
              <div className="mt-3">
                <p className="text-sm text-gray-700">{p.title}</p>
                <p className="font-semibold">₹{p.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrdersTab() {
  return (
    <div className="card">
      <div className="card-body">
        <p className="text-gray-700">Your orders will appear here. Filter by status and date. (To be wired with backend)</p>
      </div>
    </div>
  )
}

function CouponsTab() {
  return (
    <div className="card">
      <div className="card-body space-y-3">
        <p className="text-gray-700">Create and manage coupons.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input placeholder="Code" className="rounded-md border border-gray-300 px-3 py-2" />
          <input placeholder="Discount %" type="number" className="rounded-md border border-gray-300 px-3 py-2" />
          <Button>Create</Button>
        </div>
      </div>
    </div>
  )
}

function AnalyticsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card"><div className="card-body"><h3 className="font-semibold">Sales (real-time)</h3><div className="h-40 bg-gray-100 rounded" /></div></div>
      <div className="card"><div className="card-body"><h3 className="font-semibold">Earnings</h3><div className="h-40 bg-gray-100 rounded" /></div></div>
      <div className="card"><div className="card-body"><h3 className="font-semibold">Top Products</h3><div className="h-40 bg-gray-100 rounded" /></div></div>
      <div className="card"><div className="card-body"><h3 className="font-semibold">Coupons Usage</h3><div className="h-40 bg-gray-100 rounded" /></div></div>
    </div>
  )
}
