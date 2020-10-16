import { Get, Req, Res } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { Response } from "express";
import { RequestAuth } from "@defs/RequestAuth";
import { getTitle } from "@shared/utils";
import { renderPage } from "@server/misc/pageTemplate/renderPage";

@Controller("/")
export class HomeController {
  @Get()
  async home(@Req() req: RequestAuth) {
    return renderPage(req, getTitle("/"), "/");
  }

  @Get("login")
  async login(@Req() req: RequestAuth, @Res() res: Response) {
    if (req.user) {
      res.redirect("/");
    } else {
      res.send(await renderPage(req, getTitle(req.url), "/login"));
    }
  }

  @Get("signup")
  async signup(@Req() req: RequestAuth, @Res() res: Response) {
    if (req.user) {
      res.redirect("/");
    } else {
      res.send(await renderPage(req, getTitle(req.url), "/signup"));
    }
  }

  @Get("contact")
  async contact(@Req() req: RequestAuth) {
    return renderPage(req, getTitle(req.url), "/contact");
  }
}
