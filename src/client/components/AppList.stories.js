import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs } from "@storybook/addon-knobs"

import AppList from "./AppList"

const apps = [
  {
    id: 1,
    name: "Visual Studio Code",
    companyName: "Microsoft",
    imageUrl: "logos/vscode.png",
  },
  {
    id: 2,
    name: "Visual Studio",
    companyName: "Microsoft",
    imageUrl: "logos/visualstudio.png",
  },
  {
    id: 3,
    name: "Photoshop",
    companyName: "Adobe",
    imageUrl: "logos/photoshop.png",
  },
  { id: 4, name: "XD", companyName: "Adobe", imageUrl: "logos/xd.png" },
  {
    id: 5,
    name: "Visual Studio Code",
    companyName: "Microsoft",
    imageUrl: "logos/vscode.png",
  },
  {
    id: 6,
    name: "Visual Studio",
    companyName: "Microsoft",
    imageUrl: "logos/visualstudio.png",
  },
  {
    id: 7,
    name: "Photoshop",
    companyName: "Adobe",
    imageUrl: "logos/photoshop.png",
  },
  { id: 8, name: "XD", companyName: "Adobe", imageUrl: "logos/xd.png" },
]

storiesOf("AppList", module)
  .addDecorator(withKnobs)
  .add("default", () => <AppList name="Graphics" apps={apps} />)
