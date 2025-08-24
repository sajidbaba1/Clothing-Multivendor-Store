declare global {
  interface Window { Razorpay: any }
}

export async function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency?: string
  name?: string
  description?: string
  order_id?: string
  prefill?: { name?: string; email?: string; contact?: string }
  notes?: Record<string, any>
}

export function openRazorpay(options: RazorpayOptions & { handler: (resp: any) => void }) {
  const rz = new window.Razorpay({
    key: options.key,
    amount: options.amount,
    currency: options.currency ?? 'INR',
    name: options.name ?? 'Sajid Clothing',
    description: options.description ?? 'Order Payment',
    order_id: options.order_id,
    prefill: options.prefill,
    notes: options.notes,
    handler: options.handler,
    theme: { color: '#059669' },
  })
  rz.open()
}
