import styled from "@emotion/styled";
import { Meta } from "@storybook/react";
import React from "react";

import StarButton from "./StarButton";

export default {
  title: "StarButton",
  component: StarButton,
} as Meta;

const Template = (args: any) => (
  <>
    <NormalContainer>
      <StarButton {...args} />
    </NormalContainer>
    <HighContainer>
      <StarButton {...args} />
    </HighContainer>
  </>
);

export const Stared = Template.bind({});
Stared.args = {
  isStarred: true,
};

export const Unstared = Template.bind({});
Unstared.args = {
  isStarred: false,
};

const NormalContainer = styled.div`
  width: 50px;
  margin-bottom: 10px;
`;

const HighContainer = styled.div`
  width: 50px;
  height: 100px;
`;
