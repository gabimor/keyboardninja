import React from "react";
import { Meta, Story } from "@storybook/react";
import MobileMenu from "./MobileMenu";

export default {
  title: "MobileMenu",
  component: MobileMenu,
} as Meta;

const Template = (args: any) => <MobileMenu {...args} />;

export const Default: Story = Template.bind({});
