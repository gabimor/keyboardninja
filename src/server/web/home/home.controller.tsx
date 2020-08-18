import React from "react";
import { Get, Param, Query } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Layout from "../../../client/Layout";
import DataContext from "../../../client/DataContext";
import { HomeService } from "./home.service";
import { page } from "../pageTemplate/page";

@Controller("/")
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  async home() {
    const appCategories = await this.homeService.getAppCategory();

    const dataContext = {
      appCategories,
      // user: req.user,
    };

    // TODO: replace with real values
    const canonicalUrl = "/";
    const title = "test title";

    const markup = renderToString(getTemplate("/", dataContext));
    const pageMarkup = page(markup, title, dataContext, canonicalUrl);

    const url = "/";

    return pageMarkup;
  }

  @Get(":name")
  async app(@Param("name") name: string) {
    const app = await this.homeService.getAppByName(name);

    // TODO: redirect to 404
    if (!app) return "app not found";

    return app;
  }
}

const getTemplate = (url: string, dataContext: any) => (
  <DataContext.Provider value={dataContext}>
    <StaticRouter context={{}} location={url}>
      <Layout />
    </StaticRouter>
  </DataContext.Provider>
);
