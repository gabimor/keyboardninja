import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiModule } from "./api/api.module";
import { WebModule } from "./web/web.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./user/user.module";
import { AppsModule } from "./app/app.module";

@Module({
  imports: [
    ApiModule,
    WebModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../", "public"),
    }),
    UsersModule,
    AuthModule,
    AppsModule,
  ],
})
export class AppModule {}
