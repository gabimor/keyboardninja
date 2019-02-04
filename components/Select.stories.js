import React from "react"

import { storiesOf } from "@storybook/react"

import Select from "./Select"

const options = [
  { value: 1, label: "General" },
  { value: 2, label: "Debug" },
  { value: 3, label: "Edit" },
]

storiesOf("Select", module).add("default", () => <Select options={options} />)
