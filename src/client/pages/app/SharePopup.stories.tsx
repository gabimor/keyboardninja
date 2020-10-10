import { Meta } from "@storybook/react";
import React from "react";

import SharePopup from "./SharePopup";

export default {
  title: "SharePopup",
  component: SharePopup,
} as Meta;

const Template = (args: any) => <SharePopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  link: "http://keyboardninja.me/photoshop/d1fcv3qaasc3421",
};
