import { Meta } from "@storybook/react";
import React from "react";

import GetLinkPopup from "./GetLinkPopup";

export default {
  title: "GetLinkPopup",
  component: GetLinkPopup,
} as Meta;

const Template = (args: any) => <GetLinkPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  link: "http://keyboardninja.me/photoshop/d1fcv3qaasc3421",
};
