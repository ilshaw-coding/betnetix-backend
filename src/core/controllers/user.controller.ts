import { UseInterceptors, UseFilters, Controller, UseGuards, HttpCode, Get } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { QueryBus } from "@nestjs/cqrs";

import { HttpResponseInterceptor } from "@core/interceptors/http-response.interceptor";
import { HttpResponseStatusEnum } from "@common/enums/http-response-status.enum";
import { HttpExceptionFilter } from "@core/filters/http-exception.filter";
import { GetUserListQuery } from "@common/queries/get-user-list.query";
import { HttpAccessGuard } from "@core/guards/http-access.guard";

@ApiTags("User")
@UseInterceptors(HttpResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("/user")
export class UserController {
    constructor(private readonly queryBus: QueryBus) {}

    @ApiOkResponse({ description: "Description" })
    @UseGuards(HttpAccessGuard)
    @HttpCode(HttpResponseStatusEnum.OK)
    @Get("/list")
    public async getUserList() {
        return await this.queryBus.execute(new GetUserListQuery());
    }
}