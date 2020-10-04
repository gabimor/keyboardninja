import React from "react";
import { Get, Next, Param, Req, Res } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Layout from "@client/Layout";
import { DataContext, IDataContext } from "@client/DataContext";
import { pageTemplate } from "@server/web/pageTemplate";
import { NextFunction, Request, Response } from "express";
import { HomeService } from "./home.service";
import { AppService } from "@server/app/app.service";

@Controller("/")
export class HomeController {
  constructor(
    private appsService: AppService,
    private homeService: HomeService
  ) {}

  @Get()
  async home(@Req() req: Request) {
    const appCategories = await this.appsService.getAppCategory();

    const dataContext: IDataContext = {
      user: this.homeService.getJwtUser(req.user),
      appCategories,
    };

    const title = "KeyboardNinja.me";

    return renderPage("/", title, "/", dataContext);
  }

  @Get("404")
  async notFound() {
    return renderPage("/404", "Page Not found", "/404", {});
  }

  @Get("500")
  async error() {
    return renderPage("/500", "Oops ... Something went wrong", "/500", {});
  }

  @Get("login")
  async login() {
    return renderPage("/login", "Log in", "/login", {});
  }

  @Get("signup")
  async signup() {
    return renderPage("/signup", "Sign up", "/signup", {});
  }

  @Get("contact")
  async contact() {
    return renderPage("/contact", "Wanna Help?", "/contact", {});
  }

  @Get(":name")
  async app(
    @Param("name") name: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    const app = await this.appsService.getAppByName(name);

    const appCategories = await this.appsService.getAppCategory();

    if (!app) return next();

    const dataContext: IDataContext = {
      app,
      os: this.homeService.getAppOS(app, req),
      appCategories,
    };

    return res.send(
      renderPage(
        req.url,
        app.name + " | KeyboardNinja.me",
        app.url,
        dataContext
      )
    );
  }
}

const renderPage = (
  url: string,
  title: string,
  canonicalUrl: string,
  dataContext: IDataContext
) => {
  const page = (
    <DataContext.Provider value={dataContext}>
      <StaticRouter context={{}} location={url}>
        <Layout />
      </StaticRouter>
    </DataContext.Provider>
  );

  const markup = renderToString(page);
  const pageMarkup = pageTemplate(markup, title, dataContext, canonicalUrl);

  return pageMarkup;
};
