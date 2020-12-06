import React from "react";

import { Meta } from "@storybook/react";

import SignupBannerMessage from "./SignupBannerMessage";

export default {
  title: "shared/SignupBannerMessage",
  component: SignupBannerMessage,
} as Meta;

const Template = () => <SignupBannerMessage />;

export const Default = Template.bind({});
