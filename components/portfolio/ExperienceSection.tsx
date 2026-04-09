import { EXPERIENCE } from '@/data/experience'

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <p className="section-label reveal">Experience</p>
        <h2 className="section-title reveal">Work History</h2>
        <div className="experience-list">
          {EXPERIENCE.map((exp, i) => (
            <div
              className="exp-item reveal"
              key={exp.company}
              style={{ '--delay': `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="exp-header">
                <div>
                  <p className="exp-company">{exp.company}</p>
                  <p className="exp-role">{exp.role}</p>
                </div>
                <div className="exp-meta">
                  {exp.current && <span className="badge-current">Current</span>}
                  <p className="exp-date">{exp.date}</p>
                  <p className="exp-location">{exp.location}</p>
                </div>
              </div>
              <div className="exp-body">
                <ul>
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
