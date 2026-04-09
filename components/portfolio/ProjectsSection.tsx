import { PROJECTS } from '@/data/projects'

export default function ProjectsSection() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <p className="section-label reveal">Projects</p>
        <h2 className="section-title reveal">Selected Work</h2>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div
              className="project-card reveal"
              key={p.name}
              style={{ '--card-color': p.color } as React.CSSProperties}
            >
              <div className="project-top">
                <div className="project-icon">{p.icon}</div>
              </div>
              <p className="project-name">{p.name}</p>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span
                    className="tag"
                    key={t}
                    style={{ '--tag-color': p.color } as React.CSSProperties}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
