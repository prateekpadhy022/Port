import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  return (
    <div className="admin-layout" style={{ paddingTop: '56px' }}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">prateek.padhy / admin</div>
        <nav>
          <Link href="/admin" className="admin-nav-link">Dashboard</Link>
          <Link href="/admin/new" className="admin-nav-link">New Post</Link>
          <Link href="/blog" className="admin-nav-link" target="_blank">View Site ↗</Link>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="admin-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
              Sign Out
            </button>
          </form>
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  )
}
