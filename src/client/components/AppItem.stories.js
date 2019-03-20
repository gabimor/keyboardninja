import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import AppItem from "./AppItem"

storiesOf("AppItem", module)
  .addDecorator(withKnobs)
  .add("photoshop", () => (
    <AppItem icon={"/logos/photoshop.png"} name={text("name", "Photoshop")} />
  ))
  .add("vscode", () => (
    <AppItem
      icon={"/logos/vscode.png"}
      name={text("name", "Visual Studio Code")}
    />
  ))
  .add("sketch", () => (
    <AppItem icon={"/logos/sketch.png"} name={text("name", "Sketch")} />
  ))
