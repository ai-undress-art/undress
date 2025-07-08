'use client';

import { useLanguageDetection } from '@/hooks/useLanguageDetection';

export default function LanguageDetector() {
  // 使用语言检测钩子
  useLanguageDetection();

  // 这个组件不渲染任何内容，只是触发语言检测
  return null;
} 