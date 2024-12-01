import { Global, Module } from "@nestjs/common";

import { UserController } from "@core/controllers/user.controller";

@Global()
@Module({
    controllers: [
        UserController
    ]
})
export class UserModule {}