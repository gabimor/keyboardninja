import React from "react"

import { storiesOf } from "@storybook/react"

import ShortcutInput from "./ShortcutInput"
import { AddPanel } from "../../../components/Panel"
import AddForm from "./AddForm";

storiesOf("ShortcutInput", module).add("default", () => (
  <AddPanel style={{ display: "flex", alignItems: "flex-start" }}>
    <ShortcutInput keys={["ctrl", "k"]} />
    <ShortcutInput keys={[]} />
    <input type="text" />
  </AddPanel>
))
