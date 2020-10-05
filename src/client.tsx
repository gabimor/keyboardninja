import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";

import * as osSelect from "@client/helpers/osSelect";
import Layout from "@client/Layout";
import { DataContext, IDataContext } from "@client/DataContext";
import { JwtUser } from "@src/types/User.type";
import { OSs } from "@src/types/OSs.enum";

declare global {
  interface Window {
    __KBN_DATA__: IDataContext;
  }
}

export type DoStar = (
  shortcutId: string,
  stars: number,
  isStarred: boolean
) => void;

export type DoSetOs = (os: OSs) => void;

const Client = () => {
  const doSetOs: DoSetOs = (osData) => {
    setOs(osData);
    osSelect.setSelectedOS(osData);
  };

  const doStar: DoStar = (shortcutId, stars, isStarred) => {
    const shortcut = app.shortcuts.find(
      (e) => e._id.toString() === shortcutId.toString()
    );
    shortcut.stars = stars;
    shortcut.isStarred = isStarred;
  };

  const { appCategories, app } = window.__KBN_DATA__;

  const [os, setOs] = useState<OSs>(window.__KBN_DATA__.os);
  const [user] = useState<JwtUser>(window.__KBN_DATA__.user);

  const contextValue: IDataContext = {
    app,
    appCategories,
    user,
    os,
    doStar,
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
