import React from "react"; // eslint-disable-line no-unused-vars

import { storiesOf } from "@storybook/react";

import ShortcutList from "./ShortcutList";

const shortcutList = [
  { action: "test", mac: "ctrl+s", pins: 0 },
  { action: "Lorem ipsum dolor sit amet", mac: "ctrl+s or F12", pins: 4 },
  {
    action: "test",
    mac:
      "**Ctrl** then move two fingers on the trackpad to move the image around in the preview",
    isHtml: true,
    pins: 0,
  },
  {
    action:
      "Start up from the built-in macOS Recovery system. Or use Option-Command-R or Shift-Option-Command-R to start up from macOS Recovery over the Internet. macOS Recovery installs different versions of macOS, depending on the key combination you use while starting up. If your Mac is using a firmware password, you're asked to enter the password.",
    mac:
      "**Ctrl** then move two fingers on the trackpad to move the image around in the preview",
    isHtml: true,
    pins: 0,
  },
  {
    action: "psum dolor sit amet",
    mac: "ctrl+arrows enter",
    pins: 12,
  },
  {
    action: "psum dolor sit amet",
    mac: "ctrl+arrows enter",
    pins: 12,
  },
  { action: "dolor sit amet", mac: "alt+s", pins: 33 },
  {
    action: "ipsum dolor sit amet",
    mac: "alt+shift+s",
    pins: 102,
    isPinned: true,
  },
];

storiesOf("ShortcutList", module).add("default", () => (
  <div>
    <div style={{ width: "992px" }}>
      <ShortcutList title={"General"} shortcuts={shortcutList} />
    </div>
    <div style={{ width: "768px" }}>
      <ShortcutList title={"General"} shortcuts={shortcutList} />
    </div>
    <div style={{ width: "360px" }}>
      <ShortcutList title={"General"} shortcuts={shortcutList} />
    </div>
  </div>
));
