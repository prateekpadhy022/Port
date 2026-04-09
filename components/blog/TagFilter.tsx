'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface TagFilterProps {
  tags: { name: string; slug: string; _count: { posts: number } }[]
  activeTag?: string
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildHref = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    if (slug) {
      return `/blog/tag/${slug}`
    }
    return '/blog'
  }

  return (
    <div className="tag-filter">
      <Link
        href={buildHref()}
        className={`tag-filter-pill${!activeTag ? ' active' : ''}`}
      >
        All
      </Link>
      {tags.map((t) => (
        <Link
          key={t.slug}
          href={buildHref(t.slug)}
          className={`tag-filter-pill${activeTag === t.slug ? ' active' : ''}`}
        >
          {t.name}
          <span className="tag-filter-count">{t._count.posts}</span>
        </Link>
      ))}
    </div>
  )
}
