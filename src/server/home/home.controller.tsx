import { Body, Get, Post, Req, Res } from "@nestjs/common";
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

  @Get("contact")
  async contact(@Req() req: RequestAuth) {
    req.context = {
      appCategories: await this.appService.getAppCategories(),
      user: req.user,
    };

    return renderPage(req, getTitle(req.url), "/contact");
  }

  @Post("/api/contact")
  async sendEmail(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("message") message: string
  ) {
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //   to: process.env.CONTACT_EMAIL,
    //   from: email,
    //   subject: "KeyboardNinja - from " + name,
    //   text: message,
    // };
    // sgMail.send(msg);
    // res.sendStatus(200);
  }
}
