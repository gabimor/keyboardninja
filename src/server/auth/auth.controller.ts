import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
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
    // res.cookie("auth", this.authService.generateJwt(req.user));

    return this.authService.generateJwt(user);
  }

  @Post("signup")
  async signup(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    const user = await this.userService.signup(email, password);
    // res.cookie("auth", this.authService.generateJwt(user));

    return this.authService.generateJwt(user);
  }

  @UseGuards(FacebookAuthGuard)
  @Get("facebook")
  async facebook(@Req() req: any, @Res() res: Response) {
    // res.cookie("auth", this.authService.generateJwt(req.user));
    return this.authService.generateJwt(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestAuth) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google")
  async google(@Req() req: any, @Res() res: Response) {
    // res.cookie("auth", this.authService.generateJwt(req.user));
    return this.authService.generateJwt(req.user);
  }
}
