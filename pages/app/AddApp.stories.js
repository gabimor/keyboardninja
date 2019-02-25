import React from "react"

import { storiesOf } from "@storybook/react"

import AddApp from "./AddApp"
import { action } from "@storybook/addon-actions"

storiesOf("AddApp", module).add("default", () => (
  <AddApp onAdd={action("add")} onCancel={action("cancel")} />
))
