import { Strategy } from "passport-google-oauth20";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "@server/user/user.service";
import { GoogleStrategyConfigToken } from "./google.strategy.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    @Inject(GoogleStrategyConfigToken) googleStrategyConfig: any
  ) {
    super(googleStrategyConfig);
  }

  async validate(
    accessToken: string,
    refreshToken: any,
    profile: any,
    done: Function
  ) {
    const email = profile?.emails?.[0].value;
    const firstName = profile?.name?.givenName;
    const lastName = profile?.name?.familyName;
    const googleId = profile?.id;

    const user = await this.userService.signupGoogle(
      googleId,
      email,
      firstName,
      lastName
    );
    return { _id: user._id, email };
  }
}
