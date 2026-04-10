import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tags = await prisma.tag.findMany({
    include: {
      _count: { select: { posts: { where: { post: { status: 'PUBLISHED' } } } } },
    },
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(
    tags.map((t: { id: string; name: string; slug: string; _count: { posts: number } }) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      count: t._count.posts,
    }))
  )
}
