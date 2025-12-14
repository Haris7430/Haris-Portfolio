import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/Layout/Header'
import { ThemeProvider } from 'next-themes'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/ScrollToTop'

import { Analytics } from "@vercel/analytics/react"

const DMSans = DM_Sans({
  variable: '--font-DM-Sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AH Logic | MEAN Stack Developer',
  
  description: 'Portfolio of Abdul Haris - Building scalable web applications with MongoDB, Express, Angular, and Node.js.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${DMSans.variable} antialiased dark:bg-darkmode`}>
        <ThemeProvider
          attribute='class'
          enableSystem={false}
          defaultTheme='light'>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}