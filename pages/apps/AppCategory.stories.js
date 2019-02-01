import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import AppCategory from "./AppCategory"
import Panel from "../../components/Panel"

const data = [
  { id: 1, name: "XD", companyName: "Adobe" },
  { id: 1, name: "Photoshop", companyName: "Adobe" },
  { id: 1, name: "Lightroom", companyName: "Adobe" },
]

storiesOf("layout", module)
  .addDecorator(withKnobs)
  .add("AppCategory", () => (
    <Panel>
      <AppCategory name={text("name", "Graphics")} apps={data} />
    </Panel>
  ))
