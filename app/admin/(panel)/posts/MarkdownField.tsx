'use client'

import { useState } from 'react'
import PostBody from '@/components/PostBody'

type MarkdownFieldProps = {
  id: string
  name: string
  label: string
  lang: 'my' | 'en' | 'de'
  initialValue: string
  rows?: number
  required?: boolean
}

export default function MarkdownField({ id, name, label, lang, initialValue, rows = 12, required = false }: MarkdownFieldProps) {
  const [text, setText] = useState(initialValue)
  const [mode, setMode] = useState<'write' | 'preview'>('write')

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#1E3F20] mb-1">
        {label}
      </label>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode('write')}
          aria-pressed={mode === 'write'}
          className={`text-sm px-3 py-1 rounded ${
            mode === 'write'
              ? 'bg-[#1E3F20] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setMode('preview')}
          aria-pressed={mode === 'preview'}
          className={`text-sm px-3 py-1 rounded ${
            mode === 'preview'
              ? 'bg-[#1E3F20] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Preview
        </button>
      </div>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`text-base border border-gray-300 rounded p-2 w-full ${mode === 'preview' ? 'hidden' : ''}`}
      />
      {mode === 'preview' && (
        <div className="border border-gray-300 rounded p-4 bg-white min-h-[12rem]">
          {text.trim() ? (
            <PostBody markdown={text} lang={lang} />
          ) : (
            <p className="text-gray-500">Nothing to preview.</p>
          )}
        </div>
      )}
      <p className="text-xs text-gray-600 mt-1">Markdown</p>
      {mode === 'preview' && (
        <p className="text-xs text-gray-600 mt-1">Preview uses the same style as the public page. Pictures are not shown.</p>
      )}
    </div>
  )
}
