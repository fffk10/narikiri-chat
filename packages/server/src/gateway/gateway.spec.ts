import { OnModuleInit } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { Gateway } from '@/gateway/gateway'
import { MessageService } from '@/message/message.service'
import { Server } from 'socket.io'

const postMessageResponse = {
  id: '1',
  channelId: 'channel1',
  senderId: 'user1',
  content: 'Hello, World!',
  createdAt: new Date(),
  updatedAt: new Date(),
  sender: {
    id: 'user1',
    name: 'User 1',
    imageUrl: 'https://example.com/user1.jpg',
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}

describe('Gateway', () => {
  let gateway: Gateway
  let messageService: MessageService
  let server: Server

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Gateway,
        {
          provide: MessageService,
          useValue: {
            postMessage: jest.fn().mockResolvedValue(postMessageResponse),
          },
        },
      ],
    }).compile()

    gateway = module.get<Gateway>(Gateway)
    messageService = module.get<MessageService>(MessageService)
    server = new Server()
    gateway.server = new Server()
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })

  describe('OnModuleInit', () => {
    it('should log "Client connected" on connection', () => {
      const logSpy = jest.spyOn(console, 'log')
      const socketMock = { on: jest.fn() }
      jest.spyOn(gateway.server, 'on').mockImplementation((event, callback) => {
        if (event === 'connection') {
          callback(socketMock)
        }
        return server
      })

      gateway.onModuleInit()

      expect(logSpy).toHaveBeenCalledWith('Client connected')
    })
  })

  describe('onNewMessage', () => {
    it('should handle new message and emit response', async () => {
      const logSpy = jest.spyOn(console, 'log')
      const emitSpy = jest.spyOn(gateway.server, 'emit')
      const data: ChannelMessagePostRequest = {
        channelId: 'channel1',
        senderId: 'user1',
        content: 'Hello, World!',
      }

      await gateway.onNewMessage(data)

      expect(messageService.postMessage).toHaveBeenCalledWith({
        channelId: data.channelId,
        senderId: data.senderId,
        content: data.content,
      })

      const expectedResponse = await messageService.postMessage(data)
      expect(logSpy).toHaveBeenCalledWith('message requested')
      expect(logSpy).toHaveBeenCalledWith(expectedResponse)
      expect(emitSpy).toHaveBeenCalledWith('onMessage', expectedResponse)
    })
  })
})
