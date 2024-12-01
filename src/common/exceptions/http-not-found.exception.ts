import { HttpClientExceptionInterface } from "@common/interfaces/http-client-exception.interface";
import { HttpClientExceptionClass } from "@common/classes/http-client-exception.class";
import { HttpExceptionStatusEnum } from "@common/enums/http-exception-status.enum";

export class HttpNotFoundException<R extends HttpClientExceptionInterface = HttpClientExceptionInterface> extends HttpClientExceptionClass<R> {
    constructor(exception: R) {
        super(exception, HttpExceptionStatusEnum.NOT_FOUND);
    }
}