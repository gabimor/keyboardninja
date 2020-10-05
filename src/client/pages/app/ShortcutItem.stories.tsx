import { DataContext, IDataContext } from "@client/DataContext";
import { OSs } from "@src/types/OSs.enum";
import { Meta } from "@storybook/react";
import React from "react";

import ShortcutItem from "./ShortcutItem";

export default { title: "ShortcutItem", component: ShortcutItem } as Meta;

const contextData: IDataContext = {
  app: { oss: [OSs.Mac, OSs.Win] },
};

export const Default = () => (
  <DataContext.Provider value={contextData}>
    <ShortcutItem
      _id="1"
      action={"Select all text"}
      keys={"ctrl+k"}
      stars={0}
    />
  </DataContext.Provider>
);
