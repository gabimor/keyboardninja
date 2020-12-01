import {
  Body,
  Controller,
  Get,
  Next,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "@server/auth/jwt/jwt-auth.guard";
import { RequestAuth } from "@defs/RequestAuth";
import { AppService } from "./app.service";
import { ObjectId } from "mongodb";
import { ToggleStarDto } from "@defs/DTOs/toggleStar.dto";
import { NextFunction, Response } from "express";
import { renderPage } from "@server/misc/pageTemplate/renderPage";
import { getTitle } from "@shared/utils";

@Controller("")
export class AppController {
  constructor(private appService: AppService) {}

  @Get(":name")
  async app(
    @Param("name") name: string,
    @Req() req: RequestAuth,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    const app = await this.appService.getAppByName(name);

    if (!app) return next();

    if (req?.user?._id) {
      await this.appService.addUserApp(app, req?.user?._id);
    }

    req.context = {
      appCategories: await this.appService.getAppCategories(),
      user: req.user,
      app,
      os: this.appService.getAppOS(app, req),
    };

    const page = await renderPage(req, getTitle("/:app", app.name), app.url);
    return res.send(page);
  }

  @UseGuards(JwtAuthGuard)
  @Post("api/star")
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

  @Post("api/apprequest")
  async appRequest(@Body() appName: string) {
    await this.appService.addAppRequest(appName);
  }
}
