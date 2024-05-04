import { Metadata } from 'next'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Main from '@/components/layout/main'
import Sidebar from '@/components/sidebar/sidebar'

export const metadata: Metadata = {
  title: 'Narikiri Chat',
  description: 'A chat app for roleplaying as your favorite characters.',
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className='flex flex-1 overflow-y-auto'>
        <Sidebar />
        <Main>{children}</Main>
      </div>
      <Footer />
    </>
  )
}
