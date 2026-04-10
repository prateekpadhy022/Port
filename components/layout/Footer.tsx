import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low mt-24">
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs tracking-widest uppercase text-on-surface-variant font-mono">
          © {new Date().getFullYear()} NEURAL ARCHITECT. ENGINEERED FOR PRECISION.
        </p>

        <div className="flex items-center gap-6 text-on-surface-variant">
          <a
            href="https://linkedin.com/in/prateekpadhy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </a>
          <a
            href="https://github.com/prateekpadhy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">code</span>
          </a>
          <Link
            href="/contact"
            aria-label="Email"
            className="hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
