import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with Prateek Padhy — let's build something great together.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-mono tracking-widest text-primary uppercase mb-3">
            GET IN TOUCH
          </p>
          <h1 className="font-headline text-5xl sm:text-6xl font-bold text-on-surface leading-tight mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-on-surface-variant text-lg">
            Open to new opportunities, consulting, and interesting projects.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: 'person',
              label: 'LinkedIn',
              value: 'prateekpadhy',
              href: 'https://linkedin.com/in/prateekpadhy',
              accent: 'border-primary/30 hover:border-primary/60 bg-primary/5',
              iconClass: 'bg-primary/10 text-primary',
            },
            {
              icon: 'code',
              label: 'GitHub',
              value: 'prateekpadhy',
              href: 'https://github.com/prateekpadhy',
              accent: 'border-secondary/30 hover:border-secondary/60 bg-secondary/5',
              iconClass: 'bg-secondary/10 text-secondary',
            },
            {
              icon: 'mail',
              label: 'Email',
              value: 'Get in touch',
              href: 'mailto:prateek@example.com',
              accent: 'border-tertiary/30 hover:border-tertiary/60 bg-tertiary/5',
              iconClass: 'bg-tertiary/10 text-tertiary',
            },
          ].map(({ icon, label, value, href, accent, iconClass }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border glass-panel text-center transition-colors ${accent}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconClass}`}>
                <span className="material-symbols-outlined text-[24px]">{icon}</span>
              </div>
              <div>
                <p className="font-headline font-semibold text-on-surface text-sm">{label}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Simple message prompt */}
        <div className="glass-panel rounded-2xl border border-outline-variant p-10 text-center">
          <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">
            chat_bubble
          </span>
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-3">
            Prefer a conversation?
          </h2>
          <p className="text-on-surface-variant mb-6">
            Try the AI Agent — it can answer questions about my experience,
            projects, and availability instantly.
          </p>
          <Link
            href="/ai"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md font-bold font-headline text-sm bg-gradient-to-br from-primary to-[#6c9fff] text-[#002c65] hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            Chat with AI Agent
          </Link>
        </div>
      </div>
    </main>
  )
}
