import { redirect } from 'next/navigation';

export default function RootPage() {
  // 重定向到默认语言
  redirect('/en');
}

// 添加元数据
export const metadata = {
  title: 'Ai Undress - Advanced AI Image Processing',
  description: 'Advanced AI image processing technology',
}; 