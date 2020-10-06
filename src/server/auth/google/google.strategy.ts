import { Strategy } from "passport-google-oauth20";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService, SocialType } from "@server/auth/auth.service.ts";
import { GoogleStrategyConfigToken } from "./google.strategy.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject(GoogleStrategyConfigToken) googleStrategyConfig: any
  ) {
    super(googleStrategyConfig);
  }

  async validate(
    accessToken: string,
    refreshToken: any,
    profile: any,
    done: () => void
  ) {
    const email = profile?.emails?.[0].value;
    const firstName = profile?.name?.givenName;
    const lastName = profile?.name?.familyName;
    const googleId = profile?.id;

    const user = await this.authService.signupSocial(
      googleId,
      SocialType.Google,
      email,
      firstName,
      lastName
    );
    return user.toJSON();
  }
}
