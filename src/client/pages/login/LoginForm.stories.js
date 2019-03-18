import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import LoginForm from "./LoginForm"

storiesOf("LoginForm", module).add("default", () => (
  <LoginForm onSubmit={action("submit")} />
))
