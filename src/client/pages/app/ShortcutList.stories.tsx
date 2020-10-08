import React from "react";

import ShortcutList from "./ShortcutList";
import { Shortcut } from "@src/types/Shortcut.type";
import { Meta } from "@storybook/react";
import { DataContext } from "@client/DataContext";
import { OSs } from "@src/types/OSs.enum";
import { Store } from "@client/store";

export default { title: "ShortcutList", component: ShortcutList } as Meta;

const contextData = new Store({ os: OSs.Win });

export const Default = () => (
  <DataContext.Provider value={contextData}>
    <ShortcutList title={"Edit"} shortcuts={shortcutList1} />
    <ShortcutList title={"General"} shortcuts={shortcutList2} />
  </DataContext.Provider>
);

const shortcutList1: Shortcut[] = [
  { _id: "1", sectionId: "1", action: "test", win: "ctrl+s", stars: 0 },
  {
    _id: "2",
    sectionId: "1",
    action: "Lorem ipsum dolor sit amet",
    win: "ctrl+s or f12",
    stars: 4,
  },
  {
    _id: "3",
    sectionId: "1",
    action: "test",
    win:
      "**Ctrl** then move two fingers on the trackpad to move the image around in the preview",
    isHtml: true,
    stars: 0,
  },
  {
    _id: "4",
    sectionId: "1",
    action:
      "Start up from the built-in macOS Recovery system. Or use Option-Command-R or Shift-Option-Command-R to start up from macOS Recovery over the Internet. macOS Recovery installs different versions of macOS, depending on the key combination you use while starting up. If your Mac is using a firmware password, you're asked to enter the password.",
    win:
      "**Ctrl** then move two fingers on the trackpad to move the image around in the preview",
    isHtml: true,
    stars: 0,
  },
  {
    _id: "5",
    sectionId: "1",
    action: "psum dolor sit amet",
    win: "ctrl+arrows enter",
    stars: 12,
  },
  {
    _id: "6",
    sectionId: "1",
    action: "psum dolor sit amet",
    win: "ctrl+arrows enter",
    stars: 12,
  },
  {
    _id: "7",
    sectionId: "1",
    action: "dolor sit amet",
    win: "alt+s",
    stars: 33,
  },
  {
    _id: "8",
    sectionId: "1",
    action: "ipsum dolor sit amet",
    win: "alt+shift+s",
    stars: 102,
    isStarred: true,
  },
];

const shortcutList2: Shortcut[] = [
  { _id: "1", sectionId: "1", action: "test", win: "ctrl+s", stars: 0 },
  {
    _id: "2",
    sectionId: "1",
    action: "Lorem ipsum dolor sit amet",
    win: "ctrl+s or f12",
    stars: 0,
  },
  {
    _id: "3",
    sectionId: "1",
    action: "test",
    win:
      "**Ctrl** then move two fingers on the trackpad to move the image around in the preview",
    isHtml: true,
    stars: 0,
  },
  {
    _id: "4",
    sectionId: "1",
    action:
      "Start up from the built-in macOS Recovery system. Or use Option-Command-R or Shift-Option-Command-R to start up from macOS Recovery over the Internet. macOS Recovery installs different versions of macOS, depending on the key combination you use while starting up. If your Mac is using a firmware password, you're asked to enter the password.",
    win:
      "**Ctrl** then move two fingers on the trackpad to move the image around in the preview",
    isHtml: true,
    stars: 0,
  },
];
