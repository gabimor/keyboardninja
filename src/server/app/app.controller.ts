import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@server/auth/jwt/jwt-auth.guard";
import { RequestAuth } from "@src/types/RequestAuth";
import { AppService } from "./app.service";
import { ObjectId } from "mongodb";
import { ToggleStarDto } from "@src/types/DTOs/toggleStar.dto";

@Controller("api")
export class AppController {
  constructor(private appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post("star")
  async toggleStar(
    @Req() req: RequestAuth,
    @Body() toggleStarDto: ToggleStarDto
  ) {
    const { isStarred, stars } = await this.appService.toggleStar(
      new ObjectId(req?.user?._id),
      new ObjectId(toggleStarDto.appId),
      new ObjectId(toggleStarDto.shortcutId)
    );

    return { isStarred, stars };
  }
}
