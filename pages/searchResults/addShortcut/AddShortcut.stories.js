import React from "react"

import { storiesOf, addDecorator } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { withKnobs, object, text } from "@storybook/addon-knobs"

import AddShortcut from "./AddShortcut"

const sections = [
  { value: 1, label: "General" },
  { value: 2, label: "Debug" },
  { value: 3, label: "Edit" },
]

storiesOf("AddShortcut", module)
  .addDecorator(withKnobs)
  .add("empty", () => (
    <AddShortcut keys={[]} onAdd={action("add")} onCancel={action("cancel")} />
  ))
  .add("with values", () => (
    <AddShortcut
      keys={object("keys", ["ctrl", "a"])}
      action={text("action", "Select all text")}
      section={{ value: "asd", label: "asd" }}
      sections={sections}
      onAdd={action("add")}
      onCancel={action("cancel")}
    />
  ))
