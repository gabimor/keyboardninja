import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import Shortcut from "./Shortcut"
import { colors } from "../layout"

storiesOf("Shortcut", module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ background: colors.panel }}>{story()}</div>
  ))
  .add("2 keys", () => <Shortcut keys={text("keys", ["ctrl", "k"])} />)
  .add("3 keys", () => <Shortcut keys={text("keys", ["ctrl", "alt", "k"])} />)
  .add("then", () => <Shortcut keys={text("keys", ["ctrl", "x", " ", "k"])} />)
