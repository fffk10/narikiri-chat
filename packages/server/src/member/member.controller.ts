import { MemberService } from '@/member/member.service'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('v1/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(':channelId')
  async getMembers(@Param('channelId') channelId: string) {
    return this.memberService.getMembers(channelId)
  }
}
