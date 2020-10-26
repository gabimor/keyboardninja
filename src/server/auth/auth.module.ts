import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET, JWT_EXPIRES_IN } from "@shared/consts";
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
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@defs/schemas/User.schema";

const jwtStrategy = {
  provide: JwtStrategy,
  useFactory: () => new JwtStrategy(JWT_SECRET),
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
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
