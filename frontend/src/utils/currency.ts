export function formatINR(amount: number | string) {
  const value = typeof amount === 'string' ? Number(amount) : amount
  if (Number.isNaN(value)) return '₹0'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value)
}
