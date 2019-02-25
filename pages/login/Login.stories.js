import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import Login from "./Login"

storiesOf("login & signup", module).add("Login", () => (
  <Login onSubmit={action("submit")} />
))
