import { Catch, ArgumentsHost, ExceptionFilter as NestExceptionFilter, Logger } from "@nestjs/common";

import { HttpBaseExceptionClass } from "@common/classes/http-base-exception.class";

@Catch(HttpBaseExceptionClass)
export class HttpExceptionFilter implements NestExceptionFilter {
    private readonly logger = new Logger("HttpExceptionFilter");

    public catch(httpBaseExceptionClass: HttpBaseExceptionClass, argumentsHost: ArgumentsHost) {
        const exception = httpBaseExceptionClass.getException();
        const status = httpBaseExceptionClass.getStatus();

        const httpArgumentsHost = argumentsHost.switchToHttp();

        const response = httpArgumentsHost.getResponse();
	
        return (this.logger.warn("Exception:", httpBaseExceptionClass), response.status(status).send(exception));
    }
}