import React from "react";
import { Meta } from "@storybook/react";

import { PrimaryButton, SecondaryButton } from "./Buttons";
import { FacebookButton, GoogleButton } from "./SocialButtons";
import Input from "./TextInput";

export default {
  title: "Buttons",
  component: Input,
} as Meta;

const Template = (args: any) => <PrimaryButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
};

export const Facebook = (args: any) => <FacebookButton {...args} />;
export const Google = (args: any) => <GoogleButton {...args} />;

export const InputField = (args: any) => <Input type="text" {...args} />;

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
