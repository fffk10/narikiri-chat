import { Module } from '@nestjs/common'

import { GatewayModule } from './gateway/gateway.module'
import { MessageModule } from './message/message.module'

import { AppController } from '@/app.controller'
import { ChannelModule } from '@/channel/channel.module'
import { MemberModule } from './member/member.module'

@Module({
  imports: [ChannelModule, MessageModule, GatewayModule, MemberModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
