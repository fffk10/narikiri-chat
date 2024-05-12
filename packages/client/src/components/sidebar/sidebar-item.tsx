import { Button } from '@/components/ui/button'

type SidebarItemProps = {
  children: React.ReactNode
  onClick: () => void
}

export default function SidebarItem({ children, onClick }: SidebarItemProps) {
  return (
    <li className='mb-4'>
      <Button variant='ghost' onClick={onClick}>
        {children}
      </Button>
    </li>
  )
}
