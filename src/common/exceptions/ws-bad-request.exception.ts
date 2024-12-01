import { WsClientExceptionInterface } from "@common/interfaces/ws-client-exception.interface";
import { WsClientExceptionClass } from "@common/classes/ws-client-exception.class";
import { WsExceptionStatusEnum } from "@common/enums/ws-exception-status.enum";

export class WsBadRequestException<R extends Omit<WsClientExceptionInterface, "status"> = Omit<WsClientExceptionInterface, "status">> extends WsClientExceptionClass<R & Pick<WsClientExceptionInterface, "status">> {
    constructor(exception: R) {
        super({ ...exception, status: WsExceptionStatusEnum.BAD_REQUEST });
    }
}