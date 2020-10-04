import styled from "@emotion/styled";
import { Meta } from "@storybook/react";
import React from "react";

import Shortcut, { ShortcutProps } from "./Shortcut";

export default {
  component: Shortcut,
  title: "Shortcut",
} as Meta;

const data: ShortcutProps[] = [
  { keys: "ctrl+k" },
  { keys: "ctrl+shift+k" },
  { keys: "ctrl+left|right|up|down" },
  { keys: "ctrl+up" },
  { keys: "alt+`" },
  { keys: "ctrl+k f" },
  { keys: "ctrl+k f or F12" },
  { keys: "ctrl+1..4" },
  { keys: "ctrl+c 1..4" },
  {
    keys:
      "press <kbd>Cmd</kbd>+<kbd>O</kbd> to open the command menu, type <kbd>!</kbd> followed by the name of the script, then press <kbd>Enter</kbd>",
    isHtml: true,
  },
];

const Template = ({ items, ...args }: { items: typeof data }) =>
  items.map((item: any) => (
    <Wrapper>
      <Shortcut {...item} />
    </Wrapper>
  ));

export const Default = Template.bind({});
Default.args = { items: data };

const Wrapper = styled.div`
  margin-top: 15px;
`;
