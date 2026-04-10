import Link from 'next/link'

interface PostHeaderProps {
  title: string
  publishedAt: Date | null
  readingTime: number | null
  tags: { tag: { name: string; slug: string } }[]
}

export default function PostHeader({ title, publishedAt, readingTime, tags }: PostHeaderProps) {
  const date = publishedAt
    ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(
        new Date(publishedAt)
      )
    : null

  return (
    <header className="post-header">
      <div className="post-header-tags">
        {tags.map(({ tag }) => (
          <Link
            key={tag.slug}
            href={`/blog/tag/${tag.slug}`}
            className="tag"
            style={{ '--tag-color': 'var(--accent)' } as React.CSSProperties}
          >
            {tag.name}
          </Link>
        ))}
      </div>
      <h1 className="post-header-title">{title}</h1>
      <div className="post-header-meta">
        {date && <span>{date}</span>}
        {readingTime && <span>{readingTime} min read</span>}
      </div>
    </header>
  )
}
