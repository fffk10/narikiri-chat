import { UpsertMemberDto } from '@/member/dto/member.dto'
import { MemberService } from '@/member/member.service'
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

@Controller('v1/member')
@ApiTags('/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(':channelId')
  @ApiOperation({ summary: 'チャンネルに所属するメンバー一覧取得' })
  @ApiParam({
    name: 'channelId',
    type: String,
    example: 'test-channel-id',
  })
  async getMembers(@Param('channelId') channelId: string) {
    return this.memberService.getMembers(channelId)
  }

  @Post()
  @ApiOperation({ summary: 'チャンネルにメンバーを追加' })
  @ApiBody({
    type: UpsertMemberDto,
  })
  async registerMember(@Body() registerMemberRequest: UpsertMemberDto) {
    return this.memberService.registerMember(registerMemberRequest)
  }

  @Patch()
  @ApiOperation({ summary: 'チャンネルのメンバーの権限を更新' })
  @ApiBody({
    type: UpsertMemberDto,
  })
  async updateMemberRole(@Body() updateMemberRoleRequest: UpsertMemberDto) {
    return this.memberService.updateMemberRole(updateMemberRoleRequest)
  }
}
