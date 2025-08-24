import React from 'react'
import clsx from 'clsx'

export type ChatRole = 'user' | 'assistant'

export default function MessageBubble({ role, text }: { role: ChatRole; text: string }) {
  const isUser = role === 'user'
  return (
    <div className={clsx('w-full flex mb-2', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow',
          isUser ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
        )}
      >
        {text}
      </div>
    </div>
  )
}
