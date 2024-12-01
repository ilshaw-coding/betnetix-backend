import { QueryHandler } from "@nestjs/cqrs";

import { GetUserListQuery } from "@common/queries/get-user-list.query";
import { ResponseService } from "@core/services/response.service";
import { PrismaService } from "@core/services/prisma.service";

@QueryHandler(GetUserListQuery)
export class GetUserListHandler {
    constructor(
        private readonly responseService: ResponseService,
        private readonly prismaService: PrismaService
    ) {}

    public async execute() {
        const users = await this.prismaService.user.findMany({
            select: {
                internal_id: true
            }
        });

        return this.responseService.getHttpOkResponse({
            message: "Message",
            data: users
        });
    }
}