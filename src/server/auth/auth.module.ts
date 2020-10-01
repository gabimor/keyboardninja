import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local/local.strategy";
import { UsersModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConsts } from "./consts";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { AuthController } from "./auth.controller";
import { FacebookStrategy } from "./facebook/facebook.strategy";
import { GoogleStrategy } from "./google/google.strategy";
import {
  facebookStrategyConfig,
  FacebookStrategyConfigToken,
} from "./facebook/facebook.strategy.config";
import {
  googleStrategyConfig,
  GoogleStrategyConfigToken,
} from "./google/google.strategy.config";

const jwtStrategy = {
  provide: JwtStrategy,
  useFactory: () => new JwtStrategy(jwtConsts.secret),
};

const facebookStrategyConfigProvider = {
  provide: FacebookStrategyConfigToken,
  useValue: facebookStrategyConfig,
};

const googleStrategyConfigProvider = {
  provide: GoogleStrategyConfigToken,
  useValue: googleStrategyConfig,
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
  providers: [
    AuthService,
    LocalStrategy,
    jwtStrategy,
    facebookStrategyConfigProvider,
    googleStrategyConfigProvider,
    FacebookStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}