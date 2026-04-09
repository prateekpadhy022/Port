import { z } from 'zod'

export const PostSchema = z.object({
  title: z.string().min(1, 'Title required').max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(1, 'Excerpt required').max(500),
  content: z.string().min(1, 'Content required'),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  thumbnailAlt: z.string().max(200).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  tagSlugs: z.array(z.string()).default([]),
})

export type PostInput = z.infer<typeof PostSchema>

export const TagSchema = z.object({
  name: z.string().min(1).max(50),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
})
