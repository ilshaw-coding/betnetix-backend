import { CommandHandler } from "@nestjs/cqrs";

import { PostChatCreateCommand } from "@common/commands/post-chat-create.command";
import { ExceptionService } from "@core/services/exception.service";
import { ResponseService } from "@core/services/response.service";
import { PrismaService } from "@core/services/prisma.service";

@CommandHandler(PostChatCreateCommand)
export class PostChatCreateHandler {
    constructor(
        private readonly exceptionService: ExceptionService,
        private readonly responseService: ResponseService,
        private readonly prismaService: PrismaService
    ) {}

    public async execute(command: PostChatCreateCommand) {
        const user = await this.prismaService.user.findUnique({
            select: {
                internal_id: true
            },
            where: {
                internal_id: command.request.body.user
            }
        });

        if(user) {
            const chat = await this.prismaService.chat.create({
                select: {
                    internal_id: true
                },
                data: {
                    users: {
                        connect: [
                            {
                                internal_id: command.request.user.internal_id
                            },
                            {
                                internal_id: user.internal_id
                            }
                        ]
                    }
                }
            });
    
            return this.responseService.getHttpOkResponse({
                message: "Chat has successfully created",
                data: chat
            });
        }
        else {
            throw this.exceptionService.getHttpNotFoundException({
                message: "User not found"
            });
        }
    }
}