'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import PostSettings from './PostSettings'

const PostEditor = dynamic(() => import('./PostEditor'), { ssr: false })

interface PostFormProps {
  initialData?: {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    status: 'DRAFT' | 'PUBLISHED'
    thumbnailUrl: string | null
    thumbnailAlt: string | null
    tags: { tag: { name: string; slug: string } }[]
  }
  allTags: { name: string; slug: string }[]
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

export default function PostForm({ initialData, allTags }: PostFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(initialData?.title ?? '')
  const [content, setContent] = useState(initialData?.content ?? '')
  const [settings, setSettings] = useState({
    slug: initialData?.slug ?? '',
    excerpt: initialData?.excerpt ?? '',
    status: (initialData?.status ?? 'DRAFT') as 'DRAFT' | 'PUBLISHED',
    thumbnailUrl: initialData?.thumbnailUrl ?? '',
    thumbnailAlt: initialData?.thumbnailAlt ?? '',
    tags: initialData?.tags.map((t) => t.tag.slug) ?? [],
  })

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!initialData) {
      setSettings((s) => ({ ...s, slug: slugify(val) }))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    const payload = { title, content, ...settings }
    const url = initialData ? `/api/posts/${initialData.id}` : '/api/posts'
    const method = initialData ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setError(json.error?.formErrors?.[0] ?? 'Failed to save post')
      setSaving(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>
          {initialData ? 'Edit Post' : 'New Post'}
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {error && <span style={{ fontSize: 13, color: '#f87171', alignSelf: 'center' }}>{error}</span>}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="post-form-layout">
        <div>
          <input
            className="post-form-title"
            placeholder="Post title…"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <PostEditor value={content} onChange={setContent} />
        </div>
        <PostSettings
          {...settings}
          allTags={allTags}
          onChange={(updates) => setSettings((s) => ({ ...s, ...updates }))}
        />
      </div>
    </div>
  )
}
