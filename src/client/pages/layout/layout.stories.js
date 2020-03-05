import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"

import Logo from "./Logo"
import Footer from "./Footer"

storiesOf("layout", module)
  .add("Logo", () => <Logo />)
  .add("Footer", () => <Footer />)
