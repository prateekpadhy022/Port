import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import PostGrid from '@/components/blog/PostGrid'
import TagFilter from '@/components/blog/TagFilter'
import SearchBar from '@/components/blog/SearchBar'
import ParticleBackground from '@/components/layout/ParticleBackground'

export const revalidate = 60

interface BlogPageProps {
  searchParams: Promise<{ tag?: string; search?: string; page?: string }>
}

async function getPosts(search?: string) {
  return prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { excerpt: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { publishedAt: 'desc' },
    include: {
      tags: {
        include: { tag: true },
      },
    },
  })
}

async function getTags() {
  const tags = await prisma.tag.findMany({
    include: {
      _count: { select: { posts: { where: { post: { status: 'PUBLISHED' } } } } },
    },
    orderBy: { name: 'asc' },
  })
  return tags.map((t: { name: string; slug: string; _count: { posts: number } }) => ({
    name: t.name,
    slug: t.slug,
    _count: { posts: t._count.posts },
  }))
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const search = params.search
  const [posts, tags] = await Promise.all([getPosts(search), getTags()])

  return (
    <>
      <ParticleBackground />
      <div className="page-wrap">
        <div className="container">
          <div className="blog-header">
            <p className="section-label">Writing</p>
            <h1 className="blog-header-title">Blog</h1>
            <p className="blog-header-sub">
              Notes on LLMs, cloud infrastructure, and engineering.
            </p>
          </div>

          <div className="blog-controls">
            <Suspense>
              <SearchBar initialValue={search} />
            </Suspense>
            <Suspense>
              <TagFilter tags={tags} />
            </Suspense>
          </div>

          <PostGrid posts={posts} />
        </div>
      </div>
    </>
  )
}
