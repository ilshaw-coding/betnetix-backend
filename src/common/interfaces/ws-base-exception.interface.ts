import { WsExceptionStatusEnum } from "@common/enums/ws-exception-status.enum";

export interface WsBaseExceptionInterface {
    readonly message: WsExceptionMessageType;
    readonly status: WsExceptionStatusEnum;
}