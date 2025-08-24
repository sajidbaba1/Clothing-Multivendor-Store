import React, { useState } from 'react'
import Container from '../../components/layout/Container'
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { setCredentials } from '../../features/auth/authSlice'

export default function SellerApply() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [form, setForm] = useState({ shopName: '', contact: '', address: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Redirect to OTP pages; in a real flow we would call backend to start OTP
    navigate('/request-otp', { state: { purpose: 'BECOME_SELLER', form } })
    setLoading(false)
  }

  const simulatePostOtpSuccess = () => {
    // Simulate role upgrade after OTP verification
    dispatch(setCredentials({ accessToken: localStorage.getItem('auth_token') || 'dev-token', email: localStorage.getItem('auth_email') || 'user@example.com', role: 'vendor' }))
    navigate('/vendor')
  }

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-extrabold text-gray-900">Become a Seller</h1>
        <p className="mt-2 text-gray-600">Fill in your store details. You'll verify via OTP, then you can start adding products.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Shop name</label>
            <input name="shopName" value={form.shopName} onChange={onChange} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact number</label>
            <input name="contact" value={form.contact} onChange={onChange} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea name="address" value={form.address} onChange={onChange} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500" rows={3} />
          </div>
          <div className="flex gap-3">
            <Button type="submit" loading={loading}>Continue & Verify OTP</Button>
            <Button type="button" variant="secondary" onClick={simulatePostOtpSuccess}>Skip OTP (Dev)</Button>
          </div>
        </form>
      </div>
    </Container>
  )
}
