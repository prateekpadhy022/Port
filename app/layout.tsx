import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'ARCHITECT.AI — Prateek Padhy',
    template: '%s | ARCHITECT.AI',
  },
  description:
    'Software & AI Engineer specialising in LLM pipelines, cloud infrastructure, and identity engineering. Blog + portfolio.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ARCHITECT.AI',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-background text-on-surface font-body antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
