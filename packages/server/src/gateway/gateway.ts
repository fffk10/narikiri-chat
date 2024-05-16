import { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ChannelMessage } from '@prisma/client'
import { Server } from 'socket.io'

import { MessageService } from '@/message/message.service'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected')
    })
  }
  onModuleDestroy() {
    throw new Error('Method not implemented.')
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() data: ChannelMessagePostRequest) {
    console.log('message requested')
    // console.log(data)

    const response = await this.messageService.postMessage({
      channelId: data.channelId,
      senderId: data.senderId,
      content: data.content,
    })

    console.log(response)

    this.server.emit('onMessage', response)
  }
}
