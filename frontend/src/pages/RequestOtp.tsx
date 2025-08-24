import { useState } from 'react'
import { http } from '../api/http'
import Container from '../components/layout/Container'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { motion } from 'framer-motion'

export default function RequestOtp() {
  const [email, setEmail] = useState('')
  const [purpose, setPurpose] = useState<'SIGNUP' | 'LOGIN'>('SIGNUP')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [devCode, setDevCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    setDevCode(null)
    try {
      const res = await http.post('/auth/request-otp', { email, purpose })
      setMessage(res.data?.message ?? 'OTP requested')
      if (res.data?.devCode) setDevCode(res.data.devCode)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to request OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-10">
      <Container>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="card max-w-lg mx-auto">
          <div className="card-body space-y-4">
            <h3 className="text-xl font-bold">Request OTP</h3>
            {error && <div className="rounded-md bg-red-50 p-3 text-red-700 text-sm">{error}</div>}
            {message && <div className="rounded-md bg-green-50 p-3 text-green-700 text-sm">{message}</div>}
            {devCode && (
              <div className="rounded-md border border-dashed border-gray-300 p-3 text-sm">
                <strong className="block mb-1">Dev OTP (visible only if backend dev peek enabled):</strong>
                <code className="text-gray-800">{devCode}</code>
              </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
              <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <div>
                <label className="field-label">Purpose</label>
                <select
                  value={purpose}
                  onChange={e => setPurpose(e.target.value as 'SIGNUP' | 'LOGIN')}
                  className="field-input"
                >
                  <option value="SIGNUP">SIGNUP</option>
                  <option value="LOGIN">LOGIN</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>{loading ? 'Requesting…' : 'Request OTP'}</Button>
              </div>
            </form>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
