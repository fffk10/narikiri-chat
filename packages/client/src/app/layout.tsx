import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

import './globals.css'
import type { Metadata } from 'next'

import { ModalProvider } from '@/components/providers/modal-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import {
  WebSocketProvider,
  socket,
} from '@/components/providers/socket-context-provider'

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
          <WebSocketProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider />
              {children}
            </ThemeProvider>
          </WebSocketProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
