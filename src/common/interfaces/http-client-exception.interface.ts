import { HttpBaseExceptionInterface } from "@common/interfaces/http-base-exception.interface";

export interface HttpClientExceptionInterface extends HttpBaseExceptionInterface {
    readonly cause?: HttpExceptionCauseType;
}