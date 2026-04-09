import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import PostGrid from '@/components/blog/PostGrid'
import TagFilter from '@/components/blog/TagFilter'
import ParticleBackground from '@/components/layout/ParticleBackground'

export const revalidate = 60

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = await prisma.tag.findMany({ select: { slug: true } })
  return tags.map((t: { slug: string }) => ({ tag: t.slug }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const tagRecord = await prisma.tag.findUnique({ where: { slug: tag } })
  if (!tagRecord) return {}
  return { title: `#${tagRecord.name}`, description: `Posts tagged ${tagRecord.name}` }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const tagRecord = await prisma.tag.findUnique({ where: { slug: tag } })
  if (!tagRecord) notFound()

  const [posts, allTags] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        tags: { some: { tagId: tagRecord.id } },
      },
      orderBy: { publishedAt: 'desc' },
      include: { tags: { include: { tag: true } } },
    }),
    prisma.tag.findMany({
      include: {
        _count: { select: { posts: { where: { post: { status: 'PUBLISHED' } } } } },
      },
      orderBy: { name: 'asc' },
    }),
  ])

  const tags = allTags.map((t: { name: string; slug: string; _count: { posts: number } }) => ({
    name: t.name,
    slug: t.slug,
    _count: { posts: t._count.posts },
  }))

  return (
    <>
      <ParticleBackground />
      <div className="page-wrap">
        <div className="container">
          <div className="blog-header">
            <p className="section-label">Tag</p>
            <h1 className="blog-header-title">#{tagRecord.name}</h1>
            <p className="blog-header-sub">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="blog-controls">
            <TagFilter tags={tags} activeTag={tag} />
          </div>
          <PostGrid posts={posts} />
        </div>
      </div>
    </>
  )
}
