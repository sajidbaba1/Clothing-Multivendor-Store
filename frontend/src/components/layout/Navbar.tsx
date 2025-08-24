import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from './Container'
import Button from '../ui/Button'
import { useAppDispatch, useAppSelector } from '../../store'
import { logout } from '../../features/auth/authSlice'
import React from 'react'

export default function Navbar() {
  const auth = useAppSelector(s => s.auth)
  const cartCount = useAppSelector(s => s.cart.items.reduce((a, b) => a + b.quantity, 0))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition'
  const active = 'text-gray-900 bg-gray-100'

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <Container>
        {/* Top bar: brand, search, auth */}
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="font-extrabold text-xl tracking-tight text-gray-900">
            <span className="text-primary-600">S</span>ajid Clothing
          </Link>

          {/* Search */}
          <form className="hidden md:flex flex-1 max-w-xl items-center">
            <input
              className="w-full rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              placeholder="Search for products, brands and more"
              aria-label="Search"
            />
            <Button type="submit" variant="secondary" className="rounded-l-none">Search</Button>
          </form>

          {/* Auth actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Button variant="ghost" onClick={() => navigate('/cart')}>
              Cart{cartCount ? ` (${cartCount})` : ''}
            </Button>
            {!auth.token ? (
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate('/signup')}>Signup</Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <motion.span layout className="text-sm text-gray-600">{auth.email} ({auth.role})</motion.span>
                {auth.role !== 'vendor' && (
                  <Button onClick={() => navigate('/seller/apply')}>Become a seller</Button>
                )}
                {auth.role === 'vendor' && (
                  <Button variant="ghost" onClick={() => navigate('/vendor')}>Vendor</Button>
                )}
                {auth.role === 'admin' && (
                  <Button variant="ghost" onClick={() => navigate('/admin')}>Admin</Button>
                )}
                <Button variant="secondary" onClick={onLogout}>Logout</Button>
              </div>
            )}
          </div>
        </div>

        {/* Categories row */}
        <div className="flex items-center gap-2 py-2 overflow-x-auto">
          <nav className="flex items-center gap-1">
            <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Home</NavLink>
            <NavLink to="/catalog" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Catalog</NavLink>
            <a href="#" className={linkBase}>Men</a>
            <a href="#" className={linkBase}>Women</a>
            <a href="#" className={linkBase}>Kids</a>
            <a href="#" className={`${linkBase} text-secondary-700`}>Sale</a>
            <NavLink to="/health" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Health</NavLink>
          </nav>
        </div>
      </Container>
    </header>
  )
}
