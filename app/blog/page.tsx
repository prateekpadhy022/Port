import { Suspense } from 'react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import PostGrid from '@/components/blog/PostGrid'
import TagFilter from '@/components/blog/TagFilter'
import SearchBar from '@/components/blog/SearchBar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on LLMs, cloud infrastructure, and engineering.',
}

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

const CATEGORIES = [
  { label: 'All', slug: '' },
  { label: 'LLMs', slug: 'llms' },
  { label: 'Cloud', slug: 'cloud' },
  { label: 'MLOps', slug: 'mlops' },
  { label: 'Security', slug: 'security' },
  { label: 'Engineering', slug: 'engineering' },
]

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const search = params.search
  const activeTag = params.tag
  const [posts, tags] = await Promise.all([getPosts(search), getTags()])

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest text-primary uppercase mb-3">
            WRITING
          </p>
          <h1 className="font-headline text-5xl sm:text-6xl font-bold text-on-surface leading-tight mb-4">
            Blog
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Notes on LLMs, cloud infrastructure, identity engineering, and
            building things that actually work in production.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar ── */}
          <aside className="lg:w-64 shrink-0 flex flex-col gap-6">
            {/* Search */}
            <div className="glass-panel rounded-xl p-5 border border-outline-variant">
              <p className="text-xs font-mono tracking-widest uppercase text-on-surface-variant mb-3">
                SEARCH
              </p>
              <Suspense>
                <SearchBar initialValue={search} />
              </Suspense>
            </div>

            {/* Categories */}
            <div className="glass-panel rounded-xl p-5 border border-outline-variant">
              <p className="text-xs font-mono tracking-widest uppercase text-on-surface-variant mb-3">
                CATEGORIES
              </p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map(({ label, slug }) => {
                  const isActive = activeTag === slug || (!activeTag && slug === '')
                  return (
                    <Link
                      key={slug}
                      href={slug ? `/blog?tag=${slug}` : '/blog'}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <span className="material-symbols-outlined text-[14px]">
                          chevron_right
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="glass-panel rounded-xl p-5 border border-outline-variant">
                <p className="text-xs font-mono tracking-widest uppercase text-on-surface-variant mb-3">
                  TAGS
                </p>
                <Suspense>
                  <TagFilter tags={tags} />
                </Suspense>
              </div>
            )}

            {/* Newsletter widget */}
            <div className="rounded-xl p-5 border border-secondary/30 bg-secondary/5">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  mail
                </span>
              </div>
              <p className="font-headline font-semibold text-on-surface text-sm mb-1">
                Stay updated
              </p>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Get new posts delivered to your inbox.
              </p>
              <Link
                href="/contact"
                className="text-xs font-mono text-secondary hover:underline flex items-center gap-1"
              >
                Subscribe
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </aside>

          {/* ── Feed ── */}
          <div className="flex-1">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30 mb-4">
                  article
                </span>
                <p className="font-headline text-lg text-on-surface-variant mb-2">
                  No posts yet
                </p>
                <p className="text-sm text-on-surface-variant/60">
                  Check back soon — writing is in progress.
                </p>
              </div>
            ) : (
              <PostGrid posts={posts} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
