import { Meta, Story } from "@storybook/react";
import React from "react";

import AppList, { AppListProps } from "./AppList";

export default {
  title: "AppList",
  component: AppList,
} as Meta;

const Template: Story<AppListProps> = (args) => <AppList {...args} />;

const apps = [
  {
    id: 1,
    name: "Visual Studio Code",
    icon: "visual-studio-code.png",
  },
  {
    id: 2,
    name: "Visual Studio",
    icon: "visual-studio.png",
  },
  {
    id: 3,
    name: "Photoshop",
    icon: "photoshop.png",
  },
  { id: 4, name: "XD", icon: "xd.png" },
  {
    id: 5,
    name: "Visual Studio Code",
    icon: "visual-studio-code.png",
  },
  {
    id: 6,
    name: "Visual Studio",
    icon: "visual-studio.png",
  },
  {
    id: 7,
    name: "Photoshop",
    icon: "photoshop.png",
  },
  { id: 8, name: "XD", icon: "xd.png" },
];

export const Default = Template.bind({});
Default.args = {
  name: "Graphics",
  apps,
};
