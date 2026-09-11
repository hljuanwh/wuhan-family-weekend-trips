import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '小小周末｜武汉周边亲子两天一夜',
  description: '为接近2岁宝宝整理的武汉周边六个两天一夜自驾计划，按月份快速选择。',
  openGraph: {
    title: '小小周末｜武汉周边亲子两天一夜',
    description: '从家出发，适合低龄宝宝的武汉周边周末自驾计划。',
    type: 'website',
    images: [{ url: '/trips/yuhe.jpg', width: 1024, height: 682, alt: '武汉周边亲子周末旅行' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '小小周末｜武汉周边亲子两天一夜',
    description: '六个适合低龄宝宝的周末自驾计划。',
    images: ['/trips/yuhe.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
