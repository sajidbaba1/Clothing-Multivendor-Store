import React, { useMemo, useRef, useState } from 'react'
import MessageBubble, { ChatRole } from './MessageBubble'
import UploadDropzone from './UploadDropzone'
import { postAccountChat, postSupportChat } from '../../api/ai'

export default function ChatDock() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'account' | 'support'>('account')
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const [accountMsgs, setAccountMsgs] = useState<{ role: ChatRole; text: string }[]>([
    { role: 'assistant', text: 'Hi! I can help with your account, cart and orders. Ask me anything.' },
  ])
  const [supportMsgs, setSupportMsgs] = useState<{ role: ChatRole; text: string }[]>([
    { role: 'assistant', text: 'Need help with delivery or a bad product? You can upload a photo/receipt too.' },
  ])

  const listRef = useRef<HTMLDivElement>(null)
  const activeMsgs = tab === 'account' ? accountMsgs : supportMsgs

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading])

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    })
  }

  async function handleSend() {
    if (!canSend) return
    const msg = input.trim()
    setInput('')
    setLoading(true)

    if (tab === 'account') {
      setAccountMsgs((m) => [...m, { role: 'user', text: msg }, { role: 'assistant', text: 'Thinking…' }])
      scrollToEnd()
      try {
        const reply = await postAccountChat(msg)
        setAccountMsgs((m) => {
          const n = [...m]
          const idx = n.findIndex((x) => x.text === 'Thinking…' && x.role === 'assistant')
          if (idx >= 0) n[idx] = { role: 'assistant', text: reply || 'Sorry, I could not process that.' }
          return n
        })
      } catch (e: any) {
        setAccountMsgs((m) => [...m, { role: 'assistant', text: 'Request failed. Please try again.' }])
      } finally {
        setLoading(false)
        scrollToEnd()
      }
    } else {
      setSupportMsgs((m) => [...m, { role: 'user', text: msg }, { role: 'assistant', text: 'Reviewing…' }])
      scrollToEnd()
      try {
        const reply = await postSupportChat({ message: msg, file })
        setSupportMsgs((m) => {
          const n = [...m]
          const idx = n.findIndex((x) => x.text === 'Reviewing…' && x.role === 'assistant')
          if (idx >= 0) n[idx] = { role: 'assistant', text: reply || 'Sorry, I could not process that.' }
          return n
        })
      } catch (e: any) {
        setSupportMsgs((m) => [...m, { role: 'assistant', text: 'Request failed. Please try again.' }])
      } finally {
        setLoading(false)
        scrollToEnd()
      }
    }
  }

  return (
    <div className="pointer-events-none">
      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 z-40 pointer-events-auto">
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-secondary-600 hover:bg-secondary-700 text-white shadow-lg w-14 h-14 flex items-center justify-center text-lg"
          aria-label="Open chat"
        >
          {open ? '×' : '💬'}
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 w-[360px] max-w-[90vw] z-40 pointer-events-auto">
          <div className="card">
            <div className="card-body p-0 flex flex-col h-[520px]">
              {/* Tabs */}
              <div className="flex">
                <button
                  onClick={() => setTab('account')}
                  className={`flex-1 py-2 text-sm font-semibold ${tab === 'account' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  Account Assistant
                </button>
                <button
                  onClick={() => setTab('support')}
                  className={`flex-1 py-2 text-sm font-semibold ${tab === 'support' ? 'bg-secondary-50 text-secondary-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  Support
                </button>
              </div>

              {/* Messages */}
              <div ref={listRef} className="flex-1 overflow-y-auto p-3 bg-gray-50">
                {(tab === 'account' ? accountMsgs : supportMsgs).map((m, i) => (
                  <MessageBubble key={i} role={m.role} text={m.text} />
                ))}
              </div>

              {/* Support uploader */}
              {tab === 'support' && (
                <div className="px-3 pt-2">
                  <UploadDropzone file={file} setFile={setFile} />
                </div>
              )}

              {/* Composer */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
                    placeholder={tab === 'account' ? 'Ask about your orders, cart, etc.' : 'Describe the issue. You can attach an image.'}
                    className="flex-1 field-input"
                  />
                  <button onClick={handleSend} disabled={!canSend} className="px-3 rounded-lg bg-primary-600 text-white disabled:opacity-60">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
