"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ChannelService = class ChannelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getChannelById(id) {
        return this.prisma.channel.findUnique({ where: { id } });
    }
    async getChannels() {
        return this.prisma.channel.findMany();
    }
    async createChannel(data) {
        let response = await this.prisma.channel.create({
            data: {
                ...data,
                ChannelMember: {
                    create: {
                        memberId: data.ownerId,
                        role: client_1.MemberRole.ADMIN,
                    },
                },
                ChannelDetail: {
                    create: {
                        type: client_1.ChannelType.PUBLIC,
                    },
                },
            },
        });
        return response;
    }
    async getMessages(channelId) {
        return this.prisma.channelMessage.findMany({
            where: {
                channelId,
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                sender: true,
            },
            take: 50,
        });
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map