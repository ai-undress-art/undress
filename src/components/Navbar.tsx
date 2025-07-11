'use client'

import React, { useEffect } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import { Globe } from 'lucide-react'
import { analytics } from '@/lib/analytics'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
] as const;

export default function AppNavbar() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    // 跟踪语言切换事件
    analytics.languageChange(locale, newLocale);

    router.push(pathname, { locale: newLocale });
  };


  return (
    <Navbar position="static" className="lg:glass-effect-dark backdrop-blur-xl border-b border-seductive-purple/20">
      {/* 左侧导航 */}
      <NavbarContent justify="start">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                size="sm"
                className="border-seductive-purple/30 text-white/90 hover:border-seductive-pink/50 hover:bg-seductive-purple/10 transition-all duration-300 shadow-neon"
                startContent={<Globe size={16} />}
              >
                <span className="flex items-center gap-2">
                  <span>{currentLanguage?.flag}</span>
                  <span>{currentLanguage?.name}</span>
                </span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label={t('language')}
              onAction={(key) => handleLanguageChange(key as string)}
              className="dark"
            >
              {languages.map((lang) => (
                <DropdownItem
                  key={lang.code}
                  className={`${locale === lang.code ? 'bg-seductive-purple/20' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

      </NavbarContent>

      {/* 中间品牌Logo */}
      <NavbarContent justify="center">
        <NavbarBrand>
          <Link href="/">
            <span className="font-bold text-white text-xl neon-text-pink">
              {t('brand')}
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* 右侧导航 */}
      <NavbarContent justify="end">

      </NavbarContent>
    </Navbar>
  )
} 