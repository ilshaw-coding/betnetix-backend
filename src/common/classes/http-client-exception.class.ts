import { HttpClientExceptionInterface } from "@common/interfaces/http-client-exception.interface";
import { HttpExceptionStatusEnum } from "@common/enums/http-exception-status.enum";
import { HttpBaseExceptionClass } from "@common/classes/http-base-exception.class";

export class HttpClientExceptionClass<R extends HttpClientExceptionInterface = HttpClientExceptionInterface> extends HttpBaseExceptionClass<R> {
    constructor(exception: R, status: HttpExceptionStatusEnum) {
        super(exception, status);
    }
}