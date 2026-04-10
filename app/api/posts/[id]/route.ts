import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { PostSchema } from '@/lib/validations'
import { estimateReadingTime } from '@/lib/reading-time'

interface Ctx {
  params: Promise<{ id: string }>
}

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: { include: { tag: true } }, author: { select: { name: true } } },
  })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const session = await auth()
  if (post.status === 'DRAFT' && !session?.user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PUT(request: Request, { params }: Ctx) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const result = PostSchema.safeParse(body)
  if (!result.success) return NextResponse.json({ error: result.error.flatten() }, { status: 400 })

  const { tagSlugs, ...data } = result.data

  const existing = await prisma.post.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.postTag.deleteMany({ where: { postId: id } })

  const tags = await prisma.tag.findMany({ where: { slug: { in: tagSlugs } } })

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...data,
      thumbnailUrl: data.thumbnailUrl || null,
      thumbnailAlt: data.thumbnailAlt || null,
      readingTime: estimateReadingTime(data.content),
      publishedAt:
        data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED'
          ? new Date()
          : existing.publishedAt,
      tags: {
        create: tags.map((t: { id: string }) => ({ tag: { connect: { id: t.id } } })),
      },
    },
  })

  return NextResponse.json(post)
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.post.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
