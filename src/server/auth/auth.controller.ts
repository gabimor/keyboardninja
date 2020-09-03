import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { User } from "@server/user/User.schema";
import { UserService } from "@server/user/user.service";
import { Request as RequestExpress } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

type RequestAuth = RequestExpress & { user: Partial<User> };

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: RequestAuth) {
    const { user } = req;

    if (!user) throw new UnauthorizedException();

    return this.authService.generateJwt(req.user);
  }

  @Post("signup")
  async signup(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    const user = await this.authService.signup(email, password);
    return this.authService.generateJwt(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestAuth) {
    return req.user;
  }
}
