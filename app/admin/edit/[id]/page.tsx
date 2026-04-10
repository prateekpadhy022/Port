import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PostForm from '@/components/admin/PostForm'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPageProps) {
  const { id } = await params

  const [post, allTags] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    }),
    prisma.tag.findMany({ orderBy: { name: 'asc' }, select: { name: true, slug: true } }),
  ])

  if (!post) notFound()

  return (
    <PostForm
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        status: post.status,
        thumbnailUrl: post.thumbnailUrl,
        thumbnailAlt: post.thumbnailAlt,
        tags: post.tags,
      }}
      allTags={allTags}
    />
  )
}
