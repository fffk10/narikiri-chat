import { MemberService } from '@/member/member.service'
import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('v1/member')
@ApiTags('/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(':channelId')
  async getMembers(@Param('channelId') channelId: string) {
    return this.memberService.getMembers(channelId)
  }
}
