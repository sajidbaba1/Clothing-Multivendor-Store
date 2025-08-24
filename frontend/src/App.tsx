import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Health from './pages/Health'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RequestOtp from './pages/RequestOtp'
import VerifyOtp from './pages/VerifyOtp'
import Navbar from './components/layout/Navbar'
import { useAppSelector } from './store'
import Container from './components/layout/Container'
import HeroCarousel from './components/hero/HeroCarousel'
import CategorySlider from './components/sliders/CategorySlider'
import BrandSlider from './components/sliders/BrandSlider'
import Catalog from './pages/catalog/Catalog'
import SellerApply from './pages/seller/SellerApply'
import VendorDashboard from './pages/vendor/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import ProductPage from './pages/product/Product'
import CartPage from './pages/shop/Cart'
import CheckoutPage from './pages/shop/Checkout'
import ThankYouPage from './pages/shop/ThankYou'
import { formatINR } from './utils/currency'
import ChatDock from './components/chat/ChatDock'

// Navbar moved to components/layout/Navbar

function Home() {
  const navigate = useNavigate()
  const auth = useAppSelector(s => s.auth)
  // Auto-load any hero images dropped in src/assets/hero (png/jpg/jpeg/webp/avif)
  const heroImages = Object.values(
    import.meta.glob('./assets/hero/*.{png,jpg,jpeg,webp,avif}', { eager: true, query: '?url', import: 'default' })
  ) as string[]
  useEffect(() => {
    // Simple landing for MVP
  }, [])
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <Container>
          <div className="py-16 md:py-20 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Discover Fashion You Love</h1>
              <p className="mt-3 text-white/90">Shop the latest trends for Men, Women and Kids. Enjoy exclusive offers and fast delivery.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => navigate('/signup')} className="inline-flex items-center justify-center rounded-lg bg-white text-primary-700 font-semibold px-5 py-3 shadow-soft hover:bg-white/90">Get Started</button>
                <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center rounded-lg border border-white/70 text-white font-semibold px-5 py-3 hover:bg-white/10">Login</button>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <HeroCarousel images={heroImages} />
            </div>
          </div>
        </Container>
      </section>

      {/* Shop by Category */}
      <section className="py-10">
        <Container>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Shop by Category</h2>
          </div>
          <CategorySlider />
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-10">
        <Container>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Products</h2>
            <a href="#" className="text-secondary-700 font-semibold hover:underline">View all</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card">
                <div className="card-body p-3">
                  <div className="aspect-[3/4] w-full rounded-lg bg-gray-200" />
                  <div className="mt-3">
                    <p className="text-sm text-gray-700">Product {i + 1}</p>
                    <p className="font-semibold">{formatINR(1499 + i*100)}</p>
                  </div>
                  <button className="mt-3 w-full rounded-md bg-primary-600 text-white py-2 text-sm font-semibold hover:bg-primary-700">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Popular Brands */}
      <section className="py-10">
        <Container>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Brands</h2>
          </div>
          <BrandSlider />
        </Container>
      </section>
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request-otp" element={<RequestOtp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/seller/apply" element={<SellerApply />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      {/* Global AI Chat Dock */}
      <ChatDock />
    </div>
  )
}
