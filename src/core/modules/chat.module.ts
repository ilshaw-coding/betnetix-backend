import { Global, Module } from "@nestjs/common";

import { WsAccessStrategy } from "@core/strategies/ws-access.strategy";
import { ChatController } from "@core/controllers/chat.controller";
import { ChatGateway } from "@core/gateways/chat.gateway";

@Global()
@Module({
    controllers: [
        ChatController
    ],
    providers: [
        WsAccessStrategy,
        ChatGateway
    ]
})
export class ChatModule {}