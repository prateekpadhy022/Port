import { NextRequest, NextResponse } from 'next/server'

const KNOWLEDGE_BASE = `
You are an AI assistant for Prateek Padhy's portfolio website (ARCHITECT.AI).
Answer questions about Prateek's work concisely and professionally.

About Prateek:
- Software & AI Engineer with 3+ years of experience
- Specialises in LLM pipelines, cloud infrastructure, and identity/IAM engineering
- Has built RAG systems, NLP pipelines, and full-stack web applications

Key Projects:
1. QuestLoft - AI-powered quest engine with LangChain + GPT-4 + Next.js + WebSockets
2. LLM-Based Crime Analysis System - LLaMA APIs + NLP tagging pipeline + Streamlit + FAISS
3. Traffic Incident Intelligence Platform - Dash/Plotly dashboards on GCP + BigQuery
4. BlogPop - Blog popularity prediction with Scikit-learn + XGBoost + NLP

Technical Skills:
- ML & GenAI: GPT-4, LLaMA, LangChain, Hugging Face, spaCy, Scikit-learn, RAG, RLHF
- NLP & Data: NER, FHIR, Apache Beam, GCP Dataflow, BigQuery, FAISS, Pandas
- Backend & Cloud: Python, Flask, FastAPI, GCP, AWS, Docker, Kubernetes, Redis, Kafka
- Security & IAM: Keycloak, HashiCorp Vault, JWT, OAuth2, RBAC, Geofencing, SOC2
- MLOps: PyTest, CI/CD, Prometheus, Grafana, Swagger/OpenAPI
- Frontend: Next.js, React, TypeScript, Tailwind CSS

Keep answers concise (2-4 sentences). Be helpful and professional.
`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    // If no AI API key is configured, return a smart fallback
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        reply: getFallbackReply(message),
      })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: KNOWLEDGE_BASE },
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({
        reply: getFallbackReply(message),
      })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? getFallbackReply(message)

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function getFallbackReply(message: string): string {
  const lower = message.toLowerCase()

  if (lower.includes('stack') || lower.includes('tech') || lower.includes('language')) {
    return "Prateek's primary stack includes Python (FastAPI, Flask), Next.js/TypeScript for frontends, GCP and AWS for cloud, and LangChain + OpenAI/LLaMA for AI pipelines. He's also experienced with Docker, Kubernetes, and PostgreSQL."
  }
  if (lower.includes('rag') || lower.includes('pipeline') || lower.includes('llm')) {
    return 'Prateek has built multiple RAG pipelines using LangChain, FAISS for vector search, and LLaMA/GPT-4 for generation. His crime analysis system is a real-world example — ingesting reports, embedding them, and querying with natural language.'
  }
  if (lower.includes('cloud') || lower.includes('gcp') || lower.includes('aws')) {
    return 'Prateek has deployed production workloads on both GCP (Dataflow, BigQuery, Cloud Run) and AWS. He uses Docker + Kubernetes for orchestration and GitHub Actions for CI/CD pipelines.'
  }
  if (lower.includes('iam') || lower.includes('security') || lower.includes('auth')) {
    return 'Prateek has hands-on experience with Keycloak, HashiCorp Vault, JWT/OAuth2 flows, RBAC policies, and geofencing-based access controls. He holds SOC2 awareness and designs systems with least-privilege principles.'
  }
  if (lower.includes('project') || lower.includes('work') || lower.includes('built')) {
    return "Key projects include QuestLoft (AI quest engine), LLM Crime Analysis (NLP pipeline), Traffic Intelligence Platform (GCP dashboards), and BlogPop (ML popularity predictor). Check the Projects page for the full breakdown."
  }
  if (lower.includes('hire') || lower.includes('contact') || lower.includes('available')) {
    return "Prateek is open to new opportunities — freelance projects, consulting, or full-time roles in AI/ML engineering. Reach out via the contact form or LinkedIn."
  }

  return "That's a great question! I'm trained on Prateek's portfolio data — ask me about his projects, tech stack, cloud experience, AI/ML work, or how to get in touch."
}
