import { Global, Module } from "@nestjs/common";

import { AuthController } from "@core/controllers/auth.controller";

@Global()
@Module({
    controllers: [
        AuthController
    ]
})
export class AuthModule {}