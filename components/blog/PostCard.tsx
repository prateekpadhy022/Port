import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    thumbnailUrl: string | null
    thumbnailAlt: string | null
    publishedAt: Date | null
    readingTime: number | null
    tags: { tag: { name: string; slug: string } }[]
  }
}

export default function PostCard({ post }: PostCardProps) {
  const date = post.publishedAt
    ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
        new Date(post.publishedAt)
      )
    : null

  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      {post.thumbnailUrl && (
        <div className="post-card-thumb">
          <Image
            src={post.thumbnailUrl}
            alt={post.thumbnailAlt ?? post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="post-card-body">
        <div className="post-card-tags">
          {post.tags.map(({ tag }) => (
            <span className="tag" key={tag.slug} style={{ '--tag-color': 'var(--accent)' } as React.CSSProperties}>
              {tag.name}
            </span>
          ))}
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-meta">
          {date && <span className="post-card-date">{date}</span>}
          {post.readingTime && (
            <span className="post-card-read">{post.readingTime} min read</span>
          )}
        </div>
      </div>
    </Link>
  )
}
