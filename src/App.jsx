import './App.css'
import ParticleBackground from './ParticleBackground'
import useScrollReveal from './useScrollReveal'

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact']

const SKILLS = [
  {
    title: 'ML & GenAI',
    color: '#00c896',
    tags: ['GPT-4', 'LLaMA', 'LangChain', 'Hugging Face', 'spaCy', 'Scikit-learn', 'CTGAN', 'RAG', 'RLHF'],
  },
  {
    title: 'NLP & Data Eng.',
    color: '#3b9eff',
    tags: ['NER', 'FHIR', 'Apache Beam', 'GCP Dataflow', 'BigQuery', 'ETL Pipelines', 'Data Lake', 'FAISS', 'Pandas'],
  },
  {
    title: 'Backend & Cloud',
    color: '#a78bfa',
    tags: ['Python', 'Flask', 'FastAPI', 'GCP', 'AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Redis', 'Kafka'],
  },
  {
    title: 'Security & IAM',
    color: '#f59e0b',
    tags: ['Keycloak', 'HashiCorp Vault', 'JWT', 'OAuth2', 'RBAC', 'Geofencing', 'SOC2'],
  },
  {
    title: 'MLOps & Testing',
    color: '#f472b6',
    tags: ['PyTest', 'CI/CD', 'Prometheus', 'Grafana', 'Postman', 'Swagger/OpenAPI', 'Streamlit'],
  },
  {
    title: 'Visualization & Other',
    color: '#34d399',
    tags: ['Plotly', 'Dash', 'Matplotlib', 'AG-Grid', 'Kafka', 'Jira', 'Git', 'Agile/Scrum'],
  },
]

const EXPERIENCE = [
  {
    company: 'CMS Info Systems',
    role: 'Cloud Engineer',
    date: 'Jan 2026 – Present',
    location: 'India',
    current: true,
    bullets: [
      'Spearheading an enterprise Vault Management Application — owning the full user management module with JWT-based authentication and session handling.',
      'Integrated Keycloak as a centralized IAM provider enabling SSO, RBAC, and fine-grained permission enforcement across services.',
      'Implemented geofencing logic to enforce location-aware access policies, reducing unauthorized access risk.',
      'Leading a database architecture transition from warehouse-first to lake-first, achieving an estimated 65%+ reduction in infrastructure costs.',
      'Coordinating engineering workflows and incident tracking via Jira Service Management, driving sprint planning and cross-team delivery.',
    ],
  },
  {
    company: 'Outlier AI',
    role: 'AI Data Specialist',
    date: 'Mar 2025 – Nov 2025',
    location: 'USA (Independent Contractor)',
    current: false,
    bullets: [
      'Applied RLHF techniques to improve model performance, alignment, and safety across LLM evaluation tasks.',
      'Performed structured prompt engineering and quality assessments, including peer review of analyst conversations and outputs.',
      'Built interactive analysis dashboards with React and Plotly for anomaly detection in financial datasets.',
      'Promoted ML best practices via internal documentation, peer model reviews, and PyTest coverage metrics.',
    ],
  },
  {
    company: 'Qualcomm Thinkabit Lab',
    role: 'Machine Learning Engineer',
    date: 'Aug 2024 – Feb 2025',
    location: 'USA',
    current: false,
    bullets: [
      'Co-developed QuestLoft, an AI-powered EdTech platform for K–12 STEM education integrating fine-tuned LLMs, Whisper voice-to-text, and Azure TTS.',
      'Engineered a multi-stage RAG pipeline using FAISS, PostgreSQL, and vector embeddings for context-aware chatbot responses.',
      'Built Questy, a GPT-based STEM chatbot with Flask-JWT-Extended RBAC across Admin, Teacher, Parent, and Student roles.',
      'Designed a modular CMS with Redis-powered real-time content propagation to chatbot and quiz systems.',
    ],
  },
]

const PROJECTS = [
  {
    icon: '🔍',
    name: 'LLM-Based Crime Analysis System',
    desc: 'Real-time ingestion and NLP tagging pipeline using LLaMA APIs and Streamlit to analyze and extract structured insights from crime reports.',
    tags: ['LLaMA', 'NLP', 'Streamlit', 'Python'],
    color: '#00c896',
  },
  {
    icon: '🚦',
    name: 'Traffic Incident Intelligence Platform',
    desc: 'Interactive dashboards built with Dash/Plotly and deployed on GCP to help urban planners track and analyze traffic incident trends.',
    tags: ['Dash', 'Plotly', 'GCP', 'Data Viz'],
    color: '#3b9eff',
  },
  {
    icon: '📝',
    name: 'BlogPop: Popularity Prediction',
    desc: 'ML models trained to predict blog post popularity from text metadata, with a live Streamlit UI for real-time predictions.',
    tags: ['Scikit-learn', 'NLP', 'Streamlit', 'Feature Eng.'],
    color: '#a78bfa',
  },
]

const EDUCATION = [
  {
    degree: 'M.Eng. in Computer Science and Application',
    school: 'Virginia Polytechnic and State University, USA',
    year: 'Dec 2024',
  },
  {
    degree: 'B.Sc. in Computer Science — Distinction',
    school: 'SRM University, India',
    year: 'Jun 2022',
  },
]

const CERTS = [
  'Apache Spark SQL for Data Analysts',
  'Using Python to Access Web Data',
  'Azure AI Engineer Associate',
]

