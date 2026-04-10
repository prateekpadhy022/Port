import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { extractHeadings } from '@/lib/mdx'
import PostHeader from '@/components/blog/PostHeader'
import PostBody from '@/components/blog/PostBody'
import ReadingProgress from '@/components/blog/ReadingProgress'
import TableOfContents from '@/components/blog/TableOfContents'

export const revalidate = 60

interface PostPageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: {
      tags: { include: { tag: true } },
      author: { select: { name: true } },
    },
  })
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  })
  return posts.map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      images: post.thumbnailUrl
        ? [{ url: post.thumbnailUrl, alt: post.thumbnailAlt ?? post.title }]
        : [`/api/og?title=${encodeURIComponent(post.title)}`],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author.name ?? 'Prateek Padhy' },
    datePublished: post.publishedAt?.toISOString(),
    image: post.thumbnailUrl ?? undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <div className="page-wrap">
        <div className="container">
          <div className="post-layout">
            <article className="post-main">
              <PostHeader
                title={post.title}
                publishedAt={post.publishedAt}
                readingTime={post.readingTime}
                tags={post.tags}
              />
              <PostBody content={post.content} />
            </article>
            <aside>
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
