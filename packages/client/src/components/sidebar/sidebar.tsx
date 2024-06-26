'use client'

import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import { Home, MessageCircleMore, Search, Settings2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import SidebarItem from '@/components/sidebar/sidebar-item'
import { ModeToggle } from '@/components/theme/mode-toggle'

export type SidebarItem = {
  link: '' | 'chat' | 'search' | 'settings'
  icon: React.ReactNode
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { link: '', icon: <Home /> },
  { link: 'chat', icon: <MessageCircleMore /> },
  { link: 'search', icon: <Search /> },
  { link: 'settings', icon: <Settings2 /> },
]

export default function Sidebar() {
  const router = useRouter()

  const onClick = (kind: string) => {
    router.push(`/${kind}`)
  }

  return (
    <aside className='hidden p-4 md:flex flex-1 flex-col shadow-md'>
      <nav className='flex flex-col flex-1'>
        <ul className='mx-auto'>
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.link}
              onClick={() => onClick(`${item.link}`)}
            >
              {item.icon}
            </SidebarItem>
          ))}
        </ul>
      </nav>
      <div className='flex flex-col gap-2 items-center'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </aside>
  )
}
