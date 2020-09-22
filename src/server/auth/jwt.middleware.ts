import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: Function) {
    if (req?.cookies?.jwt) {
      req.user = this.jwtService.decode(req?.cookies?.jwt);
    }
    next();
  }
}
