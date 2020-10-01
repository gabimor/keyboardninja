import React from "react";

import ShortcutList from "./ShortcutList";
import { Shortcut } from "@src/types/Shortcut.type";

export default { title: "ShortcutList", component: ShortcutList };

export const Default = () => (
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
);

const shortcutList: Shortcut[] = [
  { _id: "1", sectionId: "1", action: "test", mac: "ctrl+s", pins: 0 },
  {
    _id: "2",
    sectionId: "1",
    action: "Lorem ipsum dolor sit amet",
    mac: "ctrl+s or F12",
    pins: 4,
  },
  {
    _id: "3",
    sectionId: "1",
    action: "test",
    mac:
      "**Ctrl** then move two fingers on the trackpad to move the image around in the preview",
    isHtml: true,
    pins: 0,
  },
  {
    _id: "4",
    sectionId: "1",
    action:
      "Start up from the built-in macOS Recovery system. Or use Option-Command-R or Shift-Option-Command-R to start up from macOS Recovery over the Internet. macOS Recovery installs different versions of macOS, depending on the key combination you use while starting up. If your Mac is using a firmware password, you're asked to enter the password.",
    mac:
      "**Ctrl** then move two fingers on the trackpad to move the image around in the preview",
    isHtml: true,
    pins: 0,
  },
  {
    _id: "5",
    sectionId: "1",
    action: "psum dolor sit amet",
    mac: "ctrl+arrows enter",
    pins: 12,
  },
  {
    _id: "6",
    sectionId: "1",
    action: "psum dolor sit amet",
    mac: "ctrl+arrows enter",
    pins: 12,
  },
  {
    _id: "7",
    sectionId: "1",
    action: "dolor sit amet",
    mac: "alt+s",
    pins: 33,
  },
  {
    _id: "8",
    sectionId: "1",
    action: "ipsum dolor sit amet",
    mac: "alt+shift+s",
    pins: 102,
    isPinned: true,
  },
];
