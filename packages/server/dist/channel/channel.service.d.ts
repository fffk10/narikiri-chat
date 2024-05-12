import { PrismaService } from '@/prisma/prisma.service';
import { Channel, ChannelMessage } from '@prisma/client';
export declare class ChannelService {
    private prisma;
    constructor(prisma: PrismaService);
    getChannelById(id: string): Promise<Channel | null>;
    getChannels(): Promise<Channel[]>;
    createChannel(data: {
        name: string;
        ownerId: string;
        description?: string;
        imageUrl?: string;
    }): Promise<Channel>;
    getMessages(channelId: string): Promise<ChannelMessage[]>;
}
