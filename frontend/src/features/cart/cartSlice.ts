import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  productId: string
  title: string
  price: number
  quantity: number
  image?: string
  variant?: { color?: string; size?: string }
}

interface CouponState {
  code: string
  discountPct?: number
  discountFlat?: number
}

interface CartState {
  items: CartItem[]
  coupon: CouponState | null
}

const persisted = localStorage.getItem('cart_state')
const initialState: CartState = persisted ? JSON.parse(persisted) : { items: [], coupon: null }

function persist(state: CartState) {
  localStorage.setItem('cart_state', JSON.stringify(state))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload
      const idx = state.items.findIndex(i => i.productId === item.productId && i.variant?.color === item.variant?.color && i.variant?.size === item.variant?.size)
      if (idx >= 0) {
        state.items[idx].quantity += item.quantity
      } else {
        state.items.push(item)
      }
      persist(state)
    },
    updateQty: (state, action: PayloadAction<{ productId: string; delta: number; variant?: { color?: string; size?: string } }>) => {
      const { productId, delta, variant } = action.payload
      const idx = state.items.findIndex(i => i.productId === productId && i.variant?.color === variant?.color && i.variant?.size === variant?.size)
      if (idx >= 0) {
        state.items[idx].quantity = Math.max(1, state.items[idx].quantity + delta)
      }
      persist(state)
    },
    removeItem: (state, action: PayloadAction<{ productId: string; variant?: { color?: string; size?: string } }>) => {
      const { productId, variant } = action.payload
      state.items = state.items.filter(i => !(i.productId === productId && i.variant?.color === variant?.color && i.variant?.size === variant?.size))
      persist(state)
    },
    clearCart: (state) => {
      state.items = []
      state.coupon = null
      persist(state)
    },
    applyCoupon: (state, action: PayloadAction<CouponState>) => {
      state.coupon = action.payload
      persist(state)
    },
    removeCoupon: (state) => {
      state.coupon = null
      persist(state)
    },
  },
})

export const { addItem, updateQty, removeItem, clearCart, applyCoupon, removeCoupon } = cartSlice.actions
export default cartSlice.reducer

export const cartTotals = (state: CartState) => {
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const discountPct = state.coupon?.discountPct ?? 0
  const discountFlat = state.coupon?.discountFlat ?? 0
  const discount = Math.floor(subtotal * discountPct / 100) + discountFlat
  const total = Math.max(0, subtotal - discount)
  return { subtotal, discount, total }
}
