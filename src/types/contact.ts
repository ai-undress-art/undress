export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactSubmission extends ContactFormData {
  id: string
  submitted_at: string
  ip_address: string
  created_at: string
  updated_at: string
}

export interface ApiResponse<T = any> {
  message?: string
  error?: string
  data?: T
  id?: string
}

export type SubmitStatus = 'idle' | 'success' | 'error' 