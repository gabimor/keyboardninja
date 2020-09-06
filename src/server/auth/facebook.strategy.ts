import { Strategy } from "passport-facebook";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: process.env.APP_URL + "/auth/facebook/",
      scope: ["email"],
      profileFields: ["email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: any,
    profile: any,
    done: Function
  ) {
    return { email: profile.emails[0].value };
  }
}
