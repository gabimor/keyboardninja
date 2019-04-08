import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"

import Shortcut from "./Shortcut"

const shortcuts = [
  "ctrl+k",
  "ctrl+shift+k",
  "ctrl+alt+shift+esc",
  "ctrl+alt+shift+c",
  "ctrl+left|right|up|down",
  "ctrl+space",
  "ctrl+up",
  "ctrl+down",
  "ctrl+left",
  "ctrl+right",
  "ctrl+space",
  "alt+`",
  "ctrl+k f",
  "ctrl+k f or F12",
  "ctrl+1..4",
  "ctrl+up|down",
]

storiesOf("Shortcut", module).add("default", () =>
  shortcuts.map(e => (
    <>
      <hr /> <Shortcut keys={e} />
    </>
  ))
)