const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 6.5h9M7 2l4.5 4.5L7 11" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" strokeLinecap="round" />
  </svg>
)

const IconGithub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.511.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.56 9.56 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
  </svg>
)

const IconLinkedin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
  </svg>
)

export default function App() {
  useScrollReveal()

  return (
    <>
      <ParticleBackground />

      {/* Navbar */}
      <nav>
        <div className="nav-inner">
          <span className="nav-logo">prateek.padhy</span>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
            ))}
          </div>
        </div>
      </nav>

      <div className="page-wrap">

        {/* Hero */}
        <section className="hero" id="home">
          <div className="container hero-content">
            <p className="hero-label">Software &amp; AI Engineer</p>
            <h1 className="hero-name">
              <span className="gradient-text">Prateek</span> Padhy
            </h1>
            <p className="hero-title">
              LLM Pipelines &nbsp;·&nbsp; Cloud Infrastructure &nbsp;·&nbsp; Identity &amp; Data Engineering
            </p>
            <p className="hero-desc">
              1+ year designing and deploying AI/ML solutions for healthcare, fintech, and enterprise systems.
              Hands-on with GPT-4, LLaMA, Keycloak, and cloud-native infrastructure on GCP and AWS.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#experience">
                View Experience <IconArrow />
              </a>
              <a className="btn btn-secondary" href="#contact">
                Get in touch
              </a>
            </div>

            <div className="hero-badges">
              <span className="badge">🎓 Virginia Tech M.Eng.</span>
              <span className="badge">☁️ GCP · AWS</span>
              <span className="badge">🤖 GPT-4 · LLaMA · RAG</span>
              <span className="badge">🔐 Keycloak · Vault</span>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section" id="about">
          <div className="container">
            <p className="section-label reveal">About</p>
            <h2 className="section-title reveal">Background</h2>
            <div className="about-grid">
              <div className="about-text reveal">
                <p>
                  I'm a Software & AI Engineer with a Master's in Computer Science from Virginia Tech.
                  I specialise in building production-grade LLM pipelines, identity and access management systems,
                  and scalable data lake architectures.
                </p>
                <p>
                  My work spans healthcare NLP (FHIR, clinical text parsing), GenAI evaluation (RLHF, prompt engineering),
                  and enterprise security (Vault, Keycloak, geofencing). I'm comfortable leading cross-functional teams
                  and owning full feature cycles from design to deployment.
                </p>
              </div>
              <div className="about-stats reveal">
                <div className="stat">
                  <div className="stat-num">1+</div>
                  <div className="stat-label">Years experience</div>
                </div>
                <div className="stat">
                  <div className="stat-num">3</div>
                  <div className="stat-label">Roles held</div>
                </div>
                <div className="stat">
                  <div className="stat-num">65%</div>
                  <div className="stat-label">Infra cost reduction</div>
                </div>
                <div className="stat">
                  <div className="stat-num">3+</div>
                  <div className="stat-label">Projects shipped</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="section" id="skills">
          <div className="container">
            <p className="section-label reveal">Skills</p>
            <h2 className="section-title reveal">Tech Stack</h2>
            <div className="skills-grid">
              {SKILLS.map((group, i) => (
                <div className="skill-group reveal" key={group.title} style={{ '--delay': `${i * 60}ms`, '--group-color': group.color }}>
                  <p className="skill-group-title" style={{ color: group.color }}>{group.title}</p>
                  <div className="skill-tags">
                    {group.tags.map((t) => (
                      <span className="tag" key={t} style={{ '--tag-color': group.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="section" id="experience">
          <div className="container">
            <p className="section-label reveal">Experience</p>
            <h2 className="section-title reveal">Work History</h2>
            <div className="experience-list">
              {EXPERIENCE.map((exp, i) => (
                <div className="exp-item reveal" key={exp.company} style={{ '--delay': `${i * 80}ms` }}>
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

        {/* Projects */}
        <section className="section" id="projects">
          <div className="container">
            <p className="section-label reveal">Projects</p>
            <h2 className="section-title reveal">Selected Work</h2>
            <div className="projects-grid">
              {PROJECTS.map((p) => (
                <div className="project-card reveal" key={p.name} style={{ '--card-color': p.color }}>
                  <div className="project-top">
                    <div className="project-icon">{p.icon}</div>
                  </div>
                  <p className="project-name">{p.name}</p>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t} style={{ '--tag-color': p.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
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

        {/* Contact */}
        <section className="section" id="contact">
          <div className="container">
            <p className="section-label reveal">Contact</p>
            <h2 className="section-title reveal">Get In Touch</h2>
            <div className="contact-inner reveal">
              <p className="contact-text">
                Open to full-time roles, contract work, and interesting collaborations in AI engineering,
                cloud data infrastructure, or backend systems. Reach out via any of the channels below.
              </p>
              <div className="contact-links">
                <a className="contact-link" href="mailto:prateek.padhy1@gmail.com">
                  <IconMail /> prateek.padhy1@gmail.com
                </a>
                <a className="contact-link" href="https://github.com/prateekpadhy22/" target="_blank" rel="noreferrer">
                  <IconGithub /> GitHub
                </a>
                <a className="contact-link" href="https://www.linkedin.com/in/prateek-kumar-padhy-0287b5180" target="_blank" rel="noreferrer">
                  <IconLinkedin /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            © {new Date().getFullYear()} Prateek Padhy — Built with React &amp; Vite
          </div>
        </footer>

      </div>
    </>
  )
}
