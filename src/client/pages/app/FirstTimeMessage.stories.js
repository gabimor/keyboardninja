import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"

import FirstTimeMessage from "./FirstTimeMessage"

storiesOf("FirstTimeMessage", module).add("default", () => (
  <FirstTimeMessage />
))
