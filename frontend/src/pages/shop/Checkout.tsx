import React, { useState } from 'react'
import Container from '../../components/layout/Container'
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { loadRazorpayScript, openRazorpay } from '../../utils/razorpay'
import { useAppSelector } from '../../store'
import { cartTotals } from '../../features/cart/cartSlice'
import { formatINR } from '../../utils/currency'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const cart = useAppSelector(s => s.cart)
  const totals = cartTotals(cart)
  const [loading, setLoading] = useState(false)

  const pay = async () => {
    setLoading(true)
    const ok = await loadRazorpayScript()
    if (!ok) { alert('Razorpay SDK failed to load'); setLoading(false); return }

    // In real flow, create order on backend and pass order_id & key from server
    openRazorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxx',
      amount: totals.total * 100,
      currency: 'INR',
      name: 'Sajid Clothing',
      description: 'Order Payment',
      handler: (resp) => {
        console.log('Payment success', resp)
        navigate('/thank-you')
      },
    })

    setLoading(false)
  }

  return (
    <Container>
      <div className="py-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-900">Checkout</h1>
        <div className="mt-4 card">
          <div className="card-body space-y-2">
            <div className="flex justify-between text-sm"><span>Total payable</span><span className="font-semibold">{formatINR(totals.total)}</span></div>
            <Button className="w-full" onClick={pay} loading={loading}>Pay with Razorpay</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
