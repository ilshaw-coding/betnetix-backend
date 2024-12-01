import { Global, Module } from "@nestjs/common";

import { HttpAccessStrategy } from "@core/strategies/http-access.strategy";
import { AppController } from "@core/controllers/app.controller";
import { ExceptionModule } from "@core/modules/exception.module";
import { ResponseModule } from "@core/modules/response.module";
import { SwaggerModule } from "@core/modules/swagger.module";
import { ConfigModule } from "@core/modules/config.module";
import { PrismaModule } from "@core/modules/prisma.module";
import { AuthModule } from "@core/modules/auth.module";
import { ChatModule } from "@core/modules/chat.module";
import { CqrsModule } from "@core/modules/cqrs.module";
import { UserModule } from "@core/modules/user.module";
import { JwtModule } from "@core/modules/jwt.module";

@Global()
@Module({
    imports: [
        ExceptionModule,
        ResponseModule,
        SwaggerModule,
        ConfigModule,
        PrismaModule,
        AuthModule,
        ChatModule,
        CqrsModule,
        UserModule,
        JwtModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        HttpAccessStrategy
    ]
})
export class AppModule {}