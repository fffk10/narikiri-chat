import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { Channel, ChannelMessage } from '@prisma/client'

import { ChannelService } from '@/channel/channel.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('v1/channel')
@ApiTags('/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('/search')
  @ApiOperation({ summary: 'チャンネル検索API' })
  async searchChannels(
    @Query('inviteCode') inviteCode?: string
  ): Promise<Channel[]> {
    console.log('searchChannels')
    const searchParams: Partial<Channel> = {}
    if (inviteCode) {
      searchParams.inviteCode = inviteCode
    }
    console.log(inviteCode)
    return this.channelService.searchChannels(searchParams)
  }

  @Get(':id')
  @ApiOperation({ summary: 'チャンネルID指定取得API' })
  async channel(@Param('id') id: string): Promise<Channel> {
    console.log('channel')
    return this.channelService.getChannelById(id)
  }

  @Get()
  @ApiOperation({ summary: 'Userが所属するチャンネル一覧を取得' })
  async channels(@Query('userId') userId: string): Promise<Channel[]> {
    console.log('channels')
    return this.channelService.getChannels(userId)
  }

  @Post()
  @ApiOperation({ summary: 'チャンネル新規登録API' })
  async createChannel(
    @Body()
    data: {
      name: string
      ownerId: string
      description?: string
      imageUrl?: string
    }
  ): Promise<Channel> {
    const response = this.channelService.createChannel(data)
    return response
  }

  @Patch(':id')
  @ApiOperation({ summary: 'チャンネル更新API' })
  async updateChannel(
    @Param('id') id: string,
    @Body()
    data: {
      name?: string
      description?: string
      imageUrl?: string
      inviteCode?: string
    }
  ): Promise<Channel> {
    return this.channelService.updateChannel(id, data)
  }

  @Get(':id/message')
  @ApiOperation({ summary: 'チャンネルIDに紐づくメッセージ取得API' })
  async messages(@Param('id') id: string): Promise<ChannelMessage[]> {
    const response = await this.channelService.getMessages(id)
    return response
  }
}
