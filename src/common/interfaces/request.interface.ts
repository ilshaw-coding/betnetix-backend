import { FastifyRequest, RouteGenericInterface } from "fastify";

import { UserEntity } from "@common/entities/user.entity";

export interface RequestInterface<RG extends RouteGenericInterface = RouteGenericInterface> extends FastifyRequest<RG> {
    readonly user: UserEntity
}