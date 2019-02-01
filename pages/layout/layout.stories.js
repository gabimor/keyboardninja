import React from "react"

import { storiesOf } from "@storybook/react"

import Logo from "./Logo"
import Header from "./Header"
import Footer from "./Footer"
import OSSelect from "./OSSelect"

storiesOf("layout", module)
  .add("Logo", () => <Logo />)
  .add("Header", () => <Header />)
  .add("Footer", () => <Footer />)
  .add("OSSelect", () => <OSSelect os="win" />)
