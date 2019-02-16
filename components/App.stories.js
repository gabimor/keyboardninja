import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import App from "./App"

storiesOf("App", module)
  .addDecorator(withKnobs)
  .add("photoshop", () => (
    <App imageUrl={"/logos/photoshop.png"} name={text("name", "Photoshop")} />
  ))
  .add("vscode", () => (
    <App
      imageUrl={"/logos/vscode.png"}
      name={text("name", "Visual Studio Code")}
    />
  ))
  .add("sketch", () => (
    <App imageUrl={"/logos/sketch.png"} name={text("name", "Sketch")} />
  ))
