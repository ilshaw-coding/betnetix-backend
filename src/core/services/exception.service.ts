import { Injectable } from "@nestjs/common";

import { HttpClientExceptionInterface } from "@common/interfaces/http-client-exception.interface";
import { WsClientExceptionInterface } from "@common/interfaces/ws-client-exception.interface";
import { WsUnauthorizedException } from "@common/exceptions/ws-unauthorized.exception";
import { WsBadRequestException } from "@common/exceptions/ws-bad-request.exception";
import { HttpNotFoundException } from "@common/exceptions/http-not-found.exception";
import { WsNotFoundException } from "@common/exceptions/ws-not-found.exception";

@Injectable()
export class ExceptionService {
    public getHttpNotFoundException<R extends HttpClientExceptionInterface = HttpClientExceptionInterface>(exception: R) {
        return new HttpNotFoundException(exception);
    }

    public getWsUnauthorizedException<R extends Omit<WsClientExceptionInterface, "status"> = Omit<WsClientExceptionInterface, "status">>(exception: R) {
        return new WsUnauthorizedException(exception);
    }

    public getWsBadRequestException<R extends Omit<WsClientExceptionInterface, "status"> = Omit<WsClientExceptionInterface, "status">>(exception: R) {
        return new WsBadRequestException(exception);
    }

    public getWsNotFoundException<R extends Omit<WsClientExceptionInterface, "status"> = Omit<WsClientExceptionInterface, "status">>(exception: R) {
        return new WsNotFoundException(exception);
    }
}