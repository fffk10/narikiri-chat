import { Textarea } from '@/components/ui/textarea'
import { User } from '@prisma/client'
import axios from 'axios'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

interface ChatInputProps {
  channelId: string
  userId: string
}

// TODO RESTAPIでメッセージ送信して実装しているが WebSocketを使ってリアルタイムでメッセージを送信するように変更する
export default function ChatInput({ channelId, userId }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('')
  const isLoaing = useRef(false)

  const router = useRouter()

  const onClickSend = async () => {
    if (!inputValue) return

    if (isLoaing.current) return

    isLoaing.current = true
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/message`
    const response = await axios.post(url, {
      channelId: channelId,
      senderId: userId,
      content: inputValue,
    })

    if (response.status === 201) {
      setInputValue('')
      isLoaing.current = false
      router.refresh()
    } else {
      console.error(`Failed to send message: ${response.data}`)
      isLoaing.current = false
    }
  }

  return (
    <div className='flex border rounded-md w-full justify-between'>
      <Textarea
        className='flex-1'
        placeholder='メッセージを入力'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Send className='m-2 cursor-pointer' onClick={onClickSend} />
    </div>
  )
}
