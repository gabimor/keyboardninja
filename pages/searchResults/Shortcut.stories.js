import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"
import { host } from "storybook-host"
import { colors } from "../layout"

import Shortcut from "./Shortcut"

storiesOf("Shortcut", module)
  .addDecorator(
    host({
      align: "top left",
      backdrop: colors.pane,
      cropMarks: false,
    })
  )
  .addDecorator(withKnobs)
  .add("2 keys", () => <Shortcut keys={text("keys", "ctrl+k")} />)
  .add("3 keys", () => <Shortcut keys={text("keys", "ctrl+alt+k")} />)
  .add("then", () => <Shortcut keys={text("keys", "ctrl+k v")} />)
