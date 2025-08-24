import { useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Health from './pages/Health'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAppDispatch, useAppSelector } from './store'
import { logout } from './features/auth/authSlice'

function Navbar() {
  const auth = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
      <Link to="/">Home</Link>
      <Link to="/health">Health</Link>
      {!auth.token && <Link to="/login">Login</Link>}
      {!auth.token && <Link to="/signup">Signup</Link>}
      {auth.token && (
        <>
          <span>Signed in as {auth.email} ({auth.role})</span>
          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </nav>
  )
}

function Home() {
  const navigate = useNavigate()
  const auth = useAppSelector(s => s.auth)
  useEffect(() => {
    // Simple landing for MVP
  }, [])
  return (
    <div style={{ padding: 16 }}>
      <h2>Clothing Store MVP</h2>
      {!auth.token ? (
        <p>Welcome! Please <button onClick={() => navigate('/login')}>login</button> or <button onClick={() => navigate('/signup')}>signup</button>.</p>
      ) : (
        <p>You are logged in.</p>
      )}
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  )
}
