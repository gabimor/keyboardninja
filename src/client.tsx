import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";

import * as osSelect from "@client/helpers/osSelect";
import Layout from "@client/Layout";
import { DataContext, IDataContext } from "@client/DataContext";
import { JwtUser } from "@src/types/User.type";
import { OSs } from "@src/types/OSs.enum";
import { logout } from "./client/api/auth";
import { toggleStar } from "@client/api";
import { App } from "./types/schemas/App.schema";

declare global {
  interface Window {
    __KBN_DATA__: IDataContext;
  }
}

export type DoToggleStar = (appId: string, shortcutId: string) => void;

export type DoSetOs = (os: OSs) => void;

const Client = () => {
  const { appCategories } = window.__KBN_DATA__;

  const [app, setApp] = useState<Partial<App>>(window.__KBN_DATA__.app);
  const [os, setOs] = useState<OSs>(window.__KBN_DATA__.os);
  const [user] = useState<JwtUser>(window.__KBN_DATA__.user);

  const doSetOs: DoSetOs = (osData) => {
    setOs(osData);
    osSelect.setSelectedOS(osData);
  };

  const doToggleStar: DoToggleStar = async (appId, shortcutId) => {
    const { isStarred, stars } = await toggleStar(appId, shortcutId);
    console.log({ isStarred, stars });

    const shortcut = app.shortcuts.find(
      (e) => e._id.toString() === shortcutId.toString()
    );
    shortcut.stars = stars;
    shortcut.isStarred = isStarred;

    setApp(app);
  };

  const contextValue: IDataContext = {
    app,
    appCategories,
    user,
    os,
    doToggleStar,
    doSetOs,
    doLogout: logout,
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
