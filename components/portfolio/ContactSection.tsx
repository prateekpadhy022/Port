import { IconMail, IconGithub, IconLinkedin } from '@/components/layout/Icons'

export default function ContactSection() {
  return (
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
  )
}
