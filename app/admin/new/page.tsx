import { prisma } from '@/lib/prisma'
import PostForm from '@/components/admin/PostForm'

export default async function NewPostPage() {
  const allTags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    select: { name: true, slug: true },
  })

  return <PostForm allTags={allTags} />
}
