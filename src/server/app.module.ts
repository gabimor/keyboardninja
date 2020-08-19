import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiModule } from "./api/api.module";
import { WebModule } from "./web/web.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ApiModule,
    WebModule,
    MongooseModule.forRoot(process.env.ATLAS_CONNECTION_STRING),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../", "public"),
    }),
  ],
})
export class AppModule {}
