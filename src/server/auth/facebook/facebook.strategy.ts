import { Strategy } from "passport-facebook";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "@server/user/user.service";
import { FacebookStrategyConfigToken } from "./facebook.strategy.config";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    @Inject(FacebookStrategyConfigToken) facebookStrategyConfig: any
  ) {
    super(facebookStrategyConfig);
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
    const facebookId = profile?.id;

    const user = await this.userService.signupFB(
      facebookId,
      email,
      firstName,
      lastName
    );
    return { _id: user._id, email };
  }
}
