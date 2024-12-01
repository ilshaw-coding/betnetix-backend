import { QueryHandler } from "@nestjs/cqrs";

import { GetAuthLoginQuery } from "@common/queries/get-auth-login.query";
import { ResponseService } from "@core/services/response.service";
import { PrismaService } from "@core/services/prisma.service";
import { JwtService } from "@core/services/jwt.service";

@QueryHandler(GetAuthLoginQuery)
export class GetAuthLoginHandler {
    constructor(
        private readonly responseService: ResponseService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    public async execute(query: GetAuthLoginQuery) {
        if(query.request.cookies.access) {
            const access = await this.prismaService.access.findFirst({
                select: {
                    user: {
                        select: {
                            internal_id: true
                        }
                    },
                    token: true
                },
                where: {
                    token: query.request.cookies.access
                }
            });

            if(access) {
                return this.responseService.getHttpOkResponse({
                    message: "User has successfully logged in",
                    data: {
                        access: {
                            token: access.token
                        },
                        user: access.user
                    }
                });
            }
        }

        const user = await this.prismaService.user.create({
            select: {
                internal_id: true
            },
            data: {}
        });
        
        const token = await this.jwtService.signAccess({
            user: user.internal_id
        });

        const access = await this.prismaService.access.create({
            select: {
                token: true
            },
            data: {
                user: {
                    connect: {
                        internal_id: user.internal_id
                    }
                },
                token: token
            }
        });

        query.response.setCookie("access", access.token, {
            sameSite: "strict",
            httpOnly: true,
            secure: false,
            path: "/"
        });

        return this.responseService.getHttpOkResponse({
            message: "User has successfully logged in",
            data: {
                access: access,
                user: user
            }
        });
    }
}