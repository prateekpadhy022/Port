import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('admin123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'prateek.padhy1@gmail.com' },
    update: {},
    create: {
      email: 'prateek.padhy1@gmail.com',
      password,
      name: 'Prateek Padhy',
    },
  })

  const tags = await Promise.all(
    [
      { name: 'LLMs', slug: 'llms' },
      { name: 'Python', slug: 'python' },
      { name: 'Cloud', slug: 'cloud' },
      { name: 'MLOps', slug: 'mlops' },
      { name: 'RAG', slug: 'rag' },
    ].map((t) =>
      prisma.tag.upsert({
        where: { slug: t.slug },
        update: {},
        create: t,
      })
    )
  )

  const samplePosts = [
    {
      title: 'Building Production RAG Pipelines with FAISS and PostgreSQL',
      slug: 'building-production-rag-pipelines',
      excerpt:
        'A practical guide to building retrieval-augmented generation systems that actually work in production — covering vector stores, chunking strategies, and hybrid search.',
      content: `# Building Production RAG Pipelines with FAISS and PostgreSQL

Retrieval-Augmented Generation (RAG) has become the go-to pattern for grounding LLM responses in factual, up-to-date data. But there's a significant gap between a demo that works in a notebook and a system that reliably serves production traffic.

## Why RAG?

Large language models hallucinate. That's not a bug — it's a fundamental consequence of how they're trained. RAG gives us a way to inject ground truth at inference time, without retraining.

## Vector Storage Strategy

\`\`\`python
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def build_index(documents: list[str]) -> faiss.Index:
    embeddings = model.encode(documents, show_progress_bar=True)
    embeddings = np.array(embeddings).astype('float32')

    index = faiss.IndexFlatIP(embeddings.shape[1])
    faiss.normalize_L2(embeddings)
    index.add(embeddings)
    return index
\`\`\`

## Hybrid Search

Pure vector search misses exact keyword matches. Combining BM25 with semantic search gives the best of both worlds.

\`\`\`sql
-- PostgreSQL full-text + vector hybrid
SELECT id, title, content,
  ts_rank(to_tsvector('english', content), query) AS bm25_score
FROM documents,
  to_tsquery('english', $1) query
WHERE to_tsvector('english', content) @@ query
ORDER BY bm25_score DESC
LIMIT 20;
\`\`\`

## Conclusion

Production RAG requires thinking beyond embeddings — chunking strategy, re-ranking, and fallback logic matter as much as model selection.`,
      tagSlugs: ['llms', 'rag', 'python'],
      readingTime: 8,
    },
    {
      title: 'Keycloak + HashiCorp Vault: Enterprise IAM That Actually Scales',
      slug: 'keycloak-vault-enterprise-iam',
      excerpt:
        'How I architected a centralized identity and secrets management system handling SSO, RBAC, and dynamic credentials across 12 microservices.',
      content: `# Keycloak + HashiCorp Vault: Enterprise IAM That Actually Scales

Identity and access management is one of those problems that looks solved until you're managing 12 microservices with different auth requirements.

## The Problem

At CMS Info Systems, we had a vault management application where:
- Different user roles needed different data access
- Location mattered (geofencing for ATM engineers)
- Secrets rotated frequently but services needed zero-downtime access

## Keycloak as the Identity Plane

Keycloak handles authentication and coarse-grained authorization. Every service trusts Keycloak-issued JWTs.

\`\`\`python
from functools import wraps
import jwt
from flask import request, jsonify

def require_role(role: str):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization', '').replace('Bearer ', '')
            claims = jwt.decode(token, options={"verify_signature": False})
            roles = claims.get('realm_access', {}).get('roles', [])
            if role not in roles:
                return jsonify({'error': 'Forbidden'}), 403
            return f(*args, **kwargs)
        return decorated
    return decorator
\`\`\`

## Vault for Dynamic Secrets

HashiCorp Vault generates short-lived database credentials on demand.

\`\`\`bash
# Enable database secrets engine
vault secrets enable database

# Configure PostgreSQL connection
vault write database/config/mydb \\
  plugin_name=postgresql-database-plugin \\
  connection_url="postgresql://{{username}}:{{password}}@localhost/mydb" \\
  allowed_roles="readonly,readwrite"
\`\`\`

## Geofencing Layer

Location verification happens at the API gateway before requests reach services.

## Results

- 65% reduction in static credential exposure
- Zero credential rotation downtime
- Full audit trail via Vault's audit log`,
      tagSlugs: ['cloud', 'python'],
      readingTime: 10,
    },
    {
      title: 'RLHF in Practice: What the Papers Don\'t Tell You',
      slug: 'rlhf-in-practice',
      excerpt:
        'After spending months doing RLHF work at Outlier AI, here\'s what I learned about preference data quality, annotation consistency, and why most RLHF tutorials are misleading.',
      content: `# RLHF in Practice: What the Papers Don't Tell You

Reinforcement Learning from Human Feedback sounds straightforward in papers. In practice, the annotation side is where most projects quietly fail.

## The Annotation Quality Problem

RLHF is only as good as your preference data. I spent months at Outlier AI evaluating model outputs and the biggest lesson was this: **annotator agreement is harder than it looks**.

### What counts as "better"?

When comparing two model responses:
- More factually accurate?
- More helpful to the specific user?
- Better written?
- Safer?

These objectives conflict constantly.

## Prompt Engineering for Evaluation

Before you can train a reward model, you need consistent evaluation. Here's a rubric that worked:

\`\`\`
Rate Response A vs Response B on:
1. Factual accuracy (verifiable claims correct)
2. Instruction following (does it do what was asked)
3. Completeness (covers the key points)
4. Safety (no harmful content)
5. Fluency (reads naturally)

Force a preference: A >> A > tie < B << B
\`\`\`

## The Distribution Shift Problem

Models trained on RLHF data from one distribution perform worse on out-of-distribution prompts. The reward model learns spurious correlations — longer answers score higher, confident tone scores higher.

## What Actually Moves the Needle

1. **Diverse prompt coverage** — if your prompts are homogeneous, the model learns to be good at your eval set, not real user queries
2. **Adversarial examples** — deliberately test edge cases during data collection
3. **Iterative annotation** — review annotator disagreements and refine your rubric

## Conclusion

RLHF is fundamentally a data problem wearing a training problem's clothes.`,
      tagSlugs: ['llms', 'mlops'],
      readingTime: 7,
    },
  ]

  for (const p of samplePosts) {
    const post = await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        readingTime: p.readingTime,
        authorId: admin.id,
      },
    })

    for (const tagSlug of p.tagSlugs) {
      const tag = tags.find((t) => t.slug === tagSlug)
      if (tag) {
        await prisma.postTag.upsert({
          where: { postId_tagId: { postId: post.id, tagId: tag.id } },
          update: {},
          create: { postId: post.id, tagId: tag.id },
        })
      }
    }
  }

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
