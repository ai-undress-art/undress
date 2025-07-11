import { FC } from 'react'

interface StructuredDataProps {
  data: Record<string, any>
}

export const StructuredData: FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// 预定义的结构化数据类型
export const createWebsiteSchema = (name: string, url: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": name,
  "url": url,
  "description": description,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
})

export const createSoftwareApplicationSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web Browser",
  "description": description,
  "url": url,
  "author": {
    "@type": "Organization",
    "name": "Ai Undress"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
})

export const createWebPageSchema = (name: string, description: string, url: string, breadcrumbs?: any[]) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": name,
  "description": description,
  "url": url,
  "breadcrumb": breadcrumbs ? {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  } : undefined,
  "mainEntity": {
    "@type": "WebPageElement",
    "name": name,
    "description": description
  }
})

export const createBreadcrumbSchema = (items: Array<{ name: string, url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const createContactPageSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": name,
  "description": description,
  "url": url,
  "mainEntity": {
    "@type": "Organization",
    "name": "Ai Undress",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "undress.online.ai@gmail.com",
      "availableLanguage": ["Chinese", "English"]
    }
  }
})

export const createAboutPageSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": name,
  "description": description,
  "url": url,
  "mainEntity": {
    "@type": "Organization",
    "name": "Ai Undress",
    "description": "先进的AI图像处理技术公司",
    "foundingDate": "2024",
    "industry": "Artificial Intelligence"
  }
})

export const createFAQPageSchema = (faqs: Array<{ question: string, answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}) 