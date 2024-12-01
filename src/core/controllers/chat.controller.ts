import { UseInterceptors, UseFilters, Controller, UseGuards, HttpCode, Post, Request, Get } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiBody } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { HttpResponseInterceptor } from "@core/interceptors/http-response.interceptor";
import { GetChatIdMessagesQuery } from "@common/queries/get-chat-id-messages.query";
import { GetChatIdMessagesParamsDto } from "@common/dtos/get-chat-id-messages.dto";
import { PostChatCreateCommand } from "@common/commands/post-chat-create.command";
import { HttpResponseStatusEnum } from "@common/enums/http-response-status.enum";
import { PostChatCreateBodyDto } from "@common/dtos/post-chat-create.dto";
import { HttpExceptionFilter } from "@core/filters/http-exception.filter";
import { RequestInterface } from "@common/interfaces/request.interface";
import { GetChatListQuery } from "@common/queries/get-chat-list.query";
import { HttpAccessGuard } from "@core/guards/http-access.guard";

@ApiTags("Chat")
@UseInterceptors(HttpResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("/chat")
export class ChatController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @ApiOkResponse({ description: "Chat has successfully created" })
    @ApiBody({ type: PostChatCreateBodyDto, description: "Description", required: true })
    @UseGuards(HttpAccessGuard)
    @HttpCode(HttpResponseStatusEnum.OK)
    @Post("/create")
    public async postChatCreate(@Request() request: RequestInterface<{ Body: PostChatCreateBodyDto }>) {
        return await this.commandBus.execute(new PostChatCreateCommand(request));
    }

    @ApiOkResponse({ description: "Description" })
    @UseGuards(HttpAccessGuard)
    @HttpCode(HttpResponseStatusEnum.OK)
    @Get("/list")
    public async getChatList(@Request() request: RequestInterface) {
        return await this.queryBus.execute(new GetChatListQuery(request));
    }

    @ApiOkResponse({ description: "Description" })
    @UseGuards(HttpAccessGuard)
    @HttpCode(HttpResponseStatusEnum.OK)
    @Get("/:id/messages")
    public async getChatIdMessages(@Request() request: RequestInterface<{ Params: GetChatIdMessagesParamsDto }>) {
        return await this.queryBus.execute(new GetChatIdMessagesQuery(request));
    }
}