import Link from 'next/link'
import { SKILLS } from '@/data/skills'

const skillMeta: Record<string, { icon: string; accent: string; tag: string }> = {
  'ML & GenAI':            { icon: 'model_training', accent: '#85adff', tag: 'rgba(133,173,255,0.12)' },
  'NLP & Data Eng.':       { icon: 'hub',            accent: '#69f6b8', tag: 'rgba(105,246,184,0.12)' },
  'Backend & Cloud':       { icon: 'cloud',           accent: '#fab0ff', tag: 'rgba(250,176,255,0.12)' },
  'Security & IAM':        { icon: 'lock',            accent: '#f59e0b', tag: 'rgba(245,158,11,0.12)'  },
  'MLOps & Testing':       { icon: 'rocket_launch',   accent: '#f472b6', tag: 'rgba(244,114,182,0.12)' },
  'Visualization & Other': { icon: 'bar_chart',       accent: '#69f6b8', tag: 'rgba(105,246,184,0.12)' },
}

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(133,173,255,0.12) 0%, transparent 70%)',
        }}
      >
        {/* grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(133,173,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(133,173,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-40 pb-24 text-center">
          {/* badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-8"
            style={{
              border: '1px solid rgba(105,246,184,0.35)',
              color: '#69f6b8',
              background: 'rgba(105,246,184,0.06)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#69f6b8' }}
            />
            Available for opportunities
          </div>

          {/* headline */}
          <h1
            className="font-headline font-bold tracking-tight leading-[0.95] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            <span style={{ color: '#ffffff' }}>Building the Future with</span>
            <br />
            <span className="gradient-text">AI &amp; Engineering</span>
          </h1>

          <p
            className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: '#adaaaa' }}
          >
            Software &amp; AI Engineer specialising in LLM pipelines, cloud
            infrastructure, and identity engineering. I turn complex problems
            into elegant, production-ready systems.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold font-headline text-sm"
              style={{
                background: 'linear-gradient(135deg, #85adff, #6c9fff)',
                color: '#002c65',
              }}
            >
              View Projects
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                arrow_forward
              </span>
            </Link>
            <Link
              href="/ai"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold font-headline text-sm"
              style={{
                border: '1px solid #484847',
                color: '#ffffff',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                smart_toy
              </span>
              Try AI Agent
            </Link>
          </div>
        </div>

        {/* scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-mono tracking-widest animate-bounce"
          style={{ color: 'rgba(173,170,170,0.4)' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            keyboard_arrow_down
          </span>
        </div>
      </section>

      {/* ── Skills Bento ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p
              className="text-xs font-mono tracking-widest uppercase mb-2"
              style={{ color: '#85adff' }}
            >
              CAPABILITIES
            </p>
            <h2 className="font-headline font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Skills &amp; Expertise
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-headline flex items-center gap-1"
            style={{ color: '#adaaaa' }}
          >
            See Projects
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((skill) => {
            const meta = skillMeta[skill.title]
            return (
              <div
                key={skill.title}
                className="rounded-xl p-6 transition-all duration-300"
                style={{
                  background: '#181818',
                  border: `1px solid rgba(72,72,71,0.6)`,
                  borderTopColor: meta?.accent ?? '#484847',
                  borderTopWidth: 2,
                }}
              >
                {/* icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: meta?.tag ?? 'rgba(133,173,255,0.1)' }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 20, color: meta?.accent ?? '#85adff' }}
                    >
                      {meta?.icon ?? 'star'}
                    </span>
                  </div>
                  <h3
                    className="font-headline font-semibold text-sm tracking-tight"
                    style={{ color: '#ffffff' }}
                  >
                    {skill.title}
                  </h3>
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{
                        background: meta?.tag ?? 'rgba(133,173,255,0.08)',
                        color: meta?.accent ?? '#85adff',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', background: '#111111' }}>
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '10+', label: 'Projects Shipped' },
            { value: '5+', label: 'LLM Pipelines Built' },
            { value: '∞', label: 'Problems Solved' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                className="font-headline font-bold mb-1"
                style={{ fontSize: '2.5rem', color: '#85adff' }}
              >
                {value}
              </p>
              <p
                className="text-xs font-mono tracking-widest uppercase"
                style={{ color: '#767575' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <p
          className="text-xs font-mono tracking-widest uppercase mb-4"
          style={{ color: '#69f6b8' }}
        >
          LET&apos;S BUILD SOMETHING
        </p>
        <h2
          className="font-headline font-bold mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff' }}
        >
          Ready to collaborate?
        </h2>
        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: '#adaaaa' }}>
          Whether it&apos;s an LLM pipeline, a full-stack platform, or a
          challenging infrastructure problem — I&apos;m open to new
          opportunities.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold font-headline text-sm"
          style={{
            background: 'linear-gradient(135deg, #85adff, #6c9fff)',
            color: '#002c65',
          }}
        >
          Get in Touch
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            mail
          </span>
        </Link>
      </section>
    </main>
  )
}
