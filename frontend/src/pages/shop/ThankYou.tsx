import React from 'react'
import Container from '../../components/layout/Container'
import { Link } from 'react-router-dom'

export default function ThankYouPage() {
  return (
    <Container>
      <div className="py-16 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-3xl">✓</div>
        <h1 className="mt-6 text-2xl font-extrabold text-gray-900">Thanks for purchasing!</h1>
        <p className="mt-2 text-gray-600">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
        <div className="mt-6">
          <Link to="/catalog" className="text-secondary-700 font-semibold hover:underline">Continue shopping</Link>
        </div>
      </div>
    </Container>
  )
}
