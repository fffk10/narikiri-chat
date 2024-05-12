'use client'

import { SIDEBAR_ITEMS } from '@/components/sidebar/sidebar'
import SidebarItem from '@/components/sidebar/sidebar-item'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { useSidebar } from '@/hooks/use-sidebar-store'
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function MobileSidebar() {
  const router = useRouter()
  const { isOpen } = useSidebar()

  const onClick = (kind: string) => {
    router.push(`/${kind}`)
  }

  if (!isOpen) {
    return null
  }

  return (
    <aside className='md:hidden flex p-4 flex-1 flex-col shadow-md'>
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
