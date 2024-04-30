import { ModeToggle } from '@/components/theme/mode-toggle'

export default function Sidebar() {
  return (
    <aside className='hidden md:block w-[220px] p-4'>
      sidebar
      <div>
        <ModeToggle />
      </div>
    </aside>
  )
}
