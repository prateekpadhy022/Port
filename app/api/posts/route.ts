import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { PostSchema } from '@/lib/validations'
import { estimateReadingTime } from '@/lib/reading-time'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const tagSlug = searchParams.get('tag')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = 20

  const posts = await prisma.post.findMany({
    where: {
      ...(status ? { status: status.toUpperCase() as 'DRAFT' | 'PUBLISHED' } : {}),
      ...(tagSlug ? { tags: { some: { tag: { slug: tagSlug } } } } : {}),
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
    skip: (page - 1) * limit,
    take: limit,
    include: { tags: { include: { tag: true } } },
  })

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const result = PostSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
  }

  const { tagSlugs, ...data } = result.data

  const post = await prisma.post.create({
    data: {
      ...data,
      thumbnailUrl: data.thumbnailUrl || null,
      thumbnailAlt: data.thumbnailAlt || null,
      readingTime: estimateReadingTime(data.content),
      publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      author: { connect: { id: session.user.id } },
      tags: {
        create: await resolveTagIds(tagSlugs),
      },
    },
  })

  return NextResponse.json(post, { status: 201 })
}

async function resolveTagIds(slugs: string[]) {
  const tags = await prisma.tag.findMany({ where: { slug: { in: slugs } } })
  return tags.map((t: { id: string }) => ({ tag: { connect: { id: t.id } } }))
}
