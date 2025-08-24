import React from 'react'
import Container from '../../components/layout/Container'
import { useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useAppDispatch } from '../../store'
import { addItem } from '../../features/cart/cartSlice'
import { formatINR } from '../../utils/currency'

export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const price = 1999

  const addToCart = () => {
    dispatch(addItem({ productId: id || '1', title: `Product ${id}`, price, quantity: 1 }))
  }

  return (
    <Container>
      <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded" />
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Product {id}</h1>
          <p className="mt-2 text-2xl font-bold">{formatINR(price)}</p>
          <p className="mt-4 text-gray-700">Great cloth with multiple colors and sizes. Detailed description here.</p>

          <div className="mt-6 flex gap-3">
            <Button onClick={addToCart}>Add to cart</Button>
            <Button variant="secondary">Buy now</Button>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <div className="mt-3 space-y-3">
              <div className="p-3 bg-gray-50 rounded">Amazing quality! ⭐⭐⭐⭐⭐</div>
              <div className="p-3 bg-gray-50 rounded">Loved the fit. ⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
