import { Meta } from "@storybook/react";
import React from "react";

import Controls from "./Controls";

export default {
  title: "Controls",
  component: Controls,
} as Meta;

export const Default = (args: any) => (
  <Controls name="Visual Studio Code" icon="visual-studio-code.png" />
);
