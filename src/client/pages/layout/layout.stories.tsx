import React from "react";

import { storiesOf } from "@storybook/react";

import Logo from "./Logo";
import Footer from "./Footer";

storiesOf("layout", module)
  .add("Logo", () => <Logo />)
  .add("Footer", () => <Footer />);
