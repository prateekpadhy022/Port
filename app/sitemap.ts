import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? 'https://prateekpadhy.dev'

  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  })

  const postUrls = posts.map((p: { slug: string; updatedAt: Date }) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...postUrls,
  ]
}
