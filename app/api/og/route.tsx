import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Prateek Padhy'
  const tag = searchParams.get('tag') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '60px 64px',
          background: '#080808',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,150,0.15), transparent 70%)',
          }}
        />
        {tag && (
          <div
            style={{
              fontSize: 14,
              fontFamily: 'monospace',
              color: '#00c896',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
              background: 'rgba(0,200,150,0.07)',
              border: '1px solid rgba(0,200,150,0.3)',
              borderRadius: 20,
              padding: '4px 14px',
            }}
          >
            {tag}
          </div>
        )}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#f0f0f0',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            maxWidth: 800,
            marginBottom: 24,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#00c896',
              boxShadow: '0 0 8px #00c896',
            }}
          />
          <span style={{ fontSize: 15, color: '#888', fontFamily: 'monospace' }}>
            prateek.padhy
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
