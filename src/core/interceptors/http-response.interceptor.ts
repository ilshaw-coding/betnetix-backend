import { Injectable, ExecutionContext, CallHandler } from "@nestjs/common";

import * as rxjs from "rxjs";

import { HttpBaseResponseClass } from "@common/classes/http-base-response.class";

@Injectable()
export class HttpResponseInterceptor {
    public intercept(executionContext: ExecutionContext, callHandler: CallHandler) {
        const operatorFunction = rxjs.map((value) => {
            if(value instanceof HttpBaseResponseClass) {
                return value.getResponse();
            }
            else {
                return value;
            }
        });

        const observable = callHandler.handle();

        return observable.pipe(operatorFunction);
    }
}