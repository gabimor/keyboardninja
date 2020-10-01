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
export const Facebook = (args: any) => <FacebookButton />;
export const Google = (args: any) => <GoogleButton />;

export const InputField = () => <Input type="text" />;

export const Inline = () => (
  <div style={{ display: "flex" }}>
    <PrimaryButton>Primary Button</PrimaryButton>
    <SecondaryButton>Secondary Button</SecondaryButton>
    <FacebookButton />
    <GoogleButton />
    <Input type="text" />
  </div>
);

export const Vertical = () => (
  <div>
    <PrimaryButton>Primary Button</PrimaryButton>
    <SecondaryButton>Secondary Button</SecondaryButton>
    <a>
      <FacebookButton />
    </a>
    <a>
      <GoogleButton />
    </a>
    <Input type="text" />
  </div>
);
