import React from 'react'
import Container from '../../components/layout/Container'
import Button from '../../components/ui/Button'

export default function AdminDashboard() {
  return (
    <Container>
      <div className="py-8 space-y-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Admin Panel</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card"><div className="card-body space-y-3">
            <h2 className="font-semibold">Users & Vendors</h2>
            <div className="flex gap-2">
              <input placeholder="Search user/vendor" className="rounded-md border border-gray-300 px-3 py-2 w-full" />
              <Button>Search</Button>
            </div>
            <p className="text-gray-600 text-sm">Ban/Unban will be wired to backend.</p>
            <div className="h-40 bg-gray-100 rounded" />
          </div></div>

          <div className="card"><div className="card-body space-y-3">
            <h2 className="font-semibold">Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input placeholder="Code" className="rounded-md border border-gray-300 px-3 py-2" />
              <input placeholder="Discount %" type="number" className="rounded-md border border-gray-300 px-3 py-2" />
              <input placeholder="Max uses" type="number" className="rounded-md border border-gray-300 px-3 py-2" />
              <Button>Create</Button>
            </div>
            <div className="h-40 bg-gray-100 rounded" />
          </div></div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card"><div className="card-body"><h2 className="font-semibold">Categories & Brands</h2><div className="h-40 bg-gray-100 rounded" /></div></div>
          <div className="card"><div className="card-body"><h2 className="font-semibold">Analytics</h2><div className="h-40 bg-gray-100 rounded" /></div></div>
        </section>
      </div>
    </Container>
  )
}
