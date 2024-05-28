import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { useModal } from '@/hooks/use-modal-store'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { useOrigin } from '@/hooks/use-origin'

export default function InviteModal() {
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const origin = useOrigin()

  const isModalOpen = isOpen && type === 'invite'
  const { channel } = data

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/channel/${channel?.id}`,
        { inviteCode: uuidv4() }
      )

      onOpen('invite', { channel: response.data })
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const inviteUrl = `${origin}/invite/${channel?.inviteCode}`

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold'>友達招待</DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='text-xs font-bold text-zinc-500 dark:text-secondary/70'>
            チャンネル招待リンク
            <div className='flex items-center mt-2 gap-x-2'>
              <Input
                disabled={isLoading}
                className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                readOnly
                value={inviteUrl}
              />
              <Button disabled={isLoading} onClick={onCopy} size='icon'>
                {copied ? (
                  <Check className='w-4 h-4' />
                ) : (
                  <Copy className='w-4 h-4' />
                )}
              </Button>
            </div>
            <Button
              onClick={onNew}
              disabled={isLoading}
              variant='link'
              size='sm'
              className='text-xs text-zinc-500 mt-4'
            >
              リンクを更新する
              <RefreshCw className='w-4 h-4 ml-2' />
            </Button>
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  )
}
