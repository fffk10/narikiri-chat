import { OnModuleInit } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ChannelMessage } from '@prisma/client'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected')
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() data: ChannelMessage) {
    console.log('new message')
    console.log(data)
    this.server.emit('onMessage', {
      id: '1',
      channelId: data.channelId,
      senderId: data.senderId,
      content: data.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      sender: {
        id: 'user_2fqBafA7z1x2057p6pjM50Z76kp',
        name: '啓珠 藤原',
        imageUrl:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZnFCYWo5SHB2V1VTWG53TmpTa3BNUnFMbmQifQ',
      },
    })
  }
}
