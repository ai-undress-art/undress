import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dessi AI - Advanced AI Image Processing',
    short_name: 'Dessi AI',
    description: 'Advanced AI image processing technology for removing clothing from images',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['photo', 'graphics', 'utilities'],
    lang: 'zh-CN',
  }
} 