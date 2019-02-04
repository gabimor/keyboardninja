import React from "react"

import { storiesOf } from "@storybook/react"

import EmptyAppMessage from "./EmptyAppMessage"
import { action } from "@storybook/addon-actions/dist/preview"

storiesOf("EmptyAppMessage", module).add("default", () => (
  <EmptyAppMessage onClick={action("add shortcuts clicked")} />
))
