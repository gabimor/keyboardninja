import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  // TODO: finish implemeting this
  use(req: Request, res: Response, next: Function) {
    // req

    next();
  }
}
