import React from "react";

import { Meta } from "@storybook/react";

import Popover from "./Popover";

export default {
  title: "shared/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template = () => (
  <Popover onClose={null}>
    Click the ninja star to save your favorite shortcuts!
  </Popover>
);

export const Default = Template.bind({});
