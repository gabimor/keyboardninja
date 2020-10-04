/** @jsx jsx */
import { Meta, Story } from "@storybook/react";
import Header from "./Header";
import { jsx } from "@emotion/core";
import { DataContext } from "@client/DataContext";

export default {
  title: "Header",
  component: Header,
} as Meta;

const context = {
  user: {
    email: "johna@email.com",
    firstName: "John",
    lastName: "Abercrombie",
  },
};

const Template = (args: any) => (
  <DataContext.Provider value={args.context}>
    <Header {...args} />
  </DataContext.Provider>
);

export const LoggedIn: Story = Template.bind({});
LoggedIn.args = {
  context,
};

export const Anonymous = Template.bind({});
Anonymous.args = {
  context: {},
};
