import { Global, Module } from "@nestjs/common";

import { AppController } from "@core/controllers/app.controller";
import { ResponseModule } from "@core/modules/response.module";
import { SwaggerModule } from "@core/modules/swagger.module";
import { ConfigModule } from "@core/modules/config.module";
import { CqrsModule } from "@core/modules/cqrs.module";

@Global()
@Module({
    imports: [
        ResponseModule,
        SwaggerModule,
        ConfigModule,
        CqrsModule
    ],
    controllers: [
        AppController
    ]
})
export class AppModule {}