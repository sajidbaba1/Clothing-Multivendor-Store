import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface OtpInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
}

export default function OtpInput({ length = 6, value = '', onChange }: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(Array.from({ length }, (_, i) => value[i] || ''))
  const refs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    setDigits(Array.from({ length }, (_, i) => value[i] || ''))
  }, [value, length])

  const update = (next: string[], idx: number) => {
    setDigits(next)
    const joined = next.join('')
    onChange?.(joined)
    if (next[idx] && idx < length - 1) {
      refs.current[idx + 1]?.focus()
    }
  }

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!text) return
    const next = [...digits]
    for (let i = 0; i < text.length && idx + i < length; i++) {
      next[idx + i] = text[i]
    }
    update(next, Math.min(idx + text.length - 1, length - 1))
  }

  return (
    <div className="flex items-center gap-2">
      {digits.map((d, idx) => (
        <motion.input
          key={idx}
          ref={(el) => { if (el) refs.current[idx] = el }}
          value={d}
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 1)
            const next = [...digits]
            next[idx] = val
            update(next, idx)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              e.preventDefault()
              const next = [...digits]
              if (next[idx]) {
                next[idx] = ''
                update(next, idx)
              } else if (idx > 0) {
                refs.current[idx - 1]?.focus()
                const prev = [...digits]
                prev[idx - 1] = ''
                update(prev, idx - 1)
              }
            }
          }}
          onPaste={(e) => onPaste(e, idx)}
          className={clsx('w-12 h-14 text-center text-2xl font-semibold rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition')}
          whileFocus={{ scale: 1.03 }}
        />
      ))}
    </div>
  )
}
