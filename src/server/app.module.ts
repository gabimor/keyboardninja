import { MiddlewareConsumer, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HomeModule } from "./home/home.module";
import { AuthModule } from "./auth/auth.module";
import { AppsModule } from "./app/app.module";
import { JwtMiddleware } from "./auth/jwt.middleware";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET, JWT_EXPIRES_IN } from "@shared/consts";
import { DataContextMiddleware } from "./misc/DataContext.middleware";
import * as consts from "@shared/consts";

@Module({
  imports: [
    HomeModule,
    MongooseModule.forRoot(consts.DB_CONNECTION_STRING),
    AuthModule,
    AppsModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  providers: [JwtMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes("*");
    consumer.apply(DataContextMiddleware).forRoutes("*");
  }
}
