import React from 'react'
import Container from '../../components/layout/Container'
import { useAppDispatch, useAppSelector } from '../../store'
import { cartTotals, removeItem, updateQty } from '../../features/cart/cartSlice'
import Button from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { formatINR } from '../../utils/currency'

export default function CartPage() {
  const cart = useAppSelector(s => s.cart)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const totals = cartTotals(cart)

  return (
    <Container>
      <div className="py-8 grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
        <div className="space-y-3">
          <h1 className="text-2xl font-extrabold text-gray-900">Your Cart</h1>
          {cart.items.length === 0 && <p className="text-gray-600">Your cart is empty.</p>}
          {cart.items.map((i, idx)=> (
            <div key={idx} className="card">
              <div className="card-body flex items-center gap-4">
                <div className="h-20 w-20 bg-gray-200 rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{i.title}</p>
                  <p className="text-sm text-gray-600">{formatINR(i.price)} × {i.quantity}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="ghost" onClick={()=>dispatch(updateQty({ productId: i.productId, delta: -1, variant: i.variant }))}>-</Button>
                    <span className="w-8 text-center">{i.quantity}</span>
                    <Button variant="ghost" onClick={()=>dispatch(updateQty({ productId: i.productId, delta: 1, variant: i.variant }))}>+</Button>
                    <Button variant="ghost" onClick={()=>dispatch(removeItem({ productId: i.productId, variant: i.variant }))}>Remove</Button>
                  </div>
                </div>
                <div className="font-semibold">{formatINR(i.price * i.quantity)}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="card">
            <div className="card-body space-y-2">
              <h2 className="font-semibold">Order Summary</h2>
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span>Discount</span><span>-{formatINR(totals.discount)}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>{formatINR(totals.total)}</span></div>
              <Button className="w-full mt-2" onClick={()=>navigate('/checkout')}>Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
