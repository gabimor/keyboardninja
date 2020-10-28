import React from "react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";

import Layout from "@client/pages/layout";
import { DataContext } from "@client/DataContext";
import { Store } from "@client/store";
import * as consts from "@shared/consts";

declare global {
  interface Window {
    __KBN_DATA__: Store;
  }
}

Sentry.init({
  dsn: consts.SENTRY_FRONT_END_DSN,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const store = new Store(window.__KBN_DATA__);

const Client = () => (
  <DataContext.Provider value={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </DataContext.Provider>
);

hydrate(<Client />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
