import { WebSocketGateway, WebSocketServer, SubscribeMessage } from "@nestjs/websockets";
import { UseFilters, UseGuards, Logger } from "@nestjs/common";

import { Server, Socket } from "socket.io";

import { HandleMessagePayloadDto } from "@common/dtos/handle-message.dto";
import { HandleLeavePayloadDto } from "@common/dtos/handle-leave.dto";
import { WsExceptionFilter } from "@core/filters/ws-exception.filter";
import { SocketInterface } from "@common/interfaces/socket.interface";
import { HandleJoinPayloadDto } from "@common/dtos/handle-join.dto";
import { ExceptionService } from "@core/services/exception.service";
import { PrismaService } from "@core/services/prisma.service";
import { WsAccessGuard } from "@core/guards/ws-access.guard";
import { JwtService } from "@core/services/jwt.service";

@WebSocketGateway({
    cookie: true
})
@UseFilters(WsExceptionFilter)
export class ChatGateway {
    @WebSocketServer() public readonly server: Server;

    private readonly logger = new Logger("ChatGateway");

    constructor(
        private readonly exceptionService: ExceptionService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    @SubscribeMessage("message")
    @UseGuards(WsAccessGuard)
    public async handleMessage(socket: SocketInterface, payload: HandleMessagePayloadDto) {
        const chat = await this.prismaService.chat.findUnique({
            where: {
                internal_id: payload.chat
            }
        });

        if(chat) {
            const has = socket.rooms.has(chat.internal_id);

            if(has) {
                const room = this.server.to(chat.internal_id);

                const message = await this.prismaService.message.create({
                    select: {
                        chat: {
                            select: {
                                internal_id: true
                            }
                        },
                        user: {
                            select: {
                                internal_id: true
                            }
                        },
                        created_at: true,
                        text: true,
                    },
                    data: {
                        chat: {
                            connect: {
                                internal_id: chat.internal_id
                            }
                        },
                        user: {
                            connect: {
                                internal_id: socket.user.internal_id
                            }
                        },
                        text: payload.message,
                        from: "client"
                    }
                });
    
                const timestamp = message.created_at.getTime();

                const response = {
                    message: message.text,
                    from: message.user.internal_id,
                    chat: message.chat.internal_id,
                    time: timestamp
                };
    
                return (this.logger.log("Response:", response), room.emit("message", response));
            }
            else {
                throw this.exceptionService.getWsBadRequestException({
                    message: "User must be connected to the chat"
                });
            }
        }
        else {
            throw this.exceptionService.getWsNotFoundException({
                message: "Chat not found"
            });
        }
    }

    @SubscribeMessage("leave")
    @UseGuards(WsAccessGuard)
    public async handleLeave(socket: SocketInterface, payload: HandleLeavePayloadDto) {
        const chat = await this.prismaService.chat.findUnique({
            where: {
                internal_id: payload.chat
            }
        });

        if(chat) {
            const has = socket.rooms.has(chat.internal_id);

            if(has) {
                await socket.leave(chat.internal_id);

                const room = this.server.to(chat.internal_id);
    
                const message = await this.prismaService.message.create({
                    select: {
                        chat: {
                            select: {
                                internal_id: true
                            }
                        },
                        created_at: true,
                        text: true,
                        from: true,
                    },
                    data: {
                        chat: {
                            connect: {
                                internal_id: chat.internal_id
                            }
                        },
                        text: "User has successfully disconnected from chat",
                        from: "server"
                    }
                });
    
                const timestamp = message.created_at.getTime();
    
                const response = {
                    message: message.text,
                    from: message.from,
                    chat: message.chat.internal_id,
                    time: timestamp
                };
    
                return (this.logger.log("Response:", response), room.emit("message", response));
            }
            else {
                throw this.exceptionService.getWsBadRequestException({
                    message: "User must be connected to the chat"
                });
            }
        }
        else {
            throw this.exceptionService.getWsNotFoundException({
                message: "Chat not found"
            });
        }
    }

    @SubscribeMessage("join")
    @UseGuards(WsAccessGuard)
    public async handleJoin(socket: SocketInterface, payload: HandleJoinPayloadDto) {
        const chat = await this.prismaService.chat.findUnique({
            where: {
                internal_id: payload.chat
            }
        });

        if(chat) {
            const has = socket.rooms.has(chat.internal_id);

            if(has) {
                throw this.exceptionService.getWsBadRequestException({
                    message: "User is already connected to the chat"
                });
            }
            else {
                await socket.join(chat.internal_id);

                const room = this.server.to(chat.internal_id);
    
                const message = await this.prismaService.message.create({
                    select: {
                        chat: {
                            select: {
                                internal_id: true
                            }
                        },
                        created_at: true,
                        text: true,
                        from: true,
                    },
                    data: {
                        chat: {
                            connect: {
                                internal_id: chat.internal_id
                            }
                        },
                        text: "User has successfully connected to chat",
                        from: "server"
                    }
                });
    
                const timestamp = message.created_at.getTime();
    
                const response = {
                    message: message.text,
                    from: message.from,
                    chat: message.chat.internal_id,
                    time: timestamp
                };
    
                return (this.logger.log("Response:", response), room.emit("message", response));
            }
        }
        else {
            throw this.exceptionService.getWsNotFoundException({
                message: "Chat not found"
            });
        }
    }

    public async handleConnection(socket: Socket) {
        if(socket.handshake.headers.authorization) {
            try {
                const payload = await this.jwtService.verifyAccess(socket.handshake.headers.authorization);

                return await this.prismaService.user.update({
                    data: {
                        external_id: socket.id
                    },
                    where: {
                        internal_id: payload.user
                    }
                });
            }
            catch(error) {
                throw this.exceptionService.getWsUnauthorizedException({
                    message: "Access is invalid"
                });
            }
        }
        else {
            throw this.exceptionService.getWsNotFoundException({
                message: "Access not found"
            });
        }
    }

    public async handleDisconnect(socket: Socket) {
        if(socket.handshake.headers.authorization) {
            try {
                const payload = await this.jwtService.verifyAccess(socket.handshake.headers.authorization);

                return await this.prismaService.user.update({
                    data: {
                        external_id: null
                    },
                    where: {
                        internal_id: payload.user
                    }
                });
            }
            catch(error) {
                throw this.exceptionService.getWsUnauthorizedException({
                    message: "Access is invalid"
                });
            }
        }
        else {
            throw this.exceptionService.getWsNotFoundException({
                message: "Access not found"
            });
        }
    }
}