import React from "react";

import ShortcutItem from "./ShortcutItem";

export default { title: "ShortcutItem", component: ShortcutItem };

export const Default = () => (
  <ShortcutItem _id="1" action={"Select all text"} keys={"ctrl+k"} pins={0} />
);
