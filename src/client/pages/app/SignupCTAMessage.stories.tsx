import React from "react";

import { Meta } from "@storybook/react";

import SignupCTAMessage from "./SignupCTAMessage";

export default {
  title: "SignupCTAMessage",
  component: SignupCTAMessage,
} as Meta;

const Template = () => <SignupCTAMessage onClose={null} />;

export const Default = Template.bind({});
