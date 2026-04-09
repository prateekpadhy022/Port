'use client'

import { useState } from 'react'
import ImageUploader from './ImageUploader'

interface PostSettingsProps {
  slug: string
  excerpt: string
  status: 'DRAFT' | 'PUBLISHED'
  thumbnailUrl: string
  thumbnailAlt: string
  tags: string[]
  allTags: { name: string; slug: string }[]
  onChange: (updates: Partial<{
    slug: string
    excerpt: string
    status: 'DRAFT' | 'PUBLISHED'
    thumbnailUrl: string
    thumbnailAlt: string
    tags: string[]
  }>) => void
}

export default function PostSettings({
  slug, excerpt, status, thumbnailUrl, thumbnailAlt, tags, allTags, onChange
}: PostSettingsProps) {
  const [tagInput, setTagInput] = useState('')

  const addTag = (slug: string) => {
    if (!tags.includes(slug)) onChange({ tags: [...tags, slug] })
    setTagInput('')
  }

  const removeTag = (slug: string) => {
    onChange({ tags: tags.filter((t) => t !== slug) })
  }

  const filtered = allTags.filter(
    (t) => !tags.includes(t.slug) && t.name.toLowerCase().includes(tagInput.toLowerCase())
  )

  return (
    <aside className="post-settings">
      <div className="post-settings-group">
        <label className="post-settings-label">Status</label>
        <select
          className="post-settings-select"
          value={status}
          onChange={(e) => onChange({ status: e.target.value as 'DRAFT' | 'PUBLISHED' })}
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      <div className="post-settings-group">
        <label className="post-settings-label">Slug</label>
        <input
          className="post-settings-input"
          value={slug}
          onChange={(e) => onChange({ slug: e.target.value })}
          placeholder="my-post-slug"
        />
      </div>

      <div className="post-settings-group">
        <label className="post-settings-label">Excerpt</label>
        <textarea
          className="post-settings-textarea"
          value={excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          rows={3}
          placeholder="One-line summary shown on blog listing…"
        />
      </div>

      <div className="post-settings-group">
        <label className="post-settings-label">Tags</label>
        <div className="post-settings-tags">
          {tags.map((t) => {
            const tag = allTags.find((a) => a.slug === t)
            return (
              <span key={t} className="tag" style={{ '--tag-color': 'var(--accent)' } as React.CSSProperties}>
                {tag?.name ?? t}
                <button type="button" onClick={() => removeTag(t)}>×</button>
              </span>
            )
          })}
        </div>
        <input
          className="post-settings-input"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Search tags…"
        />
        {tagInput && filtered.length > 0 && (
          <ul className="post-settings-tag-suggest">
            {filtered.map((t) => (
              <li key={t.slug} onClick={() => addTag(t.slug)}>{t.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="post-settings-group">
        <label className="post-settings-label">Thumbnail</label>
        <ImageUploader value={thumbnailUrl} onChange={(url) => onChange({ thumbnailUrl: url })} />
        {thumbnailUrl && (
          <input
            className="post-settings-input"
            style={{ marginTop: '8px' }}
            value={thumbnailAlt}
            onChange={(e) => onChange({ thumbnailAlt: e.target.value })}
            placeholder="Alt text for thumbnail"
          />
        )}
      </div>
    </aside>
  )
}
