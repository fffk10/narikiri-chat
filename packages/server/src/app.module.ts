import { Module } from '@nestjs/common'

import { GatewayModule } from './gateway/gateway.module'
import { MessageModule } from './message/message.module'

import { AppController } from '@/app.controller'
import { ChannelModule } from '@/channel/channel.module'

@Module({
  imports: [ChannelModule, MessageModule, GatewayModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
