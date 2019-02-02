import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs } from "@storybook/addon-knobs"

import Panel from "./Panel"
import AppList from "./AppList"

const apps = [
  { id: 1, name: "Visual Studio Code", companyName: "Microsoft" },
  { id: 2, name: "Visual Studio", companyName: "Microsoft" },
  { id: 3, name: "Photoshop", companyName: "Adobe" },
  { id: 4, name: "XD", companyName: "Adobe" },
]

storiesOf("AppList", module)
  .addDecorator(withKnobs)
  .add("unordered", () => (
    <Panel>
      <AppList name="Graphics" apps={apps} />
    </Panel>
  ))
  .add("ordered", () => (
    <Panel>
      <AppList name="Most searched apps" apps={apps} isOrdered={true}/>
    </Panel>
  ))

