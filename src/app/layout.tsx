import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Main from '@/components/layout/main'
import Sidebar from '@/components/sidebar/sidebar'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/theme-provider'

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
    <html lang='ja' suppressHydrationWarning={true}>
      <body className={cn([inter.className, 'flex flex-col'])}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='flex flex-1'>
            <Sidebar />
            <Main>{children}</Main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
