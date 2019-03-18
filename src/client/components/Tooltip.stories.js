import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"
import Tooltip from "./Tooltip"

storiesOf("Tooltip", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Tooltip>
      {text(
        "text",
        "enjoy life, live well, love a lot and dont forget to laught"
      )}
    </Tooltip>
  ))
  .add("few lines", () => (
    <Tooltip style={{width:300}}>
      {text(
        "text",
        "enjoy life, live well, love a lot and dont forget to laught"
      )}
    </Tooltip>
  ))
  .add("html", () => (
    <Tooltip style={{width:300}}>
      enjoy life, live <b>well</b>, love a lot and dont forget to <b>laught</b>
    </Tooltip>
  ))
