import { Get } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { renderToString, renderToNodeStream } from "react-dom/server";

import React from "react"; // eslint-disable-line no-unused-vars
import { StaticRouter } from "react-router";
import Layout from "../../../client/Layout";
import DataContext from "../../../client/DataContext";
import * as cache from "../../cache";
// import Layout from "@client/Layout";
// import DataContext from "@client/DataContext";
// import * as cache from "@server/cache";
// import {page} from

@Controller("/")
export class HomeController {
  @Get()
  async home() {
    const appCategories = await cache.getAppCategories();

    console.log(appCategories);

    // const dataContext = {
    //   appCategories,
    //   // user: req.user,
    // };

    // const markup = renderToString(getTemplate("/", dataContext));
    // const pageMarkup = page(markup, title, dataContext, canonicalUrl);

    const dataContext = {};
    const url = "/";

    return <h1>gel</h1>;
    // return (
    //   <DataContext.Provider value={dataContext}>
    //     <StaticRouter context={{}} location={url}>
    //       <Layout />
    //     </StaticRouter>
    //   </DataContext.Provider>
    // );
  }
}

// const getTemplate = (url, dataContext) => (
//   <DataContext.Provider value={dataContext}>
//     <StaticRouter context={{}} location={url}>
//       <Layout />
//     </StaticRouter>
//   </DataContext.Provider>
// );
