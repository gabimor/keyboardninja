import { Meta } from "@storybook/react";
import React from "react";
import { DataContext, IDataContext } from "@src/client/DataContext";
import { OSs } from "@src/types/OSs.enum";

import Controls from "./Controls";

export default {
  title: "Controls",
  component: Controls,
  decorators: [],
} as Meta;

const contextData: IDataContext = {
  app: { oss: [OSs.Mac, OSs.Win] },
};

export const Default = (args: any) => (
  <DataContext.Provider value={contextData}>
    <Controls name="Visual Studio Code" icon="visual-studio-code.png" />
  </DataContext.Provider>
);
