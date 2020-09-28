import React from "react";

import { PrimaryButton, SecondaryButton } from "./Buttons";
import { FacebookButton, GoogleButton } from "./SocialButtons";
import Input from "./TextInput";

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
  <FacebookButton text="Log in with Facebook" />
);
export const Google = (args: any) => <GoogleButton text="Log in with Google" />;

export const InputField = () => <Input type="text" />;

export const Inline = () => (
  <div style={{ display: "flex" }}>
    <PrimaryButton>Primary Button</PrimaryButton>
    <SecondaryButton>Secondary Button</SecondaryButton>
    <FacebookButton text="Log in with Facebook" />
    <GoogleButton text="Log in with Google" />
    <Input type="text" />
  </div>
);

export const Vertical = () => (
  <div>
    <PrimaryButton>Primary Button</PrimaryButton>
    <SecondaryButton>Secondary Button</SecondaryButton>
    <a>
      <FacebookButton text="Log in with Facebook" />
    </a>
    <a>
      <GoogleButton text="Log in with Google" />
    </a>
    <Input type="text" />
  </div>
);
