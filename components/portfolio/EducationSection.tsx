import { EDUCATION, CERTS } from '@/data/education'

export default function EducationSection() {
  return (
    <section className="section" id="education">
      <div className="container">
        <p className="section-label reveal">Education</p>
        <h2 className="section-title reveal">Academic Background</h2>
        <div className="edu-list">
          {EDUCATION.map((e) => (
            <div className="edu-item reveal" key={e.degree}>
              <div>
                <p className="edu-degree">{e.degree}</p>
                <p className="edu-school">{e.school}</p>
              </div>
              <p className="edu-year">{e.year}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '56px' }}>
          <p className="section-label reveal">Certifications</p>
          <h2 className="section-title reveal" style={{ marginBottom: '24px' }}>Credentials</h2>
          <div className="certs-list">
            {CERTS.map((c) => (
              <div className="cert-item reveal" key={c}>
                <span className="cert-dot" />
                <span className="cert-name">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
