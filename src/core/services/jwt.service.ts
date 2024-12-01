import { JwtService as NestJwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

import { AccessInterface } from "@common/interfaces/access.interface";

@Injectable()
export class JwtService {
    constructor(private readonly nestJwtService: NestJwtService) {}

    public async verifyAccess(token: string) {
        return await this.nestJwtService.verifyAsync(token);
    }

    public async decodeAccess(token: string) {
        return await this.nestJwtService.decode(token);
    }

    public async signAccess(payload: AccessInterface) {
        return await this.nestJwtService.signAsync(payload);
    }
}