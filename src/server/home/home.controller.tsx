import { Get, Req, Res } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { Response } from "express";
import { RequestAuth } from "@defs/RequestAuth";
import { getTitle } from "@shared/utils";
import { renderPage } from "@server/misc/pageTemplate/renderPage";
import { AppService } from "@server/app/app.service";

@Controller("/")
export class HomeController {
  constructor(private appService: AppService) {}

  @Get()
  async home(@Req() req: RequestAuth) {
    req.context = {
      appCategories: await this.appService.getAppCategories(),
      user: req.user,
    };

    return renderPage(req, getTitle("/"), "/");
  }

  @Get("login")
  async login(@Req() req: RequestAuth, @Res() res: Response) {
    req.context = {
      appCategories: await this.appService.getAppCategories(),
      user: req.user,
    };

    if (req.user) {
      res.redirect("/");
    } else {
      res.send(await renderPage(req, getTitle(req.url), "/login"));
    }
  }

  @Get("signup")
  async signup(@Req() req: RequestAuth, @Res() res: Response) {
    req.context = {
      appCategories: await this.appService.getAppCategories(),
      user: req.user,
    };

    if (req.user) {
      res.redirect("/");
    } else {
      res.send(await renderPage(req, getTitle(req.url), "/signup"));
    }
  }

  @Get("addanapp")
  async addanapp(@Req() req: RequestAuth) {
    req.context = {
      appCategories: await this.appService.getAppCategories(),
      user: req.user,
    };

    return renderPage(req, getTitle(req.url), "/addanapp");
  }
}
