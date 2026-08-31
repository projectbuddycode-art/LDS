import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Lukhdatar & Sons | Electrical Engineering & Turnkey Contracting',
  description:
    'Lukhdatar & Sons delivers complete electrical infrastructure solutions: turnkey contracting, underground cable works up to 66KV, substations up to 220KV, and transmission up to 400KV across commercial, industrial, residential and public sectors.',
  keywords: [
    'electrical infrastructure',
    'turnkey contracting',
    'underground cable laying',
    'substation works',
    'transmission lines',
    'electrical engineering',
    'Kolkata',
    'West Bengal',
    'Lukhdatar & Sons',
    'Lukhdatar and Sons',
  ],
  openGraph: {
    title: 'Lukhdatar & Sons',
    description: 'Power. Engineered to Endure.',
    siteName: 'Lukhdatar & Sons',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
