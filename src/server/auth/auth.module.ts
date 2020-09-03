import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { UsersModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConsts } from "./consts";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";

const jwtStrategy = {
  provide: JwtStrategy,
  useFactory: () => new JwtStrategy(jwtConsts.secret),
};
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: jwtConsts.secret,
      signOptions: { expiresIn: jwtConsts.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, jwtStrategy],
})
export class AuthModule {}
