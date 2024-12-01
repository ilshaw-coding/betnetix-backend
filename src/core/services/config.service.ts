import { ConfigService as NestConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
    constructor(private readonly nestConfigService: NestConfigService) {}

    public getAppHostname() {
        return this.nestConfigService.get("APP_HOSTNAME");
    }

    public getAppPort() {
        return this.nestConfigService.get("APP_PORT");
    }

    public getJwtSecret() {
        return this.nestConfigService.get("JWT_SECRET");
    }
}