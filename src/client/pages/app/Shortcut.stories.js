import React from "react"

import { storiesOf } from "@storybook/react"

import Shortcut from "./Shortcut"

const shortcuts = [
  "ctrl+k",
  "ctrl+shift+k",
  "ctrl+alt+shift+esc",
  "ctrl+alt+shift+c",
  "ctrl+up",
  "ctrl+down",
  "ctrl+left",
  "ctrl+right",
  "ctrl+space",
  "alt+`",
  "ctrl+k f",
  "ctrl+k f or F12",
]

storiesOf("Shortcut", module).add("default", () =>
  shortcuts.map(e => (
    <>
      <hr /> <Shortcut keys={e} />
    </>
  ))
)
