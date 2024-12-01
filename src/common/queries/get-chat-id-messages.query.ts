import { GetChatIdMessagesParamsDto } from "@common/dtos/get-chat-id-messages.dto";
import { RequestInterface } from "@common/interfaces/request.interface";

export class GetChatIdMessagesQuery {
    constructor(public readonly request: RequestInterface<{ Params: GetChatIdMessagesParamsDto }>) {}
}