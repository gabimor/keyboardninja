import React from "react";
import { Meta, Story } from "@storybook/react";
import MobileMenu from "./MobileMenu";
import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import { Store } from "@client/store";

export default {
  title: "Layout/MobileMenu",
  component: MobileMenu,
} as Meta;

const contextData = new Store({
  user: {
    _id: "1",
    email: "johna@email.com",
    firstName: "John",
    lastName: "Abercrombie",
  },
});

const Template = (args: any) => (
  <DataContext.Provider value={contextData}>
    <Container>
      <MobileMenu {...args} />
      <img src="/logo.svg" />
    </Container>
  </DataContext.Provider>
);

const Container = styled.div`
  text-align: right;
  user-select: none;
`;

export const Default: Story = Template.bind({});
