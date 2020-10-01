import React from "react";

import { storiesOf } from "@storybook/react";

import FirstTimeMessage from "./FirstTimeMessage";

export default {
  title: "FirstTimeMessage",
  component: FirstTimeMessage,
};

const Template = () => <FirstTimeMessage onDismiss={null} />;

export const Default = Template.bind({});
