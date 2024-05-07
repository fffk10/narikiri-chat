'use client'

import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal-store'
import NextLink from 'next/link'

export default function ChannelEmpty() {
  const { onOpen } = useModal()

  return (
    <div className='text-center'>
      <p>
        参加しているチャンネルがありません。
        <br />
        チャンネルを検索するか、新しいチャンネルを作成してください。
      </p>

      <div>
        <Button onClick={() => onOpen('createChannel')}>チャンネル作成</Button>
      </div>
      <div>
        <NextLink href='/search'>検索ページ</NextLink>
      </div>
    </div>
  )
}
