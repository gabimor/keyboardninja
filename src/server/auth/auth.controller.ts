import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { User } from "@server/user/User.schema";
import { UserService } from "@server/user/user.service";
import { Request as RequestExpress } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { FacebookAuthGuard } from "./facebook/facebook-auth.guard";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { GoogleAuthGuard } from "./google/google-auth.guard";

type RequestAuth = RequestExpress & { user: Partial<User> };

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

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
    const user = await this.userService.signup(email, password);
    return this.authService.generateJwt(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestAuth) {
    return req.user;
  }

  @UseGuards(FacebookAuthGuard)
  @Get("facebook")
  async facebook(@Req() req: any) {
    return this.authService.generateJwt(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google")
  async google(@Req() req: any) {
    return this.authService.generateJwt(req.user);
  }
}
