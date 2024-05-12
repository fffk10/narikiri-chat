import { create } from 'zustand'

interface SidebarStore {
  isOpen: boolean
  onToggle: () => void
}

export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
