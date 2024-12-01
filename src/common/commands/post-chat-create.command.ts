import { PostChatCreateBodyDto } from "@common/dtos/post-chat-create.dto";
import { RequestInterface } from "@common/interfaces/request.interface";

export class PostChatCreateCommand {
    constructor(public readonly request: RequestInterface<{ Body: PostChatCreateBodyDto }>) {}
}