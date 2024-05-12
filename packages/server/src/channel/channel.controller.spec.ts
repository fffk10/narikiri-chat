import { Test, TestingModule } from '@nestjs/testing'
import { ChannelService } from '@/channel/channel.service'
import { ChannelController } from '@/channel/channel.controller'

const mockResponse = {
  id: 'clvwj2s7e0001hgjzi63ykii7',
  name: 'channel_name',
  ownerId: 'user_id',
  description: null,
  imageUrl: null,
  createdAt: '2024-05-07T15:10:58.635Z',
  updatedAt: '2024-05-07T15:10:58.635Z',
}

const mockRequest = {
  name: 'channel_name',
  ownerId: 'user_id',
}

describe('ChannelController', () => {
  let channelService: ChannelService

  describe('正常系テスト', () => {
    beforeEach(async () => {
      const channel: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: ChannelService,
            useValue: {
              createChannel: jest.fn().mockReturnValue(mockResponse),
            },
          },
        ],
      }).compile()
      channelService = channel.get<ChannelService>(ChannelService)
    })

    it('レスポンスデータ確認', async () => {
      const controller = new ChannelController(channelService)
      const response = await controller.createChannel(mockRequest)
      expect(response).toEqual({
        id: 'clvwj2s7e0001hgjzi63ykii7',
        name: 'channel_name',
        ownerId: 'user_id',
        description: null,
        imageUrl: null,
        createdAt: '2024-05-07T15:10:58.635Z',
        updatedAt: '2024-05-07T15:10:58.635Z',
      })
    })
  })
})
