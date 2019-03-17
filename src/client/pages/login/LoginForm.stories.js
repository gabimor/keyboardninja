import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import LoginForm from "./LoginForm"

storiesOf("LoginForm", module).add("default", () => (
  <LoginForm onSubmit={action("submit")} />
))
