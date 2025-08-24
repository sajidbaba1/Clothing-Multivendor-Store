import { useEffect, useState } from 'react'
import { http } from '../api/http'

export default function Health() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    http.get('/api/health')
      .then(res => setData(res.data))
      .catch(err => setError(err?.message ?? 'Error'))
  }, [])

  return (
    <div>
      <h3>Backend Health</h3>
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
      <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
    </div>
  )
}
