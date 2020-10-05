import { Meta } from "@storybook/react";
import React from "react";

import StarCount from "./StarCount";

export default {
  title: "StarCount",
  component: StarCount,
} as Meta;

const Template = (args: any) => (
  <>
    <StarCount pins={1} {...args} />
    <StarCount pins={12} {...args} />
    <StarCount pins={131} {...args} />
    <StarCount pins={1321} {...args} />
  </>
);

export const Default = Template.bind({});
