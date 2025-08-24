import { http } from '../api/http'
import { useQuery } from '@tanstack/react-query'
import Container from '../components/layout/Container'
import { motion } from 'framer-motion'

export default function Health() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await http.get('/api/health')
      return res.data
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  })

  return (
    <div className="py-10">
      <Container>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="card max-w-2xl mx-auto">
          <div className="card-body">
            <h3 className="text-xl font-bold mb-4">Backend Health</h3>
            {error && <pre className="mb-3 rounded-md bg-red-50 p-3 text-red-700 text-sm">{(error as any)?.message || String(error)}</pre>}
            <pre className="text-sm whitespace-pre-wrap">{isLoading ? 'Loading…' : JSON.stringify(data, null, 2)}</pre>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
