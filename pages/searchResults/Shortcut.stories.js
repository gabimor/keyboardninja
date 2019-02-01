import React from "react"

import { storiesOf } from "@storybook/react"
import { withKnobs, text } from "@storybook/addon-knobs"

import Shortcut from "./Shortcut"
import Panel from "../../components/Panel";

storiesOf("Shortcut", module)
  .addDecorator(withKnobs)
  .add("2 keys", () => <Panel><Shortcut keys={text("keys", "ctrl+k")} /></Panel>)
  .add("3 keys", () => <Panel><Shortcut keys={text("keys", "ctrl+alt+k")} /></Panel>)
  .add("then", () => <Panel><Shortcut keys={text("keys", "ctrl+k v")} /></Panel>)
