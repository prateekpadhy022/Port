'use client'

import Link from 'next/link'
import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'

interface AdminPostRowProps {
  post: {
    id: string
    title: string
    slug: string
    status: string
    publishedAt: Date | null
    readingTime: number | null
    tags: { tag: { name: string } }[]
  }
  onDelete: (id: string) => void
}

export default function AdminPostRow({ post, onDelete }: AdminPostRowProps) {
  const [confirming, setConfirming] = useState(false)

  const date = post.publishedAt
    ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
        new Date(post.publishedAt)
      )
    : '—'

  return (
    <>
      <tr className="admin-post-row">
        <td className="admin-cell">
          <span className="admin-post-title">{post.title}</span>
          <span className="admin-post-slug">/blog/{post.slug}</span>
        </td>
        <td className="admin-cell">
          <span className={`badge-status ${post.status.toLowerCase()}`}>
            {post.status}
          </span>
        </td>
        <td className="admin-cell admin-cell-date">{date}</td>
        <td className="admin-cell admin-cell-actions">
          <Link href={`/admin/edit/${post.id}`} className="btn btn-secondary admin-btn">
            Edit
          </Link>
          <Link href={`/blog/${post.slug}`} className="btn btn-secondary admin-btn" target="_blank">
            View
          </Link>
          <button
            type="button"
            className="btn admin-btn admin-btn-delete"
            onClick={() => setConfirming(true)}
          >
            Delete
          </button>
        </td>
      </tr>
      {confirming && (
        <ConfirmDialog
          message={`Delete "${post.title}"? This cannot be undone.`}
          onConfirm={() => { setConfirming(false); onDelete(post.id) }}
          onCancel={() => setConfirming(false)}
        />
      )}
    </>
  )
}
