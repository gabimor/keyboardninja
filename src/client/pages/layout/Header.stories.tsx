/** @jsx jsx */
import { Meta, Story } from "@storybook/react";
import Header from "./Header";
import { jsx } from "@emotion/core";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template = (args: any) => <Header {...args} />;

export const LoggedIn: Story = Template.bind({});
LoggedIn.args = {
  user: {
    _id: "1",
    email: "johna@email.com",
    firstName: "John",
    lastName: "Abercrombie",
  },
};

export const Anonymous = Template.bind({});
