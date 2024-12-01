import { Catch, ArgumentsHost, ExceptionFilter as NestExceptionFilter } from "@nestjs/common";

import { HttpBaseExceptionClass } from "@common/classes/http-base-exception.class";

@Catch(HttpBaseExceptionClass)
export class HttpExceptionFilter implements NestExceptionFilter {
    constructor() {}

    public catch(httpBaseExceptionClass: HttpBaseExceptionClass, argumentsHost: ArgumentsHost) {
        const exception = httpBaseExceptionClass.getException();
        const status = httpBaseExceptionClass.getStatus();

        const httpArgumentsHost = argumentsHost.switchToHttp();

        const response = httpArgumentsHost.getResponse();
	
        return response.status(status).send(exception);
    }
}