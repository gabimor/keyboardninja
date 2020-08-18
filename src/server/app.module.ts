import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiModule } from "./api/api.module";
import { WebModule } from "./web/web.module";

@Module({
  imports: [
    ApiModule,
    WebModule,
    MongooseModule.forRoot(process.env.ATLAS_CONNECTION_STRING),
  ],
})
export class AppModule {}
