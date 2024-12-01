import { CqrsModule as NestCqrsModule } from "@nestjs/cqrs";
import { Global, Module } from "@nestjs/common";

import { GetChatIdMessagesHandler } from "@core/queries/get-chat-id-messages.handler";
import { PostChatCreateHandler } from "@core/commands/post-chat-create.handler";
import { GetAuthLoginHandler } from "@core/queries/get-auth-login.handler";
import { GetAppIndexHandler } from "@core/queries/get-app-index.handler";
import { GetChatListHandler } from "@core/queries/get-chat-list.handler";
import { GetUserListHandler } from "@core/queries/get-user-list.query";

@Global()
@Module({
    imports: [
    	NestCqrsModule.forRoot()
    ],
    providers: [
        GetChatIdMessagesHandler,
        PostChatCreateHandler,
        GetAuthLoginHandler,
        GetAppIndexHandler,
        GetChatListHandler,
        GetUserListHandler
    ]
})
export class CqrsModule {}