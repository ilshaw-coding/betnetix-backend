import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from "@nestjs/swagger";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({})
export class SwaggerModule {
    public useNestFastifyApplication(nestFastifyApplication: NestFastifyApplication) {
        const documentBuilder = new DocumentBuilder();

        const documentationObject = documentBuilder.setTitle("Betnetix backend").setDescription("Betnetix backend implementation").build();

        const documentObject = NestSwaggerModule.createDocument(nestFastifyApplication, documentationObject);

        return NestSwaggerModule.setup("/swagger", nestFastifyApplication, documentObject);
    }
}