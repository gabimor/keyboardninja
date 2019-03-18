import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import ShortcutList from "./ShortcutList"

const shortcutList = [
  { action: "test", keys: "ctrl+s", pins: 0 },
  { action: "Lorem ipsum dolor sit amet", keys: "ctrl+s or F12", pins: 4 },
  { action: "psum dolor sit amet", keys: "ctrl+~", pins: 12 },
  { action: "dolor sit amet", keys: "alt+s", pins: 33 },
  {
    action: "ipsum dolor sit amet",
    keys: "alt+shift+s",
    pins: 102,
    isPinned: true,
  },
]

storiesOf("ShortcutList", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ width: "640px" }}>{story()}</div>)
  .add("default", () => (
    <ShortcutList title={text("title", "General")} shortcuts={shortcutList} />
  ))
  .add("short list", () => (
    <ShortcutList
      title={text("title", "Shapes")}
      shortcuts={shortcutList.slice(0, 2)}
    />
  ))
