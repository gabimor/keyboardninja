import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import AddForm from "./AddForm"

storiesOf("AddForm", module)
  .addDecorator(withKnobs)
  .add("default", () => <AddForm />)
