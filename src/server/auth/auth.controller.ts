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
    console.log("AuthController.login");
    console.log(req.user._doc.email);

    return this.authService.login(req.user);
  }

  @Post("signup")
  async signup(email: string, password: string) {
    console.log("AuthController.signup");

    // return this.userService.signup(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestAuth) {
    console.log("AuthController.getProfile");
    return req.user;
  }
}
