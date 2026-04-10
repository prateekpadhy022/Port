'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface TagFilterProps {
  tags: { name: string; slug: string; _count: { posts: number } }[]
  activeTag?: string
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  const searchParams = useSearchParams()

  const buildHref = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    if (slug) {
      return `/blog?tag=${slug}`
    }
    return '/blog'
  }

  return (
    <div className="flex flex-col gap-1">
      {tags.map((t) => {
        const isActive = activeTag === t.slug
        return (
          <Link
            key={t.slug}
            href={buildHref(t.slug)}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>{t.name}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                isActive ? 'bg-primary/20' : 'bg-surface-container-high'
              }`}
            >
              {t._count.posts}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
