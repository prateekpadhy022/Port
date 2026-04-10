import { SKILLS } from '@/data/skills'

export default function SkillsSection() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <p className="section-label reveal">Skills</p>
        <h2 className="section-title reveal">Tech Stack</h2>
        <div className="skills-grid">
          {SKILLS.map((group, i) => (
            <div
              className="skill-group reveal"
              key={group.title}
              style={{ '--delay': `${i * 60}ms`, '--group-color': group.color } as React.CSSProperties}
            >
              <p className="skill-group-title" style={{ color: group.color }}>{group.title}</p>
              <div className="skill-tags">
                {group.tags.map((t) => (
                  <span
                    className="tag"
                    key={t}
                    style={{ '--tag-color': group.color } as React.CSSProperties}
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
