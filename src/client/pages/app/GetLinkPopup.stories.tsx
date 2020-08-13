import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"

import GetLinkPopup from "./GetLinkPopup"

storiesOf("GetLinkPopup", module).add("default", () => (
  <GetLinkPopup link="http://keyboardninja.me/photoshop/d1fcv3qaasc3421" />
))
