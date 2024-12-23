import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from "@nestjs/swagger";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({})
export class SwaggerModule {
    public use(app: NestFastifyApplication) {
        const builder = new DocumentBuilder();

        const documentation = builder.setTitle("Betnetix backend server").setDescription("Betnetix backend server implementation").build();

        const document = NestSwaggerModule.createDocument(app, documentation);

        return NestSwaggerModule.setup("/swagger", app, document);
    }
}