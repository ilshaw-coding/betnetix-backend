import { WsClientExceptionInterface } from "@common/interfaces/ws-client-exception.interface";
import { WsBaseExceptionClass } from "@common/classes/ws-base-exception.class";

export class WsClientExceptionClass<R extends WsClientExceptionInterface = WsClientExceptionInterface> extends WsBaseExceptionClass<R> {
    constructor(exception: R) {
        super(exception);
    }
}