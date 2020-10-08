import { MiddlewareConsumer, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HomeModule } from "./home/home.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { AppsModule } from "./app/app.module";
import { JwtMiddleware } from "./auth/jwt.middleware";
import { JwtModule } from "@nestjs/jwt";
import { jwtConsts } from "./auth/consts";

@Module({
  imports: [
    HomeModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    AuthModule,
    AppsModule,
    JwtModule.register({
      secret: jwtConsts.secret,
      signOptions: { expiresIn: jwtConsts.expiresIn },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../", "public"),
    }),
  ],
  providers: [JwtMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes("*");
  }
}
