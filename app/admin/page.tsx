'use client'

import Link from 'next/link'
import { useEffect, useState, useTransition } from 'react'
import AdminPostRow from '@/components/admin/AdminPostRow'

interface Post {
  id: string
  title: string
  slug: string
  status: string
  publishedAt: Date | null
  readingTime: number | null
  tags: { tag: { name: string } }[]
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [, startTransition] = useTransition()

  useEffect(() => {
    fetch('/api/posts?status=all')
      .then((r) => r.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  const handleDelete = (id: string) => {
    fetch(`/api/posts/${id}`, { method: 'DELETE' }).then(() => {
      startTransition(() => setPosts((p) => p.filter((post) => post.id !== id)))
    })
  }

  const published = posts.filter((p) => p.status === 'PUBLISHED').length
  const drafts = posts.filter((p) => p.status === 'DRAFT').length

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Dashboard</h1>
        <Link href="/admin/new" className="btn btn-primary">+ New Post</Link>
      </div>

      <div className="admin-stats">
        <div className="stat">
          <div className="stat-num">{posts.length}</div>
          <div className="stat-label">Total posts</div>
        </div>
        <div className="stat">
          <div className="stat-num">{published}</div>
          <div className="stat-label">Published</div>
        </div>
        <div className="stat">
          <div className="stat-num">{drafts}</div>
          <div className="stat-label">Drafts</div>
        </div>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Status</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <AdminPostRow key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
