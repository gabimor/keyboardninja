import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@server/auth/jwt/jwt-auth.guard";
import { RequestAuth } from "@src/types/RequestAuth";
import { AppService } from "./app.service";
import { ObjectId } from "mongodb";

@Controller("api")
export class AppController {
  constructor(private appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post("star")
  async starShortcut(
    @Request() req: RequestAuth,
    @Body("appId") appId: string,
    @Body("shortcutId") shortcutId: string
  ) {
    const { isStarred, stars } = await this.appService.toggleStar(
      new ObjectId(req?.user?._id),
      new ObjectId(appId),
      new ObjectId(shortcutId)
    );

    return { isStarred, stars };
  }
}
