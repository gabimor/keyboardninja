import { Meta } from "@storybook/react";
import React from "react";
import { DataContext } from "@client/DataContext";
import { OSs } from "@defs/OSs.enum";

import Controls from "./Controls";
import { Store } from "@client/store";

export default {
  title: "Controls",
  component: Controls,
} as Meta;

const contextData: Store = new Store({ app: { oss: [OSs.Mac, OSs.Win] } });

export const Default = (args: any) => (
  <DataContext.Provider value={contextData}>
    <Controls name="Visual Studio Code" icon="visual-studio-code.png" />
  </DataContext.Provider>
);
