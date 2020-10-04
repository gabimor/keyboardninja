import { Meta } from "@storybook/react";
import React from "react";

import Pin from "./Pin";

export default {
  title: "Pin",
  component: Pin,
} as Meta;

const Template = (args: any) => <Pin {...args} />;

export const OneDigit = Template.bind({});
OneDigit.args = {
  pins: 1,
  isPinned: false,
};

export const TwoDigits = Template.bind({});
TwoDigits.args = {
  pins: 10,
  isPinned: false,
};

export const ThreeDigits = Template.bind({});
ThreeDigits.args = {
  pins: 123,
  isPinned: false,
};

export const Pinned = Template.bind({});
Pinned.args = {
  pins: 13,
  isPinned: true,
};
