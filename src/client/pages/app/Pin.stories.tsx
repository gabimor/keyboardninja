import React from "react";

import { storiesOf } from "@storybook/react";

import Pin from "./Pin";

storiesOf("Pin", module)
  .add("1 digit", () => (
    <Pin
      pins={1}
      isPinned={false}
      onClick={() => {
        alert();
      }}
    />
  ))
  .add("2 digits", () => (
    <Pin
      pins={10}
      isPinned={false}
      onClick={() => {
        alert();
      }}
    />
  ))
  .add("3 digits", () => (
    <Pin
      pins={223}
      isPinned={false}
      onClick={() => {
        alert();
      }}
    />
  ))
  .add("pinned", () => (
    <Pin
      pins={10}
      isPinned={true}
      onClick={() => {
        alert();
      }}
    />
  ));
