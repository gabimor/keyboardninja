import React from "react";
import { Get, HttpStatus, Next, Param, Req, Res } from "@nestjs/common";
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
import { JwtUser } from "@src/types/User.type";
import { Store } from "@client/store";
import { getTitle } from "@src/shared/utils";

@Controller("/")
export class HomeController {
  constructor(
    private appsService: AppService,
    private homeService: HomeService
  ) {}

  @Get(["/", "index.html"])
  async home(@Req() req: RequestAuth, @Res() res: Response) {
    if (req.url.includes("index.html")) {
      res.redirect("/");
      return;
    }

    res.send(await this.renderPage(req.user, getTitle("/"), req.url, "/"));
  }

  @Get("404")
  async notFound(@Req() req: RequestAuth, @Res() res: Response) {
    res
      .status(HttpStatus.NOT_FOUND)
      .send(
        await this.renderPage(req.user, getTitle(req.url), req.url, "/404")
      );
  }

  @Get("login")
  async login(@Req() req: RequestAuth, @Res() res: Response) {
    if (req.user) res.redirect("/");
    res.send(
      await this.renderPage(req.user, getTitle(req.url), req.url, "/login")
    );
  }

  @Get("signup")
  async signup(@Req() req: RequestAuth, @Res() res: Response) {
    if (req.user) res.redirect("/");
    res.send(
      await this.renderPage(req.user, getTitle(req.url), req.url, "/signup")
    );
  }

  @Get("contact")
  async contact(@Req() req: RequestAuth) {
    return this.renderPage(req.user, getTitle(req.url), req.url, "/contact");
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

    if (req?.user?._id) this.appsService.addUserApp(app, req?.user?._id);

    const dataContext = {
      app,
      os: this.homeService.getAppOS(app, req),
    };

    return res.send(
      await this.renderPage(
        req.user,
        getTitle(req.url, app.name),
        req.url,
        app.url,
        dataContext
      )
    );
  }

  async renderPage(
    user: JwtUser,
    title: string,
    url: string,
    canonicalUrl: string,
    dataContext = {}
  ) {
    const appCategories = await this.appsService.getAppCategories();

    const context = new Store({
      ...dataContext,
      user,
      appCategories,
    });

    const page = (
      <DataContext.Provider value={context}>
        <StaticRouter context={{}} location={url}>
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
