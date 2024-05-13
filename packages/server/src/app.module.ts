import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { ChannelModule } from '@/channel/channel.module'
import { MessageModule } from './message/message.module';

@Module({
  imports: [ChannelModule, MessageModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
