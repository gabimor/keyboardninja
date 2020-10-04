import React from "react";

import { Meta, storiesOf } from "@storybook/react";

import FirstTimeMessage from "./FirstTimeMessage";

export default {
  title: "FirstTimeMessage",
  component: FirstTimeMessage,
} as Meta;

const Template = () => <FirstTimeMessage onDismiss={null} />;

export const Default = Template.bind({});
