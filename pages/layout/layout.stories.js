import React from "react"

import { storiesOf } from "@storybook/react"

import Logo from "./Logo"
import Header from "./Header"
import Footer from "./Footer"

storiesOf("layout", module)
  .add("Logo", () => <Logo />)
  .add("Header", () => <Header />)
  .add("Footer", () => <Footer />)
