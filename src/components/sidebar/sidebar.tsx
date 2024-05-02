'use client'

import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import { Home, Search, Settings2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import SidebarItem from '@/components/sidebar/sidebar-item'
import { ModeToggle } from '@/components/theme/mode-toggle'

type SidebarItem = {
  link: '' | 'search' | 'settings'
  icon: React.ReactNode
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { link: '', icon: <Home /> },
  { link: 'search', icon: <Search /> },
  { link: 'settings', icon: <Settings2 /> },
]

export default function Sidebar() {
  const router = useRouter()
  const params = useParams()

  const onClick = (kind: string) => {
    router.push(`/${kind}`)
  }

  return (
    <aside className='hidden  p-4 md:flex flex-col shadow-md'>
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
