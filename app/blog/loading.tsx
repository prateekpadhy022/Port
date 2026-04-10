export default function BlogLoading() {
  return (
    <div className="page-wrap">
      <div className="container">
        <div className="blog-header">
          <div className="skeleton" style={{ width: 60, height: 12, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: 120, height: 36, marginBottom: 10 }} />
          <div className="skeleton" style={{ width: 280, height: 16 }} />
        </div>
        <div className="post-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="post-card">
              <div className="skeleton" style={{ height: 180 }} />
              <div className="post-card-body" style={{ gap: 12 }}>
                <div className="skeleton" style={{ width: 80, height: 20 }} />
                <div className="skeleton" style={{ width: '80%', height: 20 }} />
                <div className="skeleton" style={{ width: '100%', height: 14 }} />
                <div className="skeleton" style={{ width: '70%', height: 14 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
