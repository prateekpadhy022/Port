export default function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <p className="section-label reveal">About</p>
        <h2 className="section-title reveal">Background</h2>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I&apos;m a Software &amp; AI Engineer with a Master&apos;s in Computer Science from Virginia Tech.
              I specialise in building production-grade LLM pipelines, identity and access management systems,
              and scalable data lake architectures.
            </p>
            <p>
              My work spans healthcare NLP (FHIR, clinical text parsing), GenAI evaluation (RLHF, prompt engineering),
              and enterprise security (Vault, Keycloak, geofencing). I&apos;m comfortable leading cross-functional teams
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
  )
}
