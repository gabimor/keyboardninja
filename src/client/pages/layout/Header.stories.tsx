import { JwtUser } from "@src/types/User.type";
import { Meta, Story } from "@storybook/react";
import React from "react";
import Header from "./Header";

export default {
  title: "Header",
  parameters: {
    layout: "fullscreen",
  },
  component: Header,
} as Meta;

const Template = (args: any) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    _id: "1",
    email: "johna@email.com",
    firstName: "John",
    lastName: "Abercrombie",
  },
};

export const Anonymous = Template.bind({});
