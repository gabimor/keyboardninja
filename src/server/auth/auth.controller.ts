import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { FacebookAuthGuard } from "./facebook/facebook-auth.guard";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { GoogleAuthGuard } from "./google/google-auth.guard";
import { CreateUserDto } from "@defs/DTOs/createUser.dto";
import { RequestAuth } from "@defs/RequestAuth";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: RequestAuth, @Res() res: Response) {
    const { user } = req;

    if (!user) throw new UnauthorizedException();

    const jwt = this.authService.generateJwt(user);

    setCookie(res, jwt);
    return res.redirect("/");
  }

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.signup(createUserDto);
    const jwt = this.authService.generateJwt(user);

    setCookie(res, jwt);
    return res.json({ success: true });
  }

  @UseGuards(FacebookAuthGuard)
  @Get("facebook")
  async facebook(@Req() req: RequestAuth, @Res() res: Response) {
    const jwt = this.authService.generateJwt(req.user);

    setCookie(res, jwt);

    return res.redirect("/");
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google")
  async google(@Req() req: any, @Res() res: Response) {
    const jwt = this.authService.generateJwt(req.user);

    setCookie(res, jwt);
    return res.redirect("/");
  }
}

function setCookie(res: Response, jwt: string) {
  res.cookie("jwt", jwt, { sameSite: "strict" });
}
