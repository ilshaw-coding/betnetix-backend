import { Catch, ArgumentsHost, ExceptionFilter as NestExceptionFilter, Logger } from "@nestjs/common";

import { WsBaseExceptionClass } from "@common/classes/ws-base-exception.class";

@Catch(WsBaseExceptionClass)
export class WsExceptionFilter implements NestExceptionFilter {
    private readonly logger = new Logger("WsExceptionFilter");

    public catch(wsBaseExceptionClass: WsBaseExceptionClass, argumentsHost: ArgumentsHost) {
        const exception = wsBaseExceptionClass.getException();

        const wsArgumentsHost = argumentsHost.switchToWs();

        const client = wsArgumentsHost.getClient();
	
        return (this.logger.warn("Exception:", JSON.stringify(wsBaseExceptionClass)), client.emit("exception", exception));
    }
}
