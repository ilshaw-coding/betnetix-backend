import { QueryHandler } from "@nestjs/cqrs";

import { GetChatIdMessagesQuery } from "@common/queries/get-chat-id-messages.query";
import { ResponseService } from "@core/services/response.service";
import { PrismaService } from "@core/services/prisma.service";

@QueryHandler(GetChatIdMessagesQuery)
export class GetChatIdMessagesHandler {
    constructor(
        private readonly responseService: ResponseService,
        private readonly prismaService: PrismaService
    ) {}

    public async execute(query: GetChatIdMessagesQuery) {
        const messages = await this.prismaService.message.findMany({
            select: {
                user: {
                    select: {
                        internal_id: true
                    }
                },
                created_at: true,
                text: true,
                from: true
            },
            where: {
                chat: {
                    users: {
                        some: {
                            internal_id: query.request.user.internal_id
                        }
                    },
                    internal_id: query.request.params.id
                }
            }
        });

        return this.responseService.getHttpOkResponse({
            message: "Message",
            data: messages
        });
    }
}