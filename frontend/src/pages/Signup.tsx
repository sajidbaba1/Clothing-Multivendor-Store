import { useState } from 'react'
import { http } from '../api/http'
import { useAppDispatch } from '../store'
import { setCredentials } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
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
      const res = await http.post('/auth/signup', { name, email, password })
      dispatch(setCredentials(res.data))
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h3>Signup</h3>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Signup'}
        </button>
      </form>
    </div>
  )
}
