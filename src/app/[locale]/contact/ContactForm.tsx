'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Input, Textarea } from '@heroui/react'
import { ContactFormData, ApiResponse, SubmitStatus } from '@/types/contact'

export default function ContactForm() {
  const t = useTranslations('contact.form')
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result: ApiResponse = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        console.error('提交失败:', result.error)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('网络错误:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
    }
  }

  return (
    <div className="bg-black/30 border border-white/10 backdrop-blur-sm rounded-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-passion mb-2">
          {t('title')}
        </h2>
        <p className="text-white/70">
          {t('description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={t('name')}
            placeholder={t('namePlaceholder')}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            classNames={{
              base: "max-w-full",
              mainWrapper: "h-full",
              input: "text-white",
              inputWrapper: "h-full font-normal text-white bg-black/20 border-white/20 data-[hover=true]:bg-black/30 group-data-[focus=true]:bg-black/30",
              label: "text-white/70"
            }}
          />
          <Input
            type="email"
            label={t('email')}
            placeholder={t('emailPlaceholder')}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            classNames={{
              base: "max-w-full",
              mainWrapper: "h-full",
              input: "text-white",
              inputWrapper: "h-full font-normal text-white bg-black/20 border-white/20 data-[hover=true]:bg-black/30 group-data-[focus=true]:bg-black/30",
              label: "text-white/70"
            }}
          />
        </div>
        
        <Input
          label={t('subject')}
          placeholder={t('subjectPlaceholder')}
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          required
          classNames={{
            base: "max-w-full",
            mainWrapper: "h-full",
            input: "text-white",
            inputWrapper: "h-full font-normal text-white bg-black/20 border-white/20 data-[hover=true]:bg-black/30 group-data-[focus=true]:bg-black/30",
            label: "text-white/70"
          }}
        />
        
        <Textarea
          label={t('message')}
          placeholder={t('messagePlaceholder')}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          required
          minRows={5}
          classNames={{
            base: "max-w-full",
            input: "text-white",
            inputWrapper: "bg-black/20 border-white/20 data-[hover=true]:bg-black/30 group-data-[focus=true]:bg-black/30",
            label: "text-white/70"
          }}
        />

        {submitStatus === 'success' && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400">{t('success')}</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400">{t('error')}</p>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="btn-gradient-primary w-full md:w-auto px-8 py-3 text-lg font-semibold rounded-full"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </form>
    </div>
  )
} 