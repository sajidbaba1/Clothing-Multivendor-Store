import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  email: string | null
  role: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('auth_token'),
  email: localStorage.getItem('auth_email'),
  role: localStorage.getItem('auth_role'),
}

interface CredentialsPayload {
  accessToken: string
  email: string
  role: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      const { accessToken, email, role } = action.payload
      state.token = accessToken
      state.email = email
      state.role = role
      localStorage.setItem('auth_token', accessToken)
      localStorage.setItem('auth_email', email)
      localStorage.setItem('auth_role', role)
    },
    logout: (state) => {
      state.token = null
      state.email = null
      state.role = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')
      localStorage.removeItem('auth_role')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
