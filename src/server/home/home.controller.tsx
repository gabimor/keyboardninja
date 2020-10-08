import React from "react";
import {
  Get,
  HttpStatus,
  Next,
  Param,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Layout from "@client/Layout";
import { DataContext } from "@client/DataContext";
import { pageTemplate } from "@server/misc/pageTemplate";
import { NextFunction, Response } from "express";
import { HomeService } from "./home.service";
import { AppService } from "@server/app/app.service";
import { RequestAuth } from "@src/types/RequestAuth";
import { JwtAuthGuard } from "@server/auth/jwt/jwt-auth.guard";
import { JwtUser } from "@src/types/User.type";
import { Store } from "@client/store";

@Controller("/")
export class HomeController {
  constructor(
    private appsService: AppService,
    private homeService: HomeService
  ) {}

  @Get()
  async home(@Req() req: RequestAuth) {
    const title = "KeyboardNinja.me";

    return this.renderPage(req, title, "/");
  }

  @Get("404")
  async notFound(@Req() req: RequestAuth, @Res() res: Response) {
    res
      .status(HttpStatus.NOT_FOUND)
      .send(await this.renderPage(req, "Page Not found", "/404"));
  }

  @Get("login")
  async login(@Req() req: RequestAuth) {
    return this.renderPage(req, "Log in", "/login");
  }

  @Get("signup")
  async signup(@Req() req: RequestAuth) {
    return this.renderPage(req, "Sign up", "/signup");
  }

  @Get("contact")
  async contact(@Req() req: RequestAuth) {
    return this.renderPage(req, "Wanna Help?", "/contact");
  }

  @Get("test")
  @UseGuards(JwtAuthGuard)
  async test(@Req() req: RequestAuth) {
    return req.user;
  }

  @Get(":name")
  async app(
    @Param("name") name: string,
    @Req() req: RequestAuth,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    const app = await this.appsService.getAppByName(name);

    if (!app) return next();

    if (req?.user?._id) this.appsService.addUserApp(app, req?.user?._id)

    const dataContext = {
      app,
      os: this.homeService.getAppOS(app, req),
    };

    return res.send(
      await this.renderPage(
        req,
        app.name + " | KeyboardNinja.me",
        app.url,
        dataContext
      )
    );
  }

  async renderPage(
    req: RequestAuth,
    title: string,
    canonicalUrl: string,
    dataContext = {}
  ) {
    const appCategories = await this.appsService.getAppCategories();

    const context = new Store({
      ...dataContext,
      user: req.user as JwtUser,
      appCategories,
    });

    const page = (
      <DataContext.Provider value={context}>
        <StaticRouter context={{}} location={req.url}>
          <Layout />
        </StaticRouter>
      </DataContext.Provider>
    );

    const markup = renderToString(page);
    const pageMarkup = pageTemplate(
      markup,
      title,
      context as Store,
      canonicalUrl
    );

    return pageMarkup;
  }
}
