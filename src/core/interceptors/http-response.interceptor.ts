import { Injectable, ExecutionContext, CallHandler, Logger } from "@nestjs/common";

import * as rxjs from "rxjs";

import { HttpBaseResponseClass } from "@common/classes/http-base-response.class";

@Injectable()
export class HttpResponseInterceptor {
    private readonly logger = new Logger("HttpResponseInterceptor");

    public intercept(executionContext: ExecutionContext, callHandler: CallHandler) {
        const operatorFunction = rxjs.map((value) => {
            if(value instanceof HttpBaseResponseClass) {
                return (this.logger.verbose("Response:", JSON.stringify(value)), value.getResponse());
            }
            else {
                return (this.logger.verbose("Response:", JSON.stringify(value)), value);
            }
        });

        const observable = callHandler.handle();

        return observable.pipe(operatorFunction);
    }
}