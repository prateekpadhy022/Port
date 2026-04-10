import { IconArrow } from '@/components/layout/Icons'

export default function HeroSection() {
  return (
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
  )
}
