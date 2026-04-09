import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Prateek Padhy — Software & AI Engineer',
    template: '%s | Prateek Padhy',
  },
  description:
    'Software & AI Engineer specialising in LLM pipelines, cloud infrastructure, and identity engineering. Blog + portfolio.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Prateek Padhy',
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
