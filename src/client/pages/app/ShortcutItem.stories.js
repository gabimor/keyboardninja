import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import ShortcutItem from "./ShortcutItem"

storiesOf("ShortcutItem", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <ShortcutItem
      action={text("action", "Select all text")}
      keys={text("keys", "ctrl+k")}
      pins={0}
    />
  ))
