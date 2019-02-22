import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import AppItem from "./AppItem"

storiesOf("AppItem", module)
  .addDecorator(withKnobs)
  .add("photoshop", () => (
    <AppItem imageUrl={"/logos/photoshop.png"} name={text("name", "Photoshop")} />
  ))
  .add("vscode", () => (
    <AppItem
      imageUrl={"/logos/vscode.png"}
      name={text("name", "Visual Studio Code")}
    />
  ))
  .add("sketch", () => (
    <AppItem imageUrl={"/logos/sketch.png"} name={text("name", "Sketch")} />
  ))
