import { OnModuleInit } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
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
  handleEvent(@MessageBody() data: any) {
    console.log(data)
    this.server.emit('onMessage', {
      msg: 'new message',
      content: data,
    })
  }
}
