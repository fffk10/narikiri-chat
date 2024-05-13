import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useState } from 'react'

export default function ChatInput() {
  const [inputValue, setInputValue] = useState('')

  const onClickSend = () => {
    console.log(inputValue)
  }

  return (
    <div className='flex border rounded-md w-full justify-between'>
      <Textarea
        className='flex-1'
        placeholder='メッセージを入力'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Send className='m-2' onClick={onClickSend} />
    </div>
  )
}
