import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, object } from "@storybook/addon-knobs"

import AddShortcut from "./AddShortcut"

storiesOf("AddShortcut", module)
  .addDecorator(withKnobs)
  .add("default", () => <AddShortcut keys={object("keys", ["ctrl","alt"])}/>)
