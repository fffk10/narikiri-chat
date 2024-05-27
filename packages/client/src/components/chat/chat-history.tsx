import ChatMessage from '@/components/chat/chat-message'
import { ChannelMessageResponse } from '@/types/channel-types'
import { ScrollArea } from '@radix-ui/react-scroll-area'

type ChatHistoryProps = {
  messages: ChannelMessageResponse[]
  chatEndRef: React.RefObject<HTMLDivElement>
}

export default function ChatHistory({
  messages,
  chatEndRef,
}: ChatHistoryProps) {
  if (messages && messages?.length === 0) {
    return (
      <div className='h-full flex justify-center items-center'>
        会話履歴がありません。さぁ会話を始めましょう！
      </div>
    )
  }

  return (
    <ScrollArea>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={chatEndRef} />
    </ScrollArea>
  )
}
