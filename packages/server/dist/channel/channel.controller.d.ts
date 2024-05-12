import { ChannelService } from '@/channel/channel.service';
import { Channel, ChannelMessage } from '@prisma/client';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    channel(id: string): Promise<Channel>;
    channels(): Promise<Channel[]>;
    createChannel(data: {
        name: string;
        ownerId: string;
        description?: string;
        imageUrl?: string;
    }): Promise<Channel>;
    messages(id: string): Promise<ChannelMessage[]>;
}
