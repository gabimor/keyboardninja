import React from "react";
import { Get, Param, Query, Req } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Layout from "../../../client/Layout";
import DataContext, { IDataContext } from "../../../client/DataContext";
import { HomeService } from "./home.service";
import { pageTemplate } from "../pageTemplate";
import { OSs } from "src/server/db/oss";

@Controller("/")
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  async home() {
    const appCategories = await this.homeService.getAppCategory();

    const dataContext: IDataContext = {
      appCategories,
      // user: req.user,
    };

    // TODO: replace with real values
    const title = "Save your shortcuts - KeyboardNinja.me";

    const markup = renderToString(getTemplate("/", dataContext));
    const pageMarkup = pageTemplate(markup, title, dataContext, "/");

    const url = "/";

    return pageMarkup;
  }

  @Get(":name")
  async app(@Param("name") name: string, @Req() req: Request) {
    const app = await this.homeService.getAppByName(name);
    const appCategories = await this.homeService.getAppCategory();

    // TODO: redirect to 404
    if (!app) "app not found";

    const dataContext: IDataContext = {
      app,
      os: app.oss[0] as OSs,
      appCategories,
    };
    const markup = renderToString(getTemplate(req.url, dataContext));
    const pageMarkup = pageTemplate(markup, app.name, dataContext, app.url);

    return pageMarkup;
  }
}

const getTemplate = (url: string, dataContext: any) => (
  <DataContext.Provider value={dataContext}>
    <StaticRouter context={{}} location={url}>
      <Layout />
    </StaticRouter>
  </DataContext.Provider>
);
