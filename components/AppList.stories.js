import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs } from "@storybook/addon-knobs"

import { colors } from "../pages/layout"
import AppList from "./AppList"

const apps = [
  { id: 1, name: "Visual Studio Code", companyName: "Microsoft" },
  { id: 2, name: "Visual Studio", companyName: "Microsoft" },
  { id: 3, name: "Photoshop", companyName: "Adobe" },
  { id: 4, name: "XD", companyName: "Adobe" },
]

storiesOf("AppList", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{background:colors.panel}}>{story()}</div>)
  .add("unordered", () => <AppList name="Graphics" apps={apps} />)
  .add("ordered", () => (
    <AppList name="Most searched apps" apps={apps} isOrdered={true} />
  ))
