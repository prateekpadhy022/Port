'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect } from 'react'

export default function SearchBar({ initialValue = '' }: { initialValue?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(initialValue)
  const [, startTransition] = useTransition()
  const debounced = useDebounce(value, 350)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debounced) {
      params.set('search', debounced)
    } else {
      params.delete('search')
    }
    params.delete('page')
    startTransition(() => {
      router.replace(`/blog?${params.toString()}`)
    })
  }, [debounced]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-bar">
      <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="search-input"
        placeholder="Search posts…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
