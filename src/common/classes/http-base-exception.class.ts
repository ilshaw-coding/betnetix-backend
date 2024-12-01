import { HttpBaseExceptionInterface } from "@common/interfaces/http-base-exception.interface";
import { HttpExceptionStatusEnum } from "@common/enums/http-exception-status.enum";

export class HttpBaseExceptionClass<R extends HttpBaseExceptionInterface = HttpBaseExceptionInterface> {
    constructor(
        private readonly exception: R, 
        private readonly status: HttpExceptionStatusEnum
    ) {}

    public getException() {
        return this.exception;
    }

    public getStatus() {
        return this.status;
    }
}