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
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(post.publishedAt))
    : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col glass-panel rounded-xl border border-outline-variant hover:border-primary/40 transition-colors overflow-hidden"
    >
      {post.thumbnailUrl && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.thumbnailUrl}
            alt={post.thumbnailAlt ?? post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map(({ tag }) => (
              <span
                key={tag.slug}
                className="px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-headline font-bold text-on-surface text-base leading-snug mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-on-surface-variant leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant/60">
          {date && <span>{date}</span>}
          {date && post.readingTime && <span className="w-1 h-1 rounded-full bg-outline" />}
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
      </div>
    </Link>
  )
}
