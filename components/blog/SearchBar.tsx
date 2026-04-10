'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'

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
    <div className="relative flex items-center">
      <span className="absolute left-3 material-symbols-outlined text-[16px] text-on-surface-variant">
        search
      </span>
      <input
        type="search"
        placeholder="Search posts…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-surface-container rounded-lg pl-9 pr-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  )
}
