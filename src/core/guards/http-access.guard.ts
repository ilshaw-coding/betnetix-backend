import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpAccessGuard extends AuthGuard("http-access") {}