import { RequestInterface } from "@common/interfaces/request.interface";

export class GetChatListQuery {
    constructor(public readonly request: RequestInterface) {}
}