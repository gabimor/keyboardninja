import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import Shortcut from "./Shortcut"

const shortcuts = ["ctrl+k+v", "ctrl+shift+k+v", "ctrl+alt+shift+esc", "ctrl+k f", "ctrl+k f or F12",]

storiesOf("Shortcut", module)
  .addDecorator(withKnobs)
  .add("2 keys", () => (
    <ul>
      {shortcuts.map(e => (
        <li>
          <Shortcut keys={e} />
        </li>
      ))}
    </ul>
  ))
