import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { NestFactory } from "@nestjs/core";

import * as fastifyCookie from "@fastify/cookie";

import { ConfigService } from "@core/services/config.service";
import { SwaggerModule } from "@core/modules/swagger.module";
import { AppModule } from "@core/modules/app.module";

async function applicationBootstrap() {
    const fastifyAdapter = new FastifyAdapter();

    const nestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

    nestFastifyApplication.register(fastifyCookie);

    const swaggerModule = nestFastifyApplication.get(SwaggerModule);

    swaggerModule.useNestFastifyApplication(nestFastifyApplication);

    const configService = nestFastifyApplication.get(ConfigService);

    const appHostname = configService.getAppHostname();

    const appPort = configService.getAppPort();

    return await nestFastifyApplication.listen(appPort, appHostname);
}

applicationBootstrap();