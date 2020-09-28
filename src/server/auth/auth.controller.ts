import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
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
import { CreateUserDto } from "@server/user/createUserDTO";

type RequestAuth = RequestExpress & { user: Partial<User> };

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: RequestAuth, @Res() res: Response) {
    console.log("login");

    const { user } = req;

    if (!user) throw new UnauthorizedException();

    const jwt = this.authService.generateJwt(user);

    res.cookie("jwt", jwt);
    res.sendStatus(HttpStatus.CREATED);
  }

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.signup(
      createUserDto.email,
      createUserDto.password
    );
    const jwt = this.authService.generateJwt(user);

    res.cookie("jwt", jwt);
    res.sendStatus(HttpStatus.CREATED);
  }

  @UseGuards(FacebookAuthGuard)
  @Get("facebook")
  async facebook(@Req() req: any, @Res() res: Response) {
    console.log("facebook");

    const jwt = this.authService.generateJwt(req.user);

    res.cookie("jwt", jwt);
    return res.redirect("/");
  }

  // TODO: remove this endpoint
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: RequestAuth) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google")
  async google(@Req() req: any, @Res() res: Response) {
    const jwt = this.authService.generateJwt(req.user);

    res.cookie("jwt", jwt);
    return res.redirect("/");
  }
}
