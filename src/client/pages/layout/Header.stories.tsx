import { JwtUser } from "@src/types/User.type";
import { Story } from "@storybook/react";
import React from "react";
import Header from "./Header";

export default {
  title: "Nav",
};

const user: JwtUser = {
  _id: "1",
  email: "johna@email.com",
  firstName: "John",
  lastName: "Abercrombie",
};

export const HeaderStory: Story = () => <Header user={user} onLogout={null} />;
HeaderStory.storyName = "Header";
