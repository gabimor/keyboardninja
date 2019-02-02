import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import Button from "./Button"
import { colors } from "../pages/layout";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <div style={{background: colors.formBG}}>
      <Button>Primary</Button> &nbsp;
      <Button secondary={true}>Secondary</Button>
    </div>
  ))
