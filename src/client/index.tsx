import React from "react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";

import Layout from "@client/pages/layout";
import { DataContext } from "@client/DataContext";
import { Store } from "@client/store";
import * as consts from "@shared/consts";
import * as osSelect from "@client/helpers/osSelect";
import "tailwindcss/tailwind.css";

declare global {
  interface Window {
    __KBN_DATA__: Store;
  }
}

if (consts.NODE_ENV === consts.SENTRY_REPORT_ENV) {
  Sentry.init({
    dsn: consts.SENTRY_FRONT_END_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: consts.SENTRY_TRACE_SAMPLE_RATE,
  });
}

const store = new Store(window.__KBN_DATA__);
osSelect.init();

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
