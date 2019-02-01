import React from "react"

import { storiesOf } from "@storybook/react"

import SearchAppInput from "./SearchAppInput"

const apps = [
  { id: 1, name: "Visual Studio Code", companyName: "Microsoft" },
  { id: 2, name: "Visual Studio", companyName: "Microsoft" },
  { id: 3, name: "Photoshop", companyName: "Adobe" },
  { id: 4, name: "XD", companyName: "Adobe" },
]

storiesOf("SearchAppInput", module).add("default", () => (
  <SearchAppInput apps={apps} />
))
