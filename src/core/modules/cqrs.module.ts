import { CqrsModule as NestCqrsModule } from "@nestjs/cqrs";
import { Global, Module } from "@nestjs/common";

import { GetAppIndexHandler } from "@core/queries/get-app-index.handler";

@Global()
@Module({
    imports: [
    	NestCqrsModule.forRoot()
    ],
    providers: [
        GetAppIndexHandler
    ]
})
export class CqrsModule {}