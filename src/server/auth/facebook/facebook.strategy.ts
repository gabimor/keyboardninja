import { Strategy } from "passport-facebook";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService, SocialType } from "@server/auth/auth.service";
import { FacebookStrategyConfigToken } from "./facebook.strategy.config";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject(FacebookStrategyConfigToken) facebookStrategyConfig: any
  ) {
    super(facebookStrategyConfig);
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
    const facebookId = profile?.id;

    const user = await this.authService.signupSocial(
      facebookId,
      SocialType.Facebook,
      email,
      firstName,
      lastName
    );
    return user.toJSON();
  }
}
