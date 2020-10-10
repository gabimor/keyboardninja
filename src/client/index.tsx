import React from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";

import Layout from "@client/Layout";
import { DataContext } from "@client/DataContext";
import { Store } from "@client/store";

declare global {
  interface Window {
    __KBN_DATA__: Store;
  }
}

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
