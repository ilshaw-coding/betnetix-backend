import { WsBaseExceptionInterface } from "@common/interfaces/ws-base-exception.interface";

export class WsBaseExceptionClass<R extends WsBaseExceptionInterface = WsBaseExceptionInterface> {
    constructor(private readonly exception: R) {}

    public getException() {
        return this.exception;
    }
}