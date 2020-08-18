import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";

import * as osSelect from "./client/helpers/osSelect";
import Layout from "./client/Layout";
import DataContext from "./client/DataContext";
import { IUser } from "./server/db/User.schema";

declare global {
  interface Window {
    __KBN_DATA__: any;
  }
}

const Client = () => {
  const doLogin = (user: IUser) => setUser(user);
  const doLogout = () => setUser(undefined);
  const doSetOs = (os: string) => {
    setOs(os);
    osSelect.setSelectedOS(os);
  };
  const doPin = (shortcutId: string, pins: number, isPinned: boolean) => {
    const shortcut = app.shortcuts.find(
      (e) => e._id.toString() === shortcutId.toString()
    );
    shortcut.pins = pins;
    shortcut.isPinned = isPinned;
  };

  const { appCategories, app } = window.__KBN_DATA__;

  const [os, setOs] = useState<string>(window.__KBN_DATA__.os);
  const [user, setUser] = useState<IUser>(window.__KBN_DATA__.user);

  const contextValue = {
    app,
    appCategories,
    user,
    os,
    doLogin,
    doLogout,
    doPin,
    doSetOs,
  };

  return (
    <DataContext.Provider value={contextValue}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </DataContext.Provider>
  );
};

hydrate(<Client />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
