'use client'

import CreateChannelModal from '@/components/modals/create-channel-modal'
import InviteModal from '@/components/modals/invite-modal'

export const ModalProvider = () => {
  return (
    <>
      <CreateChannelModal />
      <InviteModal />
    </>
  )
}
