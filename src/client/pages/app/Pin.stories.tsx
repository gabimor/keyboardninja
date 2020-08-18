import React from "react"; // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react";

import Pin from "./Pin";

storiesOf("Pin", module)
  .add("1 digit", () => <Pin pins={1} isPinned={false} onClick={() => {}} />)
  .add("2 digits", () => <Pin pins={10} isPinned={false} onClick={() => {}} />)
  .add("3 digits", () => <Pin pins={223} isPinned={false} onClick={() => {}} />)
  .add("pinned", () => <Pin pins={10} isPinned={true} onClick={() => {}} />);
