import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { User } from "@server/user/User.schema";
import { UserService } from "@server/user/user.service";
import { Request as RequestExpress, Response } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { FacebookAuthGuard } from "./facebook-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

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

    return this.authService.generateJwt(req.user.email);
  }

  @Post("signup")
  async signup(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    const user = await this.userService.signup(email, password);
    return this.authService.generateJwt(user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestAuth) {
    return req.user;
  }

  @UseGuards(FacebookAuthGuard)
  @Get("facebook")
  async facebook(@Req() req: any) {
    return this.authService.generateJwt(req.user.email);
  }
}
