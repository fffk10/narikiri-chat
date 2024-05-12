'use client'

import { useSidebar } from '@/hooks/use-sidebar-store'
import { Menu } from 'lucide-react'

export default function Header() {
  const { onToggle } = useSidebar()

  return (
    <header className='min-h-[70px] flex shadow-lg'>
      <div className='md:hidden my-auto mx-4'>
        <button onClick={onToggle}>
          <Menu />
        </button>
      </div>
      <div className='m-auto'>
        <p className='font-bold text-xl'>Narikiri Chat</p>
      </div>
    </header>
  )
}
