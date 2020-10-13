import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { getJwtUser } from "../auth.service";
import { User } from "@defs/schemas/User.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(secret: string) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string => req?.cookies?.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(user: Partial<User>) {
    return getJwtUser(user);
  }
}
