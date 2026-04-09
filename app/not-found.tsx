import Link from 'next/link'
import ParticleBackground from '@/components/layout/ParticleBackground'

export default function NotFound() {
  return (
    <>
      <ParticleBackground />
      <div className="not-found">
        <div>
          <div className="not-found-code">404</div>
          <p className="not-found-msg">This page doesn&apos;t exist.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/blog" className="btn btn-primary">Read the Blog</Link>
            <Link href="/about" className="btn btn-secondary">View Portfolio</Link>
          </div>
        </div>
      </div>
    </>
  )
}
