import { useState } from 'react'
import { http } from '../api/http'
import { useAppDispatch } from '../store'
import { setCredentials } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Container from '../components/layout/Container'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { motion } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await http.post('/auth/login', { email, password })
      dispatch(setCredentials(res.data))
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-10">
      <Container>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="card max-w-md mx-auto">
          <div className="card-body">
            <h3 className="text-xl font-bold mb-6">Login</h3>
            {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm">{error}</div>}
            <form onSubmit={onSubmit} className="space-y-4">
              <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button type="button" className="text-primary-600 hover:underline" onClick={() => navigate('/request-otp')}>Use OTP</button>
                </div>
                <Button type="submit" loading={loading}>Login</Button>
              </div>
            </form>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
