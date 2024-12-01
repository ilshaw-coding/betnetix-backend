import { UseInterceptors, Controller, HttpCode, Get, Request, Response } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { QueryBus } from "@nestjs/cqrs";

import { FastifyRequest, FastifyReply } from "fastify";

import { HttpResponseInterceptor } from "@core/interceptors/http-response.interceptor";
import { HttpResponseStatusEnum } from "@common/enums/http-response-status.enum";
import { GetAuthLoginQuery } from "@common/queries/get-auth-login.query";

@ApiTags("Auth")
@UseInterceptors(HttpResponseInterceptor)
@Controller("/auth")
export class AuthController {
    constructor(private readonly queryBus: QueryBus) {}

    @ApiOkResponse({ description: "User has successfully logged in" })
    @HttpCode(HttpResponseStatusEnum.OK)
    @Get("/login")
    public async getAuthLogin(@Request() request: FastifyRequest, @Response({ passthrough: true }) response: FastifyReply) {
        return await this.queryBus.execute(new GetAuthLoginQuery(request, response));
    }
}