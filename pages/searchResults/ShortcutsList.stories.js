import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"
import { host } from "storybook-host"

import { colors } from "../layout/GlobalStyle"
import ShortcutsList from "./ShortcutsList"

const shortcutList = [
  { action: "test", win: "ctrl+s", isDark: true },
  { action: "Lorem ipsum dolor sit amet", win: "ctrl+s", isDark: false },
  { action: "psum dolor sit amet", win: "ctrl+~", isDark: true },
  { action: "dolor sit amet", win: "alt+s", isDark: false },
  { action: "ipsum dolor sit amet", win: "shift+alt+s", isDark: true },
]

storiesOf("ShortcutsList", module)
  .addDecorator(
    host({
      align: "top left",
      width: "680px",
      backdrop: colors.mainBG,
      cropMarks: false,
    })
  )
  .addDecorator(withKnobs)
  .add("default", () => (
    <ShortcutsList title={text("title", "General")} shortcuts={shortcutList} />
  ))
  .add("short list", () => (
    <ShortcutsList
      title={text("title", "Shapes")}
      shortcuts={shortcutList.slice(0, 2)}
    />
  ))
