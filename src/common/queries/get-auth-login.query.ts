import { FastifyRequest, FastifyReply } from "fastify";

export class GetAuthLoginQuery {
    constructor(
        public readonly request: FastifyRequest,
        public readonly response: FastifyReply
    ) {}
}