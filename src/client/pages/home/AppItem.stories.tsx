import { Meta } from "@storybook/react";
import React from "react";

import AppItem from "./AppItem";

export default {
  title: "AppItem",
  component: AppItem,
  decorators: [
    (Story: any) => (
      <div style={{ width: 100 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template = (args: any) => <AppItem {...args} />;

export const Photoshop = Template.bind({});
Photoshop.args = {
  icon: "/logos/photoshop.png",
  name: "Photoshop",
};

export const VsCode = Template.bind({});
VsCode.args = {
  icon: "/logos/visual-studio-code.png",
  name: "Visual Studio Code",
};

export const Sketch = Template.bind({});
Sketch.args = {
  icon: "/logos/sketch.png",
  name: "Sketch",
};
