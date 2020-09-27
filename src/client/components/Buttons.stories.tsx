import React from "react";

import { PrimaryButton, SecondaryButton } from "./Buttons";
import { FacebookButton, GoogleButton } from "./SocialButtons";

export default {
  title: "Buttons",
};

export const Primary = (args: any) => (
  <PrimaryButton>Primary Button</PrimaryButton>
);
export const Secondary = (args: any) => (
  <SecondaryButton>Secondary Button</SecondaryButton>
);
export const Facebook = (args: any) => (
  <FacebookButton text="Login with Facebook" />
);
export const Google = (args: any) => <GoogleButton text="Login with Google" />;
