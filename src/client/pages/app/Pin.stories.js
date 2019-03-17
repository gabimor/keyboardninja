import React from "react"

import { storiesOf } from "@storybook/react"

import Pin from "./Pin"

storiesOf("Pin", module)
  .add("1 digit", () => <Pin count={1} />)
  .add("2 digits", () => <Pin count={10} />)
  .add("3 digits", () => <Pin count={223} />)
  .add("pinned", () => <Pin count={10} isPinned={true} />)
