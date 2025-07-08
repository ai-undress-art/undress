import { redirect } from 'next/navigation';

export default function RootPage() {
  // 重定向到默认语言
  redirect('/ch');
}

// 添加元数据
export const metadata = {
  title: 'Dessi AI - Advanced AI Image Processing',
  description: 'Advanced AI image processing technology',
}; 