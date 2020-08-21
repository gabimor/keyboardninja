import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { Request as RequestExpress } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

type RequestAuth = RequestExpress & { user: any };

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: RequestAuth) {
    return this.authService.login(req.user);
  }

  @Post("signup")
  async signup(username: string, password: string) {
    // return this.userService.signup(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestAuth) {
    return req.user;
  }
}
