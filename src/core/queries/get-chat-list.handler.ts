import { QueryHandler } from "@nestjs/cqrs";

import { GetChatListQuery } from "@common/queries/get-chat-list.query";
import { ResponseService } from "@core/services/response.service";
import { PrismaService } from "@core/services/prisma.service";

@QueryHandler(GetChatListQuery)
export class GetChatListHandler {
    constructor(
        private readonly responseService: ResponseService,
        private readonly prismaService: PrismaService
    ) {}

    public async execute(query: GetChatListQuery) {
        const chats = await this.prismaService.chat.findMany({
            select: {
                internal_id: true
            },
            where: {
                users: {
                    some: {
                        internal_id: query.request.user.internal_id
                    }
                }
            }
        });

        return this.responseService.getHttpOkResponse({
            message: "Message",
            data: chats
        });
    }
}