import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import ShortcutList from "./ShortcutList"

const shortcutList = [
  { action: "test", win: "ctrl+s", isDark: true },
  { action: "Lorem ipsum dolor sit amet", win: "ctrl+s", isDark: false },
  { action: "psum dolor sit amet", win: "ctrl+~", isDark: true },
  { action: "dolor sit amet", win: "alt+s", isDark: false },
  { action: "ipsum dolor sit amet", win: "alt+shift+s", isDark: true },
]

storiesOf("ShortcutList", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <div style={{ width: "640px" }}>
      <ShortcutList title={text("title", "General")} shortcuts={shortcutList} />
    </div>
  ))
  .add("short list", () => (
    <div style={{ width: "640px" }}>
      <ShortcutList
        title={text("title", "Shapes")}
        shortcuts={shortcutList.slice(0, 2)}
      />
    </div>
  ))
