'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTED_PROMPTS = [
  { icon: 'code', text: 'What tech stack do you use for LLM apps?' },
  { icon: 'hub', text: 'Explain your experience with RAG pipelines.' },
  { icon: 'cloud', text: 'What cloud platforms have you deployed on?' },
  { icon: 'lock', text: 'How do you approach IAM and security design?' },
]

const STATUS_INDICATORS = [
  { label: 'LLM Engine', status: 'online', icon: 'model_training' },
  { label: 'Knowledge Base', status: 'online', icon: 'database' },
  { label: 'Vector Search', status: 'online', icon: 'search' },
  { label: 'Response Gen.', status: 'online', icon: 'auto_fix_high' },
]

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content:
        "Hey! I'm an AI assistant trained on Prateek's experience, projects, and technical expertise. Ask me anything about his work in AI, cloud engineering, or IAM security.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      })
      const data = await res.json()
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply ?? 'Sorry, something went wrong.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-20 flex flex-col">
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar ── */}
        <aside className="lg:w-72 shrink-0 flex flex-col gap-4">
          {/* Agent info */}
          <div className="glass-panel rounded-xl p-6 border border-primary/20">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px] text-primary">smart_toy</span>
            </div>
            <h1 className="font-headline text-lg font-bold text-on-surface mb-1">
              AI Agent
            </h1>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Powered by Prateek&apos;s portfolio knowledge base. Ask about
              projects, skills, or experience.
            </p>
          </div>

          {/* Status grid */}
          <div className="glass-panel rounded-xl p-5 border border-outline-variant">
            <p className="text-xs font-mono tracking-widest uppercase text-on-surface-variant mb-4">
              SYSTEM STATUS
            </p>
            <div className="flex flex-col gap-3">
              {STATUS_INDICATORS.map(({ label, status, icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                      {icon}
                    </span>
                    <span className="text-xs text-on-surface-variant">{label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    <span className="text-xs font-mono text-secondary">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested prompts */}
          <div className="glass-panel rounded-xl p-5 border border-outline-variant">
            <p className="text-xs font-mono tracking-widest uppercase text-on-surface-variant mb-4">
              SUGGESTED
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMPTS.map(({ icon, text }) => (
                <button
                  key={text}
                  onClick={() => sendMessage(text)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg text-left text-xs text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20"
                >
                  <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">{icon}</span>
                  {text}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Chat panel ── */}
        <div className="flex-1 flex flex-col glass-panel rounded-xl border border-outline-variant overflow-hidden min-h-[600px]">
          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-mono text-on-surface-variant tracking-wide">
                ARCHITECT.AI — Live Session
              </span>
            </div>
            <span className="text-xs font-mono text-outline">
              {messages.length - 1} messages
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {msg.role === 'user' ? 'person' : 'smart_toy'}
                  </span>
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary/10 text-on-surface rounded-tr-none'
                      : 'bg-surface-container-high text-on-surface rounded-tl-none'
                  }`}
                >
                  {msg.content}
                  <p className="text-[10px] font-mono text-on-surface-variant/50 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                </div>
                <div className="bg-surface-container-high rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-outline-variant px-4 py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage(input)
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my experience, projects, or skills…"
                className="flex-1 bg-surface-container rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant focus:border-primary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-[#6c9fff] text-[#002c65] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
