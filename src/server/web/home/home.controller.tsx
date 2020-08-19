import React from "react";
import { Get, Param, Req, Res } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Layout from "../../../client/Layout";
import { DataContext, IDataContext } from "../../../client/DataContext";
import { HomeService } from "./home.service";
import { pageTemplate } from "../pageTemplate";
import { OSs } from "../../../server/db/oss";
import { Request, Response } from "express";

@Controller("/")
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  async home() {
    const appCategories = await this.homeService.getAppCategory();

    const dataContext: IDataContext = {
      appCategories,
    };

    const title = "Save your shortcuts - KeyboardNinja.me";

    return renderPage("/", title, "/", dataContext);
  }

  @Get("404")
  async notFound() {
    return renderPage("/404", "Page Not found", "/404", {});
  }

  @Get(":name")
  async app(
    @Param("name") name: string,
    @Req() req: Request
    @Res() res: Response
  ) {

    const app = await this.homeService.getAppByName(name);

    const appCategories = await this.homeService.getAppCategory();

    if (!app) return res.redirect("/404");

    const dataContext: IDataContext = {
      app,
      os: app.oss[0] as OSs,
      appCategories,
    };
    
    return res.send(renderPage(req.url, app.name, app.url, dataContext))
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
