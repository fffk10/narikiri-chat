import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

import './globals.css'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import { ThemeProvider } from '@/components/providers/theme-provider'
import Sidebar from '@/components/sidebar/sidebar'
import { cn } from '@/lib/utils'

import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Narikiri Chat',
  description: 'A chat app for roleplaying as your favorite characters.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='ja' suppressHydrationWarning={true}>
        <body className={cn([inter.className, 'flex flex-col h-screen'])}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            <div className='flex flex-1 overflow-y-auto'>
              <Sidebar />
              <Main>{children}</Main>
            </div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
