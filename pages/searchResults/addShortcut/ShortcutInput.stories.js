import React from "react"

import { storiesOf } from "@storybook/react"

import ShortcutInput from "./ShortcutInput"

storiesOf("ShortcutInput", module).add("default", () => (
  <ShortcutInput keys={["ctrl", "k"]} />
))
