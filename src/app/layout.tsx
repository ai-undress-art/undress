import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-undress.online'),
  title: {
    template: '%s | Dessi AI',
    default: 'Dessi AI - AI Image Processing Tool | Advanced AI Technology'
  },
  description: 'Advanced AI technology for image processing, supporting multiple formats, 24-hour automatic deletion, privacy protection. Free to use, no restrictions.',
  keywords: ['AI image processing', 'artificial intelligence', 'image editing', 'deep learning', 'computer vision', 'AI tools', 'free AI'],
  authors: [{ name: 'Dessi AI Team', url: 'https://ai-undress.online' }],
  creator: 'Dessi AI',
  publisher: 'Dessi AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-undress.online',
    siteName: 'Dessi AI',
    title: 'Dessi AI - AI Image Processing Tool | Advanced AI Technology',
    description: 'Advanced AI technology for image processing, supporting multiple formats, 24-hour automatic deletion, privacy protection.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Dessi AI - AI Image Processing Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dessi AI - AI Image Processing Tool',
    description: 'Advanced AI technology for image processing, free to use, privacy protection.',
    images: ['/images/logo.png'],
    creator: '@DessiiAI',
    site: '@DessiiAI',
  },
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/images/logo.png',
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/manifest.webmanifest',
  category: 'technology',
  classification: 'AI Image Processing',
  referrer: 'origin-when-cross-origin',
  verification: {
    // 添加搜索引擎验证码（需要时填入）
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  other: {
    'msapplication-TileColor': '#8b5cf6',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 