// TODO ユーザー登録テストを先に

// import { Test, TestingModule } from '@nestjs/testing'
// import { ChannelService } from '@/channel/channel.service'
// import { PrismaService } from '@/prisma/prisma.service'

// const prismaMock = {
//   channel: {
//     findUnique: jest.fn(),
//     findMany: jest.fn(),
//     create: jest.fn(),
//   },
// }

// describe('ChannelService', () => {
//   let channelService: ChannelService

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [ChannelService, PrismaService],
//     }).compile()

//     channelService = module.get<ChannelService>(ChannelService)

//     prismaMock.channel.findUnique.mockClear()
//     prismaMock.channel.findMany.mockClear()
//     prismaMock.channel.create.mockClear()
//   })

//   describe('createChannel', () => {
//     it('正常系テスト', async () => {
//       const data = {
//         name: 'channel_name',
//         ownerId: 'user_id',
//         description: 'desription',
//         imageUrl: null,
//       }

//       prismaMock.channel.create.mockResolvedValue({
//         id: 'clvwj2s7e0001hgjzi63ykii7',
//         name: 'channel_name',
//         ownerId: 'user_id',
//         description: null,
//         imageUrl: null,
//         createdAt: '2024-05-07T15:10:58.635Z',
//         updatedAt: '2024-05-07T15:10:58.635Z',
//       })

//       const response = await channelService.createChannel(data)

//       expect(response).toEqual({
//         id: 'clvwj2s7e0001hgjzi63ykii7',
//         name: 'channel_name',
//         ownerId: 'user_id',
//         description: null,
//         imageUrl: null,
//         createdAt: '2024-05-07T15:10:58.635Z',
//         updatedAt: '2024-05-07T15:10:58.635Z',
//       })
//       expect(prismaMock.channel.create).toHaveBeenCalledWith(1)
//     })
//   })
// })
