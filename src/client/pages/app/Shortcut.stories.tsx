import React from "react" // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react"

import Shortcut from "./Shortcut"

storiesOf("Shortcut", module).add("default", () => (
  <>
    <hr /> <Shortcut keys="ctrl+k" />
    <hr /> <Shortcut keys="ctrl+shift+k" />
    <hr /> <Shortcut keys="ctrl+left|right|up|down" />
    <hr /> <Shortcut keys="ctrl+up" />
    <hr /> <Shortcut keys="alt+`" />
    <hr /> <Shortcut keys="ctrl+k f" />
    <hr /> <Shortcut keys="ctrl+k f or F12" />
    <hr /> <Shortcut keys="ctrl+1..4" />
    <hr /> <Shortcut keys="ctrl+c 1..4" />
    <hr /> <Shortcut keys="press <kbd>Cmd</kbd>+<kbd>O</kbd> to open the command menu, type <kbd>!</kbd> followed by the name of the script, then press <kbd>Enter</kbd>" html={true} />
  </>
))
