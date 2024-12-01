import { Catch, ArgumentsHost, ExceptionFilter as NestExceptionFilter } from "@nestjs/common";

import { WsBaseExceptionClass } from "@common/classes/ws-base-exception.class";

@Catch(WsBaseExceptionClass)
export class WsExceptionFilter implements NestExceptionFilter {
    public catch(wsBaseExceptionClass: WsBaseExceptionClass, argumentsHost: ArgumentsHost) {
        const exception = wsBaseExceptionClass.getException();

        const wsArgumentsHost = argumentsHost.switchToWs();

        const client = wsArgumentsHost.getClient();
	
        return client.emit("exception", exception);
    }
}
