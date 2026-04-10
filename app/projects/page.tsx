import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of AI, ML, and full-stack engineering projects.',
}

const PROJECTS = [
  {
    id: 'questloft',
    name: 'QuestLoft',
    tagline: 'AI-powered quest engine for immersive storytelling',
    description:
      'Full-stack platform combining LLM narrative generation with real-time multiplayer mechanics. Built with Next.js, LangChain, WebSockets, and PostgreSQL.',
    tags: ['LangChain', 'Next.js', 'WebSockets', 'PostgreSQL', 'GPT-4'],
    accent: '#85adff',
    tagBg: 'rgba(133,173,255,0.1)',
    icon: 'auto_stories',
    wide: true,
    status: 'Live',
    statusColor: '#69f6b8',
    statusBg: 'rgba(105,246,184,0.1)',
  },
  {
    id: 'crime-analysis',
    name: 'Crime Analysis System',
    tagline: 'LLM-based NLP pipeline for crime report intelligence',
    description:
      'Real-time ingestion and NLP tagging pipeline using LLaMA APIs and Streamlit to extract structured insights from crime reports.',
    tags: ['LLaMA', 'NLP', 'Streamlit', 'Python', 'FAISS'],
    accent: '#69f6b8',
    tagBg: 'rgba(105,246,184,0.1)',
    icon: 'manage_search',
    wide: false,
    status: 'Research',
    statusColor: '#85adff',
    statusBg: 'rgba(133,173,255,0.1)',
  },
  {
    id: 'traffic-intel',
    name: 'Traffic Incident Intelligence',
    tagline: 'Urban traffic analytics on GCP',
    description:
      'Interactive dashboards built with Dash/Plotly deployed on Google Cloud Platform to help urban planners track and analyze traffic incident trends.',
    tags: ['Dash', 'Plotly', 'GCP', 'BigQuery', 'Data Viz'],
    accent: '#fab0ff',
    tagBg: 'rgba(250,176,255,0.1)',
    icon: 'traffic',
    wide: false,
    status: 'Deployed',
    statusColor: '#fab0ff',
    statusBg: 'rgba(250,176,255,0.1)',
  },
  {
    id: 'blogpop',
    name: 'BlogPop',
    tagline: 'ML-driven blog popularity prediction',
    description:
      'ML models trained to predict blog post popularity from text metadata, with a live Streamlit UI for real-time predictions and feature importance insights.',
    tags: ['Scikit-learn', 'NLP', 'Streamlit', 'Feature Eng.', 'XGBoost'],
    accent: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.1)',
    icon: 'trending_up',
    wide: false,
    status: 'Open Source',
    statusColor: '#f59e0b',
    statusBg: 'rgba(245,158,11,0.1)',
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen" style={{ paddingTop: 112, paddingBottom: 96 }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#85adff' }}>
            PORTFOLIO
          </p>
          <h1
            className="font-headline font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ffffff' }}
          >
            Projects
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: '#adaaaa' }}>
            A selection of AI, ML, and full-stack engineering work spanning LLM pipelines,
            cloud infrastructure, and data visualisation.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-xl p-7 flex flex-col ${p.wide ? 'lg:col-span-2' : ''}`}
              style={{
                background: '#181818',
                border: '1px solid #2a2a2a',
                borderTopColor: p.accent,
                borderTopWidth: 2,
              }}
            >
              {/* Status badge */}
              <span
                className="absolute top-5 right-5 px-2.5 py-0.5 rounded-full text-xs font-mono"
                style={{ background: p.statusBg, color: p.statusColor, border: `1px solid ${p.statusColor}40` }}
              >
                {p.status}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: p.tagBg }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 24, color: p.accent }}
                >
                  {p.icon}
                </span>
              </div>

              <h2 className="font-headline text-xl font-bold mb-1" style={{ color: '#ffffff' }}>
                {p.name}
              </h2>
              <p className="text-xs font-mono tracking-wide mb-3" style={{ color: '#767575' }}>
                {p.tagline}
              </p>
              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#adaaaa' }}>
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs font-mono"
                    style={{ background: p.tagBg, color: p.accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div
          className="rounded-2xl p-10 text-center"
          style={{ border: '1px solid #2a2a2a', background: '#111111' }}
        >
          <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: '#69f6b8' }}>
            OPEN TO WORK
          </p>
          <h3 className="font-headline text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
            Have a project in mind?
          </h3>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: '#adaaaa' }}>
            I&apos;m available for freelance projects, consulting engagements,
            and full-time roles. Let&apos;s build something great together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold font-headline text-sm"
            style={{ background: 'linear-gradient(135deg, #85adff, #6c9fff)', color: '#002c65' }}
          >
            Get in Touch
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
