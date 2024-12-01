import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { Strategy, ExtractJwt } from "passport-jwt";
import { Socket } from "socket.io";

import { AccessInterface } from "@common/interfaces/access.interface";
import { ExceptionService } from "@core/services/exception.service";
import { ConfigService } from "@core/services/config.service";
import { PrismaService } from "@core/services/prisma.service";

@Injectable()
export class WsAccessStrategy extends PassportStrategy(Strategy, "ws-access") {
    constructor(
        private readonly exceptionService: ExceptionService,
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (socket: Socket) => socket.handshake.headers.authorization
            ]),
            secretOrKey: configService.getJwtSecret()
        });
    }

    public async validate(payload: AccessInterface) {
        const user = await this.prismaService.user.findUnique({
            where: {
                internal_id: payload.user
            }
        });

        if(user) {
            return user;
        }
        else {
            throw this.exceptionService.getHttpNotFoundException({
                message: "User not found"
            });
        }
    }
}