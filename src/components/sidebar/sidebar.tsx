import { ModeToggle } from '@/components/theme/mode-toggle'

export default function Sidebar() {
  return (
    <aside className='hidden w-[220px] p-4 md:flex flex-col justify-between'>
      sidebar
      <div>
        <ModeToggle />
      </div>
    </aside>
  )
}
