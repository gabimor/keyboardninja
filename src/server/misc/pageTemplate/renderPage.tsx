import React from "react";
import { DataContext } from "@client/DataContext";
import Layout from "@client/pages/layout";
import { Store } from "@client/store";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { pageTemplate } from ".";
import { RequestAuth } from "@defs/RequestAuth";

export async function renderPage(
  req: RequestAuth,
  title: string,
  canonicalUrl: string
) {
  const context = req.context as Store;

  const page = (
    <DataContext.Provider value={context}>
      <StaticRouter context={{}} location={req.url}>
        <Layout />
      </StaticRouter>
    </DataContext.Provider>
  );

  const markup = renderToString(page);
  const pageMarkup = pageTemplate(markup, title, context, canonicalUrl);

  return pageMarkup;
}
