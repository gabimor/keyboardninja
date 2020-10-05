import { Meta } from "@storybook/react";
import React from "react";

import StarCount from "./StarCount";

export default {
  title: "StarCount",
  component: StarCount,
} as Meta;

const Template = (args: any) => (
  <>
    <StarCount stars={1} {...args} />
    <StarCount stars={12} {...args} />
    <StarCount stars={131} {...args} />
    <StarCount stars={1321} {...args} />
  </>
);

export const Default = Template.bind({});
