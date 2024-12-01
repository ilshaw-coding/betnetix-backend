import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WsAccessGuard extends AuthGuard("ws-access") {}