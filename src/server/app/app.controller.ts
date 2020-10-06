import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@server/auth/jwt/jwt-auth.guard";
import { RequestAuth } from "@src/types/RequestAuth";

@Controller("api")
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Post("star")
  starShortcut(@Request() req: RequestAuth, @Body() shortcutId: string) {
    console.log("arrived to star!!", req.user, shortcutId);

    return req.user;
  }
}
