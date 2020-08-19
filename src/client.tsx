import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";

import * as osSelect from "@client/helpers/osSelect";
import Layout from "@client/Layout";
import { DataContext, IDataContext } from "@client/DataContext";
import { IUser } from "@server/db/User.schema";
import { OSs } from "@server/db/OSs";

declare global {
  interface Window {
    __KBN_DATA__: IDataContext;
  }
}

export type IDoPin = (
  shortcutId: string,
  pins: number,
  isPinned: boolean
) => void;

export type IDoSetOs = (os: OSs) => void;

const Client = () => {
  const doLogin = (userData: IUser) => setUser(userData);
  const doLogout = () => setUser(undefined);
  const doSetOs: IDoSetOs = (osData) => {
    setOs(osData);
    osSelect.setSelectedOS(osData);
  };

  const doPin: IDoPin = (shortcutId, pins, isPinned) => {
    const shortcut = app.shortcuts.find(
      (e) => e._id.toString() === shortcutId.toString()
    );
    shortcut.pins = pins;
    shortcut.isPinned = isPinned;
  };

  const { appCategories, app } = window.__KBN_DATA__;

  const [os, setOs] = useState<OSs>(window.__KBN_DATA__.os);
  const [user, setUser] = useState<IUser>(window.__KBN_DATA__.user);

  const contextValue: IDataContext = {
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
