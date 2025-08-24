import { http } from './http'

export async function postAccountChat(message: string): Promise<string> {
  const res = await http.post('/api/ai/account/chat', { message })
  return res.data?.reply ?? ''
}

export async function postSupportChat(params: { message: string; file?: File | null }): Promise<string> {
  const form = new FormData()
  form.append('message', params.message)
  if (params.file) form.append('image', params.file)
  const res = await http.post('/api/ai/support/chat', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data?.reply ?? ''
}
